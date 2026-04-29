import React from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, Github, Linkedin } from "lucide-react";
import { CONTACT, FOOTER } from "../data/content";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const links = [
    { href: `mailto:${CONTACT.email}`, icon: <Mail size={18} />, label: CONTACT.email },
    { href: CONTACT.github, icon: <Github size={18} />, label: "GitHub" },
    { href: CONTACT.linkedin, icon: <Linkedin size={18} />, label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-slate-800/50 bg-slate-950">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono font-bold text-slate-200 text-sm">
              {FOOTER.brand}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-cyan-400 glass glass-hover transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800/50 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
            <Terminal className="w-3 h-3 text-slate-600" />
            {FOOTER.tagline}
          </div>
          <div className="text-xs text-slate-600 font-mono">{FOOTER.copyright(year)}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
