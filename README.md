# ShadowTech

Production-minded MVP scaffold for a mobile English fluency app.

## Workspaces

- `apps/mobile` - Expo React Native app.
- `apps/api` - Cloudflare Worker API.
- `packages/shared` - Shared Zod schemas and TypeScript types.
- `packages/ui` - Shared theme tokens and starter UI primitives.
- `packages/config` - Shared configuration and environment validation helpers.

## Commands

```sh
npm install
npm run typecheck
npm run dev:mobile
npm run dev:api
```

Provider integrations are intentionally stubbed until Azure, Firebase, R2, Qwen, and RevenueCat accounts are wired in.

## Product Plan

See [docs/product-plan.md](docs/product-plan.md) for MVP feature notes and follow-up implementation requirements.
