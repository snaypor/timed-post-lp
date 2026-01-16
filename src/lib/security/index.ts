import { NextRequest, NextResponse } from "next/server";
import { checkOrigin } from "./origin-check";
import { checkRateLimit, RateLimitConfig } from "./rate-limit";
import { logSecurityEvent } from "./logger";

export { checkOrigin } from "./origin-check";

export {
    checkRateLimit,
    getClientIp,
    RATE_LIMITS,
    type RateLimitConfig,
} from "./rate-limit";

export { logSecurityEvent, incrementSecurityCounter } from "./logger";

export interface SecurityCheckResult {
    success: boolean;
    response?: NextResponse;
}

/**
 * Run all security checks for a POST endpoint
 * Returns early if any check fails
 */
export async function runSecurityChecks(
    request: NextRequest,
    rateLimitConfig: RateLimitConfig
): Promise<SecurityCheckResult> {
    // 1. Origin check
    const originError = checkOrigin(request);
    if (originError) {
        logSecurityEvent(request, "origin_rejected");
        return { success: false, response: originError };
    }

    // 2. Rate limit check
    const rateLimit = checkRateLimit(request, rateLimitConfig);
    if (!rateLimit.success) {
        logSecurityEvent(request, "rate_limit_exceeded", {
            resetAt: new Date(rateLimit.resetAt).toISOString(),
        });
        return {
            success: false,
            response: NextResponse.json(
                { error: "Too many requests" },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil(
                            (rateLimit.resetAt - Date.now()) / 1000
                        ).toString(),
                    },
                }
            ),
        };
    }

    return { success: true };
}
