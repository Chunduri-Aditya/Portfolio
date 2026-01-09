import { describe, it, expect } from "vitest";
import { matchIntent } from "./matchIntent";
import { faqIntents } from "../data/faqIntents";

describe("matchIntent", () => {
  it("should match exact utterance", () => {
    const result = matchIntent("what projects have you built", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("summarize-projects");
  });

  it("should match partial utterance", () => {
    const result = matchIntent("tell me about your projects", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("summarize-projects");
  });

  it("should match using synonyms", () => {
    const result = matchIntent("show me your cv", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("resume");
  });

  it("should match using keyword overlap", () => {
    const result = matchIntent("python langchain docker", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("skills-stack");
  });

  it("should match model behavior lab", () => {
    const result = matchIntent("evaluation framework", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("behavior-lab");
  });

  it("should match health journal", () => {
    const result = matchIntent("privacy journal", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("health-journal");
  });

  it("should match remixmate", () => {
    const result = matchIntent("audio remix", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("remix-mate");
  });

  it("should match research paper", () => {
    const result = matchIntent("wind power paper", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("research-paper");
  });

  it("should return null for unknown query", () => {
    const result = matchIntent("what is the weather today", faqIntents);
    expect(result).toBeNull();
  });

  it("should return null for empty input", () => {
    const result = matchIntent("", faqIntents);
    expect(result).toBeNull();
  });

  it("should handle case insensitivity", () => {
    const result = matchIntent("MODEL BEHAVIOR LAB", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("behavior-lab");
  });

  it("should handle punctuation", () => {
    const result = matchIntent("what are your skills?", faqIntents);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("skills-stack");
  });
});
