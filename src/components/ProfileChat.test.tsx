import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProfileChat from "./ProfileChat";

const URL = "https://chat.example";
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function stub(handler: (url: string, init?: RequestInit) => Response | Promise<Response>) {
  vi.stubGlobal("fetch", vi.fn((url: string, init?: RequestInit) => Promise.resolve(handler(url, init))));
}

function renderOpen() {
  return render(
    <MemoryRouter>
      <ProfileChat isOpen onClose={() => {}} endpoint={URL} />
    </MemoryRouter>,
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("ProfileChat", () => {
  test("idle shows suggestions from the service and asks one on click", async () => {
    stub((url) => {
      if (url.endsWith("/health")) return json({ ok: true, chunks: 318 });
      if (url.endsWith("/suggestions")) return json({ suggestions: ["What is Agent Shield?", "Where did Aditya study?"] });
      return json({
        answer: "Agent Shield is an adversarial evaluation framework.",
        mode: "faq",
        score: 0.9,
        latency_ms: 20,
        sources: [{ id: "project/agent-shield/overview", title: "Agent Shield", section: "project", url: "https://chunduri-aditya.github.io/Portfolio/work/agent-shield/", text: "..." }],
      });
    });
    renderOpen();
    const pill = await screen.findByRole("button", { name: "What is Agent Shield?" });
    await userEvent.click(pill);
    expect(await screen.findByText(/adversarial evaluation framework/)).toBeInTheDocument();
    const src = screen.getByRole("link", { name: /Agent Shield/ });
    expect(src).toHaveAttribute("href", "/Portfolio/work/agent-shield/");
  });

  test("fallback names the limit and re-offers suggestions", async () => {
    stub((url) => {
      if (url.endsWith("/health")) return json({ ok: true, chunks: 318 });
      if (url.endsWith("/suggestions")) return json({ suggestions: ["Who is Aditya?"] });
      return json({ answer: null, mode: "fallback", score: -9, latency_ms: 5, sources: [], suggestions: ["Who is Aditya?"] });
    });
    renderOpen();
    const input = await screen.findByRole("textbox");
    await userEvent.type(input, "banana bread{Enter}");
    expect(await screen.findByText(/only knows what is published/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Who is Aditya?" })).toBeInTheDocument();
  });

  test("a failed request shows the error state with a retry", async () => {
    stub((url) => {
      if (url.endsWith("/health")) return json({ ok: true, chunks: 318 });
      if (url.endsWith("/suggestions")) return json({ suggestions: [] });
      return json({ error: "boom" }, 500);
    });
    renderOpen();
    const input = await screen.findByRole("textbox");
    await userEvent.type(input, "what is taintgate{Enter}");
    expect(await screen.findByText(/did not respond/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  test("waking state appears when health is slow", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    stub((url) => {
      if (url.endsWith("/health")) return new Promise<Response>((r) => setTimeout(() => r(json({ ok: true, chunks: 318 })), 5000));
      return json({ suggestions: [] });
    });
    renderOpen();
    await waitFor(() => expect(screen.getByText(/waking/i)).toBeInTheDocument(), { timeout: 4000 });
    vi.useRealTimers();
  });
});
