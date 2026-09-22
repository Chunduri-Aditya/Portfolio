/**
 * Client for the profile-rag service (github.com/Chunduri-Aditya/profile-rag):
 * retrieval only, no LLM. The endpoint comes from VITE_PROFILE_CHAT_URL at
 * build time; when it is unset the whole feature is hidden so the static
 * build never ships a control that leads nowhere.
 */

export interface ChatSource {
  id: string;
  title: string;
  section: string;
  url: string;
  text: string;
  score?: number;
}

export type ChatMode = "faq" | "extract" | "fallback";

export interface ChatAnswer {
  answer: string | null;
  mode: ChatMode;
  score: number | null;
  sources: ChatSource[];
  suggestions?: string[];
  latency_ms: number;
}

export interface ChatHealth {
  ok: boolean;
  chunks: number;
  corpus_sha256?: string;
}

export const PROFILE_CHAT_URL: string | undefined = import.meta.env?.VITE_PROFILE_CHAT_URL;

export function chatEnabled(url: string | undefined = PROFILE_CHAT_URL): boolean {
  return typeof url === "string" && url.trim().length > 0;
}

export function chatUrl(path: string, base: string | undefined = PROFILE_CHAT_URL): string {
  return `${(base ?? "").replace(/\/+$/, "")}${path}`;
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`profile-rag ${res.status}`);
  return (await res.json()) as T;
}

export function health(base?: string): Promise<ChatHealth> {
  return getJson<ChatHealth>(chatUrl("/health", base));
}

export async function suggestions(base?: string): Promise<string[]> {
  const out = await getJson<{ suggestions: string[] }>(chatUrl("/suggestions", base));
  return out.suggestions;
}

export function ask(question: string, base?: string): Promise<ChatAnswer> {
  return getJson<ChatAnswer>(chatUrl("/ask", base), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question }),
  });
}

/** Turn a source's absolute site URL into a router path or hash the app can follow. */
export function localHref(url: string): string {
  try {
    const u = new URL(url);
    return `${u.pathname}${u.hash}`;
  } catch {
    return url;
  }
}
