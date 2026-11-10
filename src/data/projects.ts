/**
 * Project catalog for tannerwj.com.
 *
 * To add a project: append one entry to `projects` below. That's it —
 * the home page, /projects index, filters, sitemap and llms.txt all
 * derive from this file. No HTML surgery required.
 *
 * Fields:
 * - name: display name
 * - url: live URL (external)
 * - repo: optional GitHub repo path ("owner/name")
 * - description: one or two sentences, plain language
 * - category: primary bucket used by the /projects filter
 * - tags: extra labels shown on the card
 * - featured: true = shows in the home-page bento (keep to ~4)
 * - status: "live" | "active" | "archived"
 * - cover: optional image path under /covers/ for the bento card
 */

export type Category =
  | "app"
  | "tool"
  | "game"
  | "experiment"
  | "site"
  | "client";

export interface Project {
  name: string;
  url: string;
  repo?: string;
  description: string;
  category: Category;
  tags: string[];
  featured?: boolean;
  status?: "live" | "active" | "archived";
  cover?: string;
}

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "app", label: "Apps" },
  { id: "tool", label: "Tools" },
  { id: "game", label: "Games" },
  { id: "experiment", label: "Experiments" },
  { id: "site", label: "Sites" },
  { id: "client", label: "Client work" },
];

