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
    <footer className="border-t border-hairline bg-ground">
      <div className="h-px w-full bg-hazard/40" />
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
          <span className="text-phosphor">{FOOTER.brand}</span>
          <span aria-hidden="true">/</span>
          <span>{FOOTER.copyright(year)}</span>
        </div>

        <div className="flex items-center gap-1">
          {links.map(({ href, icon: I, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noreferrer"}
              aria-label={label}
              className="p-2 text-phosphor-dim transition-colors hover:text-hazard"
            >
              <I size={15} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
          {FOOTER.tagline} &nbsp;// EOF
        </p>
      </div>
    </footer>
  );
};

export default Footer;
