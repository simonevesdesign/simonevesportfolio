# Simon Eves Portfolio

Full-stack developer & designer portfolio built with Next.js 15, Payload CMS 3, Tailwind CSS 4 and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4, custom CSS variables
- **CMS**: Payload CMS 3 with PostgreSQL adapter
- **UI helpers**: shadcn/ui deps (clsx, tailwind-merge, cva), Lucide icons
- **Fonts**: Geist, Geist Mono (Google Fonts), Schibsted Grotesk as Degular Display fallback
- **Package manager**: pnpm

## Local Development

### Prerequisites

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- PostgreSQL 16 (or run via Docker)

### 1. Clone & install

```bash
pnpm install
pnpm rebuild sharp
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URI` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Long random string for Payload JWT signing |
| `NEXT_PUBLIC_SITE_URL` | Full public URL (e.g. `https://simoneves.co.uk`) |

### 3. Start Postgres (Docker)

```bash
docker compose up db -d
```

### 4. Run dev server

```bash
pnpm dev
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin

### 5. Seed projects (optional)

```bash
pnpm seed
```

## Production Build (Docker)

Build and run the full stack:

```bash
docker compose up --build
```

Or build the image standalone:

```bash
docker build \
  --build-arg DATABASE_URI=postgresql://... \
  --build-arg PAYLOAD_SECRET=your-secret \
  --build-arg NEXT_PUBLIC_SITE_URL=https://simoneves.co.uk \
  -t simon-eves-portfolio .
```

## Deployment (Coolify / Vercel)

### Coolify (recommended for Docker image)

1. Push to Bitbucket
2. In Coolify: New resource → Dockerfile
3. Set the three env vars
4. Attach a managed PostgreSQL service
5. Deploy

### Vercel

1. Import repo in Vercel dashboard
2. Set env vars (Database URI from Neon/Supabase, Payload secret)
3. Deploy — Next.js standalone output is handled automatically

## Project Structure

```
src/
├── app/
│   ├── (payload)/          # Payload CMS admin + API routes
│   ├── globals.css         # Design tokens + all component styles
│   ├── layout.tsx          # Root layout (ThemeProvider, fonts, cursor)
│   └── page.tsx            # Home page assembly
├── collections/
│   └── Projects.ts         # Payload Project collection config
├── components/
│   ├── sections/           # HeroSection, WorkSection, etc.
│   ├── CursorFollower.tsx
│   ├── Nav.tsx
│   ├── ScrollReveal.tsx
│   ├── SiteFooter.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── projects.ts         # Static project data (used as fallback/seed)
│   └── utils.ts            # cn() helper
├── payload.config.ts       # Payload CMS config
└── seed.ts                 # DB seed script
```

## Design Tokens

All tokens live in `src/app/globals.css` as CSS custom properties. Theme switching is handled by toggling `data-theme="dark"` on `<html>` via `next-themes`.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FBFBFB` | `#0E0C0A` |
| `--ink` | `#141414` | `#F5F2EC` |
| `--accent` | `#4A2B7A` | `#B533B5` |
| `--surface` | `#FFFFFF` | `#15120F` |