export const projects: Project[] = [
  // ——— Flagships ———
  {
    name: "Novel Adaptations",
    url: "https://noveladaptations.com",
    description:
      "Every book becoming a movie or show, tracked in one place. Adaptation pipeline, community votes, prediction markets, and agents that surface adaptation news.",
    category: "app",
    tags: ["Books", "AI", "Community"],
    featured: true,
    status: "active",
    cover: "/covers/novel-adaptations.webp",
  },
  {
    name: "Our Family Brain",
    url: "https://ourfamilybrain.com",
    description:
      "A shared hub where each family member's AI assistant joins the same family — boards, lists, meals, chores, calendars, files, and a knowledge base that people and their agents both work in.",
    category: "app",
    tags: ["AI", "Family"],
    featured: true,
    status: "active",
    cover: "/covers/our-family-brain.webp",
  },
  {
    name: "Can My Agent",
    url: "https://canmyagent.com",
    description:
      "The prompt directory for the agent era. Every prompt is a short link your AI agent can fetch and run — browse what people have taught their agents to do, and share your own.",
    category: "app",
    tags: ["AI", "Prompts"],
    featured: true,
    status: "active",
  },
  {
    name: "The Pit",
    url: "https://pit.tannerwj.com",
    description:
      "A paper-trading league where AI agents compete on live markets with $10k of virtual capital. Scored on skill, not luck.",
    category: "app",
    tags: ["Crypto", "AI", "Game"],
    featured: true,
    status: "active",
    cover: "/covers/the-pit.webp",
  },
  {
    name: "Triangulum",
    url: "https://stars.tannerwj.com",
    description:
      "A deadpan-serious observatory for filing triangles between real stars. Real ephemerides, Latin names, a persistent registry.",
    category: "experiment",
    tags: ["Astronomy", "Fun"],
    status: "live",
    cover: "/covers/triangulum.webp",
  },

  // ——— Apps & tools ———
  {
    name: "Sweats",
    url: "https://sweats.lol",
    description: "A comic of the absurd.",
    category: "app",
    tags: ["Comics", "Fun"],
    status: "active",
  },
  {
    name: "Dual n-Back",
    url: "https://dnb.tannerwj.com",
    description:
      "The research-backed working-memory workout. Train your brain daily.",
    category: "tool",
    tags: ["Cognition"],
    status: "live",
  },
  {
    name: "Learn",
    url: "https://learn.tannerwj.com",
    description:
      "Bookmarks from X and my own notes, organized into a searchable AI knowledge base.",
    category: "tool",
    tags: ["AI", "Knowledge"],
    status: "active",
  },
  {
    name: "Lunch Picker",
    url: "https://lunch.tannerwj.com",
    description: "Decide what's for lunch. Cures decision fatigue.",
    category: "tool",
    tags: ["Fun"],
    status: "live",
  },
  {
    name: "Johnson ID",
    url: "https://github.com/tannerwj/edge-idp",
    repo: "tannerwj/edge-idp",
    description:
      "A personal identity provider — passkey-only OIDC sign-in for my apps, built on Cloudflare Workers. Open source, so anyone can deploy their own.",
    category: "tool",
    tags: ["Identity", "Security", "Open source"],
    status: "live",
  },
  {
    name: "Health",
    url: "https://health.tannerwj.com",
    description: "Personal health, training, and peptide notes.",
    category: "tool",
    tags: ["Health"],
    status: "live",
  },

  // ——— Games ———
  {
    name: "Mafia",
    url: "https://mafia.tannerwj.com",
    description: "Online multiplayer Mafia party game.",
    category: "game",
    tags: ["Multiplayer", "Fun"],
    status: "live",
  },
  {
    name: "Poké Chess",
    url: "https://poke-chess.tannerwj.com",
    description:
      "Not literally chess — a Pokémon autobattler. Draft a team, merge three to evolve, and battle through campaigns or live lobbies with up to 32 players.",
    category: "game",
    tags: ["Multiplayer", "Strategy"],
    status: "live",
  },
  {
    name: "Poké Warden",
    url: "https://poke-warden.tannerwj.com",
    description:
      "A Pokémon tower defense in the spirit of the old Warcraft III Element TD maps — three expedition modes, endless and daily runs, cloud saves.",
    category: "game",
    tags: ["Tower defense", "Fun"],
    status: "live",
  },
  {
    name: "Poké Crush",
    url: "https://poke-crush.tannerwj.com",
    description:
      "A match-3 where matches hit with real type effectiveness. A 24-level saga, a daily board, and an endless garden — no lives, no energy timers, no shop.",
    category: "game",
    tags: ["Match-3", "Fun"],
    status: "live",
  },

  // ——— Experiments ———
  {
    name: "Quantum Double-Slit",
    url: "https://quantum.tannerwj.com",
    description:
      "Wave-particle duality you can play with. The double-slit experiment, interactive.",
    category: "experiment",
    tags: ["Physics"],
    status: "live",
  },
  {
    name: "ASCII Waves",
    url: "https://ascii-waves.tannerwj.com",
    description: "An ocean rendered in ASCII, with far too many controls.",
    category: "experiment",
    tags: ["Fun", "Art"],
    status: "live",
  },
  {
    name: "Peptides",
    url: "https://peptides.tannerwj.com",
    description: "Peptides I'm trying or have tried. A personal log.",
    category: "experiment",
    tags: ["Health"],
    status: "live",
  },
  {
    name: "Palm Reader",
    url: "https://palm.tannerwj.com",
    description:
      "An AI palm reader — snap a photo of your hand and receive a reading of cosmic significance, plus tarot, birth charts, and daily fortunes. Scientifically unproven, spiritually confident.",
    category: "experiment",
    tags: ["AI", "Fun"],
    status: "live",
  },
  {
    name: "FijiBod",
    url: "https://fijibod.com",
    description: "Team fitness tracker for a Fiji trip countdown.",
    category: "experiment",
    tags: ["Fitness", "Fun"],
    status: "live",
  },

  // ——— Sites ———
  {
    name: "Hand Laundry",
    url: "https://handlaundry.com",
    description: "A comprehensive guide to hand-washing clothes.",
    category: "site",
    tags: ["Guide"],
    status: "live",
  },
  {
    name: "Humless Sentinel",
    url: "https://humlesssentinel.com",
    description: "Review of the Humless Go Mini solar generator.",
    category: "site",
    tags: ["Review"],
    status: "live",
  },

  // ——— Client work ———
  {
    name: "Peach Cleaning",
    url: "https://peach.cleaning",
    description: "Peachy Clean Windows — professional window cleaning service in Utah.",
    category: "client",
    tags: ["Web"],
    status: "live",
  },
  {
    name: "Steven Bartholomew",
    url: "https://stevenbartholomew.com",
    description: "Personal portfolio and professional site.",
    category: "client",
    tags: ["Web"],
    status: "live",
  },
  {
    name: "Lily Lane Electrolysis",
    url: "https://lilylaneelectrolysis.com",
    description: "Electrolysis and permanent hair removal services.",
    category: "client",
    tags: ["Web"],
    status: "live",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
