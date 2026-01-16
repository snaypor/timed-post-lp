import { NextRequest, NextResponse } from "next/server";

/**
 * Allowed origins for POST requests
 * Configured via environment variable or defaults to production URL
 */
function getAllowedOrigins(): string[] {
    const origins: string[] = [];

    // Production URL
    origins.push("https://timed-post-lp.vercel.app");

    // Custom domain from env
    const customUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (customUrl) {
        origins.push(customUrl.replace(/\/$/, "")); // Remove trailing slash
    }

    // Additional allowed origins (comma-separated)
    const additionalOrigins = process.env.ALLOWED_ORIGINS;
    if (additionalOrigins) {
        origins.push(
            ...additionalOrigins.split(",").map((o) => o.trim().replace(/\/$/, ""))
        );
    }

    return origins;
}

/**
 * Check if running in development mode
 */
function isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
}

/**
 * Validate the Origin or Referer header against allowed origins
 * Returns null if valid, or an error response if invalid
 */
export function checkOrigin(request: NextRequest): NextResponse | null {
    // Skip origin check in development for easier testing
    if (isDevelopment()) {
        const origin = request.headers.get("origin");
        // Allow localhost in development
        if (
            !origin ||
            origin.includes("localhost") ||
            origin.includes("127.0.0.1")
        ) {
            return null;
        }
    }

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    const allowedOrigins = getAllowedOrigins();

    // Check Origin header first
    if (origin) {
        const isAllowed = allowedOrigins.some(
            (allowed) =>
                origin === allowed ||
                origin.startsWith(allowed + "/") ||
                // Also check without protocol for flexibility
                origin.replace(/^https?:\/\//, "") ===
                allowed.replace(/^https?:\/\//, "")
        );

        if (!isAllowed) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }
        return null;
    }

    // Fallback to Host header check if Origin is missing
    // Some browsers don't send Origin for same-origin requests
    if (host) {
        const isAllowed = allowedOrigins.some((allowed) => {
            const allowedHost = allowed.replace(/^https?:\/\//, "");
            return (
                host === allowedHost ||
                host.startsWith(allowedHost + ":") || // With port
                host === "localhost" ||
                host.startsWith("localhost:")
            );
        });

        if (!isAllowed && !isDevelopment()) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }
    }

    return null;
}
