import type { APIRoute } from "astro";
import { projects, type Project } from "../data/projects";

/**
 * Generated /llms.txt — derived from src/data/projects.ts at build time,
 * so adding a project to the catalog updates the agent-facing file too.
 */

const oneLine = (p: Project) => {
  const first = p.description.split(/(?<=[.!?])\s/)[0] ?? p.description;
  return `- **${p.name}** — ${p.url} — ${first}`;
};

export const GET: APIRoute = () => {
  const featured = projects.filter((p) => p.featured);
  const oss = projects.filter((p) => p.category === "oss");
  const clients = projects.filter((p) => p.category === "client");
  const more = projects.filter(
    (p) => !p.featured && p.category !== "oss" && p.category !== "client"
  );

  const lines = [
    "# tannerwj.com",
    "",
    "> Personal site of Tanner Johnson — systems architect & vibe coder in Utah.",
    "> Building secure, scalable systems for humans and agents.",
    "",
    "## About",
    "",
    "Tanner Johnson builds AI-native apps on Cloudflare (Workers + D1), trading toys,",
    "dev tools, games, comics, and experiments. Most projects go from idea to live URL fast.",
    "",
    "- Home: https://tannerwj.com/",
    "- About: https://tannerwj.com/about",
    "- Now (current focus): https://tannerwj.com/now",
    "- Uses (stack + services): https://tannerwj.com/uses",
    "- Links (link-in-bio): https://tannerwj.com/links",
    "",
    "## Projects",
    "",
    "Full filterable index: https://tannerwj.com/projects",
    "",
    "### Flagships",
    "",
    ...featured.map(oneLine),
    "",
    "### More",
    "",
    ...more.map(oneLine),
    "",
    "### Open source",
    "",
    ...oss.map((p) => {
      const repo = p.repo ? `https://github.com/${p.repo}` : p.url;
      const first = p.description.split(/(?<=[.!?])\s/)[0] ?? p.description;
      return `- **${p.name}** — ${repo} — ${first}`;
    }),
    "",
    "### Client work",
    "",
    clients.map((p) => `- ${p.url}`).join(" — "),
    "",
    "## Contact / socials",
    "",
    "- GitHub: https://github.com/tannerwj",
    "- X: https://x.com/tannerwj",
    "- LinkedIn: https://www.linkedin.com/in/tannerwj/",
    "- Goodreads: https://goodreads.com/tannerwj",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
