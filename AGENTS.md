<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Package manager: bun only

Use `bun` for all commands. Do not use `npm`, `npx`, `yarn`, or `pnpm`.

- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Start: `bun run start`
- Lint: `bun run lint`
- Format: `bun run format`
- Typecheck: `bun run typecheck`
- Add package: `bun add <pkg>`
- Add dev package: `bun add -d <pkg>`
- Run binary: `bunx <pkg>`

# Skills: required on every prompt

Before acting on any prompt, check `.opencode/skills/` for a skill matching the task and load it with the skill tool. Project skills take precedence over global ones. Never skip this, even for small tasks — e.g. anything Clerk-related routes through the `clerk` skill first.

# Database: push during active development

During active development, sync schema changes with `bun run db:push` (`drizzle-kit push`) only. Do not run `db:generate` or commit SQL migration files until the schema is stable and a migration is explicitly requested.
