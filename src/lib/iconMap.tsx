import React from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Brain,
  Briefcase,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  ListChecks,
  Lock,
  Mail,
  Music,
  Radar,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Wrench,
  XCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * String identifiers for icons used across the portfolio.
 * Add a new icon here, then reference it by name from `src/data/content.ts`.
 */
export const ICONS = {
  Activity,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Brain,
  Briefcase,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  ListChecks,
  Lock,
  Mail,
  Music,
  Radar,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Wrench,
  XCircle,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

/**
 * Render any icon by string name. Use this in components instead of importing
 * Lucide icons directly when the icon choice is driven by content.ts data.
 */
export const Icon: React.FC<IconProps> = ({ name, size = 16, className }) => {
  const Component = ICONS[name];
  if (!Component) {
    if (typeof console !== "undefined") {
      console.warn(`[iconMap] Unknown icon name: "${name}"`);
    }
    return null;
  }
  return <Component size={size} className={className} />;
};
