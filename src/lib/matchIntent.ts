import { FAQIntent } from "../data/faqIntents";

// Simple synonym map
const synonyms: Record<string, string[]> = {
  paper: ["research", "publication", "ijraset"],
  cv: ["resume", "curriculum vitae"],
  remix: ["remixmate", "remix mate"],
  eval: ["evaluation", "testing", "benchmark"],
  rag: ["retrieval", "augmented", "generation"],
  llm: ["language model", "model"],
  tech: ["technology", "technologies", "stack", "skills"],
  contact: ["email", "reach", "get in touch", "social"],
};

/**
 * Normalize user input: lowercase, trim, remove punctuation
 */
function normalizeInput(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Expand input with synonyms
 */
function expandWithSynonyms(normalized: string): string[] {
  const words = normalized.split(" ");
  const expanded = new Set<string>(words);

  words.forEach((word) => {
    if (synonyms[word]) {
      synonyms[word].forEach((syn) => expanded.add(syn));
    }
  });

  return Array.from(expanded);
}

/**
 * Calculate keyword overlap score
 */
function keywordOverlapScore(
  inputWords: string[],
  intentTags: string[]
): number {
  let exactMatches = 0;
  let partialMatches = 0;
  const inputSet = new Set(inputWords.map(w => w.toLowerCase()));

  intentTags.forEach((tag) => {
    const tagLower = tag.toLowerCase();
    // Exact match
    if (inputSet.has(tagLower)) {
      exactMatches++;
    }
    // Partial match (word contains tag or vice versa)
    inputWords.forEach((word) => {
      const wordLower = word.toLowerCase();
      if (wordLower.includes(tagLower) || tagLower.includes(wordLower)) {
        partialMatches += 0.3;
      }
    });
  });

  // Prefer exact matches, weight by number of input words matched
  const totalMatches = exactMatches + partialMatches;
  const coverage = totalMatches / Math.max(inputWords.length, 1);
  const tagCoverage = exactMatches / Math.max(intentTags.length, 1);
  
  return Math.min((coverage * 0.6 + tagCoverage * 0.4), 1.0);
}

/**
 * Check if input includes any utterance (exact or partial)
 */
function utteranceMatchScore(
  normalizedInput: string,
  utterances: string[]
): number {
  let maxScore = 0;
  const inputWords = normalizedInput.split(" ").filter(w => w.length > 0);

  utterances.forEach((utterance) => {
    const normalizedUtterance = normalizeInput(utterance);
    const utteranceWords = normalizedUtterance.split(" ").filter(w => w.length > 0);
    
    // Exact match
    if (normalizedInput === normalizedUtterance) {
      maxScore = Math.max(maxScore, 1.0);
      return;
    }

    // Check if input contains utterance or vice versa
    if (
      normalizedInput.includes(normalizedUtterance) ||
      normalizedUtterance.includes(normalizedInput)
    ) {
      const overlap = Math.min(
        normalizedInput.length,
        normalizedUtterance.length
      ) / Math.max(normalizedInput.length, normalizedUtterance.length);
      maxScore = Math.max(maxScore, overlap * 0.8);
    }

    // Word-level overlap
    const commonWords = inputWords.filter((w) => utteranceWords.includes(w));
    if (commonWords.length > 0) {
      const wordScore = commonWords.length / Math.max(inputWords.length, utteranceWords.length);
      maxScore = Math.max(maxScore, wordScore * 0.6);
    }
  });

  return maxScore;
}

/**
 * Match user input to the best intent
 * Returns the intent if score >= threshold, else null
 */
export function matchIntent(
  input: string,
  intents: FAQIntent[],
  threshold: number = 0.3
): FAQIntent | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const normalized = normalizeInput(input);
  const expanded = expandWithSynonyms(normalized);
  const inputWords = expanded.filter(w => w.length > 0);

  let bestMatch: FAQIntent | null = null;
  let bestScore = 0;

  intents.forEach((intent) => {
    // Check if any synonym matches intent tags directly (boost for resume/cv)
    let synonymBoost = 0;
    const normalizedInputLower = normalized.toLowerCase();
    if (normalizedInputLower.includes("cv") || normalizedInputLower.includes("resume")) {
      if (intent.id === "resume") {
        synonymBoost = 0.5;
      }
    }

    // Utterance match (weighted higher)
    const utteranceScore = utteranceMatchScore(normalized, intent.utterances);
    
    // Keyword overlap
    const keywordScore = keywordOverlapScore(inputWords, intent.tags);
    
    // Boost if multiple keywords match (indicates stronger intent)
    const matchingKeywords = inputWords.filter(word => 
      intent.tags.some(tag => {
        const tagLower = tag.toLowerCase();
        const wordLower = word.toLowerCase();
        return tagLower === wordLower || tagLower.includes(wordLower) || wordLower.includes(tagLower);
      })
    );
    // Stronger boost if more input words match (better coverage)
    const multiKeywordBoost = matchingKeywords.length >= 2 ? matchingKeywords.length * 0.15 : 0;
    
    // Combined score (utterance match is more important, but keyword coverage matters too)
    const combinedScore = utteranceScore * 0.5 + keywordScore * 0.5 + synonymBoost + multiKeywordBoost;

    if (combinedScore > bestScore) {
      bestScore = combinedScore;
      bestMatch = intent;
    }
  });

  return bestScore >= threshold ? bestMatch : null;
}
