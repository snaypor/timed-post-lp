import { NextRequest } from "next/server";

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

// In-memory store for rate limiting (per-instance, suitable for serverless)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL_MS = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

    lastCleanup = now;
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetAt < now) {
            rateLimitStore.delete(key);
        }
    }
}

export interface RateLimitConfig {
    /** Maximum number of requests allowed in the window */
    limit: number;
    /** Time window in milliseconds */
    windowMs: number;
    /** Unique identifier prefix for this limiter (e.g., "contact", "tools") */
    prefix: string;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetAt: number;
}

/**
 * Get client IP from request headers
 * Handles various proxy configurations
 */
export function getClientIp(request: NextRequest): string {
    // Check common proxy headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        // Take the first IP in the chain (original client)
        return forwardedFor.split(",")[0].trim();
    }

    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp;
    }

    // Vercel-specific header
    const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
    if (vercelForwardedFor) {
        return vercelForwardedFor.split(",")[0].trim();
    }

    // Fallback - this may not be reliable in all environments
    return "unknown";
}

/**
 * Check rate limit for a given IP and configuration
 * Uses sliding window algorithm
 */
export function checkRateLimit(
    request: NextRequest,
    config: RateLimitConfig
): RateLimitResult {
    cleanupExpiredEntries();

    const ip = getClientIp(request);
    const key = `${config.prefix}:${ip}`;
    const now = Date.now();

    const entry = rateLimitStore.get(key);

    // No existing entry or expired - create new
    if (!entry || entry.resetAt < now) {
        rateLimitStore.set(key, {
            count: 1,
            resetAt: now + config.windowMs,
        });
        return {
            success: true,
            remaining: config.limit - 1,
            resetAt: now + config.windowMs,
        };
    }

    // Within window - check count
    if (entry.count >= config.limit) {
        return {
            success: false,
            remaining: 0,
            resetAt: entry.resetAt,
        };
    }

    // Increment count
    entry.count++;
    return {
        success: true,
        remaining: config.limit - entry.count,
        resetAt: entry.resetAt,
    };
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
    /** Contact form: 10 requests per 10 minutes */
    contact: {
        limit: 10,
        windowMs: 10 * 60 * 1000,
        prefix: "contact",
    },
    /** AI tools: 30 requests per 10 minutes */
    tools: {
        limit: 30,
        windowMs: 10 * 60 * 1000,
        prefix: "tools",
    },
} as const;
