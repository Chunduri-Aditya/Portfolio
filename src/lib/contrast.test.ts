import tailwindSource from "../../tailwind.config.js?raw";

/**
 * WCAG contrast, measured against the surfaces text actually lands on.
 *
 * Surfaces stack on this page: a translucent white card sits on a translucent
 * white glass panel sitting on ink, and each layer lifts the background and
 * cuts contrast for light text. Checking against bare ink alone is how
 * `text-faint` came to measure a comfortable 5.69 in isolation while rendering
 * at 4.44 where it was actually used, under the 4.5 AA threshold.
 *
 * Tokens are read out of tailwind.config.js as raw text, so this checks the
 * literal values that ship. The matching copy in index.css is checked by
 * scripts/check-palette-sync.mjs, because Vite serves a stylesheet through its
 * CSS pipeline and a ?raw import of one comes back empty.
 */

type RGB = [number, number, number];

function parse(hex: string): RGB {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]: RGB): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Composite `fg` at `alpha` over `bg`, the way a translucent layer renders. */
function over(fg: RGB, alpha: number, bg: RGB): RGB {
  return fg.map((f, i) => Math.round(f * alpha + bg[i] * (1 - alpha))) as RGB;
}

function contrastRatio(a: RGB, b: RGB): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Pull a hex literal out of a source file by the key that precedes it. */
function hexAfter(source: string, key: string): string {
  const match = source.match(new RegExp(`${key}:\\s*"?(#[0-9a-fA-F]{6})"?`));
  if (!match) throw new Error(`no hex found for "${key}"`);
  return match[1].toLowerCase();
}

/** Pull `DEFAULT` from inside a named block, so `text` is not read as `ink`. */
function blockDefault(source: string, block: string): string {
  const match = source.match(new RegExp(`${block}:\\s*\\{[^}]*DEFAULT:\\s*"(#[0-9a-fA-F]{6})"`));
  if (!match) throw new Error(`no DEFAULT found in block "${block}"`);
  return match[1].toLowerCase();
}

const TOKENS = {
  text: blockDefault(tailwindSource, "text"),
  dim: hexAfter(tailwindSource, "dim"),
  faint: hexAfter(tailwindSource, "faint"),
  ink: blockDefault(tailwindSource, "ink"),
};

const WHITE: RGB = [255, 255, 255];
const INK = parse(TOKENS.ink);

/** The lightest surface body text sits on: a .06 card over a .04 glass panel. */
const LIGHTEST_SURFACE = over(WHITE, 0.06, over(WHITE, 0.04, INK));

const AA_NORMAL = 4.5;

describe("text contrast", () => {
  const cases: [string, string][] = [
    ["text", TOKENS.text],
    ["text-dim", TOKENS.dim],
    ["text-faint", TOKENS.faint],
  ];

  test.each(cases)("%s clears AA on bare ink", (_name, hex) => {
    expect(contrastRatio(parse(hex), INK)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  test.each(cases)("%s clears AA on the lightest stacked surface", (_name, hex) => {
    // The case that actually bit: passing on ink is not passing on a card.
    expect(contrastRatio(parse(hex), LIGHTEST_SURFACE)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

});
