# Security Policy

## Threat Model

This is a **public marketing site** with free AI-powered tools. There is **no user authentication** or session management.

### Assets to Protect
1. **OpenAI API Key** - Stored server-side, never exposed to client
2. **Server Resources** - Protected from abuse via rate limiting
3. **User Inputs** - Validated server-side to prevent injection attacks
4. **Site Integrity** - Protected via CSP and security headers

### Attack Vectors Considered
| Vector | Mitigation |
|--------|------------|
| API Abuse (spam/cost) | Rate limiting (30 req/10min for tools, 10/10min for contact) |
| Spam Submissions | Honeypot field + timing check on contact form |
| XSS | Content Security Policy (strict script-src) |
| CSRF | Origin header validation on all POST routes |
| Clickjacking | X-Frame-Options: DENY + frame-ancestors 'none' |
| MIME Sniffing | X-Content-Type-Options: nosniff |
| MitM | HSTS enabled (Vercel provides TLS) |
| Input Injection | Zod validation with strict schemas |
| Dependency Vulnerabilities | Dependabot + npm audit in CI |

---

## Protections Implemented

### Server-Side Validation (Zod)
All API endpoints use strict Zod schemas:
- `src/lib/validation/` - Schema definitions
- Unknown fields are rejected (`.strict()`)
- Input sanitized with `.trim()`, `.min()`, `.max()`
- Type coercion and format validation (`.email()`)

### Rate Limiting
In-memory sliding window rate limiter:
- **AI Tools**: 30 requests per 10 minutes per IP
- **Contact Form**: 10 requests per 10 minutes per IP
- Returns 429 with `Retry-After` header

### Anti-Spam (Contact Form)
1. **Honeypot Field**: Hidden `company_website` field - bots fill it, humans don't
2. **Timing Check**: Form submitted in < 2 seconds = bot (silently rejected)

### Origin Validation
All POST requests checked against allowlist:
- `https://timed-post-lp.vercel.app`
- `NEXT_PUBLIC_SITE_URL` environment variable
- `ALLOWED_ORIGINS` (comma-separated list)
- Localhost allowed in development only

### Security Headers
Configured in `next.config.ts`:
- **CSP**: Strict policy allowing only necessary sources
- **HSTS**: 1 year, includeSubDomains
- **X-Frame-Options**: DENY
- **Permissions-Policy**: Camera, mic, geo disabled

---

## Environment Variables

### Required
| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | API key for GPT | `sk-...` |

### Optional
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Primary site URL | `https://timedpost.com` |
| `ALLOWED_ORIGINS` | Additional allowed origins | `https://app.timedpost.com` |

### Rotating Secrets

1. **OpenAI API Key**:
   - Go to https://platform.openai.com/api-keys
   - Create new key
   - Update in Vercel: Settings → Environment Variables
   - Delete old key from OpenAI dashboard

2. **Vercel Re-deploy** (after env change):
   ```bash
   vercel --prod
   ```

---

## Running Security Scans

### Locally
```bash
# npm audit (checks package vulnerabilities)
npm audit --audit-level=high

# OSV Scanner (Google's vulnerability scanner)
npx osv-scanner@latest --lockfile=package-lock.json

# Check for outdated packages
npm outdated
```

### In CI
Security scans run automatically on:
- Every push to `main`
- Every pull request
- Weekly scheduled run (Mondays 9am UTC)

---

## Reporting Vulnerabilities

If you discover a security vulnerability, please:
1. **Do NOT** open a public issue
2. Email: security@timedpost.com
3. Include steps to reproduce
4. Allow 48 hours for initial response

---

## Verification Checklist (Production)

Run these checks after deploying:

### 1. Security Headers
```bash
curl -I https://timed-post-lp.vercel.app
# Verify: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options
```

### 2. Zod Validation
```bash
# Should return 400 with validation errors
curl -X POST https://timed-post-lp.vercel.app/api/generate-bio \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 3. Rate Limiting
```bash
# Run >30 times quickly - should eventually return 429
for i in {1..35}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST https://timed-post-lp.vercel.app/api/generate-bio \
    -H "Content-Type: application/json" \
    -d '{"name":"test","niche":"test"}'
done
```

### 4. Origin Validation
```bash
# Should return 403
curl -X POST https://timed-post-lp.vercel.app/api/generate-bio \
  -H "Origin: https://evil.com" \
  -H "Content-Type: application/json" \
  -d '{"name":"test","niche":"test"}'
```

### 5. Honeypot
Submit contact form with `company_website` field filled - should appear successful but not actually process.

### 6. npm audit
```bash
npm audit --audit-level=high
# Should report 0 high/critical vulnerabilities
```
