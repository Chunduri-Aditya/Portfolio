import { CONTACT } from "../data/content";

/**
 * Prefilled mail link for a private repo, so the ask arrives already labelled.
 *
 * Work that stays private never renders a GitHub URL that would 404. It renders
 * this instead.
 *
 * @param repo  Repository name, as it appears on GitHub.
 * @param title Project title, used in the message body.
 */
export function requestAccessHref(repo: string, title: string): string {
  const subject = `Repo access request: ${repo}`;
  const body = `Hi Aditya,\n\nI read about ${title} on your portfolio and would like access to the ${repo} repository.\n\nWho I am:\nWhy I am asking:\n\nThanks`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
