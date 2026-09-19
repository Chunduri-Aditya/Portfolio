import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { CONTACT, FOOTER } from "../data/content";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const links = [
    { href: `mailto:${CONTACT.email}`, icon: Mail, label: "Email" },
    { href: CONTACT.github, icon: Github, label: "GitHub" },
    { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/[0.08]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-[12px] text-text-faint">
          <span className="text-text-dim">{FOOTER.brand}</span> · {FOOTER.copyright(year)}
        </p>
        <div className="flex items-center gap-1">
          {links.map(({ href, icon: I, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noreferrer"}
              aria-label={label}
              className="p-2 text-text-faint transition-colors hover:text-accent-teal"
            >
              <I size={16} strokeWidth={2} />
            </a>
          ))}
        </div>
        <p className="text-[12px] text-text-faint">
          <a
            href={FOOTER.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent-teal hover:decoration-accent-teal"
          >
            {FOOTER.tagline}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
