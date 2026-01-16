This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Security

This project includes security hardening for all API endpoints. See [SECURITY.md](./SECURITY.md) for full details.

### Running Security Scans Locally

```bash
# Check for vulnerabilities in dependencies
npm audit --audit-level=high

# Run OSV Scanner (Google's vulnerability scanner)
npx osv-scanner@latest --lockfile=package-lock.json

# Check for outdated packages
npm outdated
```

### Security Features

- **Zod Validation**: All API inputs validated server-side
- **Rate Limiting**: Abuse protection on all POST endpoints
- **Anti-Spam**: Honeypot + timing checks on contact form
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **CI/CD**: Automated security scans on PRs and main branch

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
