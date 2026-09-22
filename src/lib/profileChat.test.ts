import { afterEach, describe, expect, test, vi } from "vitest";
import { ask, chatEnabled, chatUrl, health, suggestions } from "./profileChat";

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));

afterEach(() => vi.unstubAllGlobals());

describe("profileChat endpoint", () => {
  test("disabled when no URL is configured", () => {
    expect(chatEnabled(undefined)).toBe(false);
    expect(chatEnabled("")).toBe(false);
    expect(chatEnabled("https://x.example")).toBe(true);
  });

  test("url joins without a double slash", () => {
    expect(chatUrl("/ask", "https://x.example/")).toBe("https://x.example/ask");
    expect(chatUrl("/ask", "https://x.example")).toBe("https://x.example/ask");
  });

  test("ask posts the question and returns the typed answer", async () => {
    const fetchMock = vi.fn(() => json({ answer: "A.", mode: "extract", score: 1, sources: [], latency_ms: 12 }));
    vi.stubGlobal("fetch", fetchMock);
    const out = await ask("what is jarvis", "https://x.example");
    expect(out.mode).toBe("extract");
    expect(out.answer).toBe("A.");
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://x.example/ask");
    expect(JSON.parse(String(init.body))).toEqual({ question: "what is jarvis" });
  });

  test("ask surfaces a non-2xx as an error, including 429", async () => {
    vi.stubGlobal("fetch", vi.fn(() => json({ error: "Rate limit exceeded" }, 429)));
    await expect(ask("q", "https://x.example")).rejects.toThrow(/429/);
  });

  test("health and suggestions read their endpoints", async () => {
    vi.stubGlobal("fetch", vi.fn((url: string) =>
      url.endsWith("/health") ? json({ ok: true, chunks: 318 }) : json({ suggestions: ["Who is Aditya?"] }),
    ));
    expect((await health("https://x.example")).chunks).toBe(318);
    expect(await suggestions("https://x.example")).toEqual(["Who is Aditya?"]);
  });
});
