This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Docker development

Run from the repository root:

```bash
cd docker
docker compose up -d
docker compose logs -f node
```

Open [http://localhost:3000](http://localhost:3000). The Node 22 container
installs the locked dependencies with `npm ci` on startup and starts Next.js.
Source files stay in the repository root; changes reload automatically.
Docker volumes keep container dependencies and `.next` output separate from
the host copies.

Run additional commands from `docker/`:

```bash
docker compose exec node npm run lint
docker compose stop
docker compose start
```

This Compose project has its own network and volumes and exposes only port
3000 on localhost. It does not start or modify PHP, Nginx, MySQL, or Laravel
services. If port 3000 is occupied, use `WEBSHOP_PORT=3001 docker compose up -d`.
The existing API URL in `src/app/api/AxiosInstance.tsx` is unchanged.
For a local Laravel API, browser requests must use a browser-accessible host
URL; requests made inside the Node container can reach host services through
`host.docker.internal` on Docker Desktop. Laravel must allow the frontend
origin in its CORS configuration when using a different origin.

API image paths starting with `/storage/` or `storage/` use
`https://admin.sladesignshop.com` as their origin. To use another image host,
set `NEXT_PUBLIC_ASSET_BASE_URL=https://your-image-host.example` in `.env.local`
or the deployment environment before running `npm run build`. Rebuild and
redeploy after changing it. Use the origin without `/api` or `/storage`.
Absolute image URLs and local assets such as `/icon.jpg` remain unchanged.

### Without Docker

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
