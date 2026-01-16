import { NextRequest } from "next/server";
import { getClientIp } from "./rate-limit";

export type SecurityEventType =
    | "validation_failure"
    | "rate_limit_exceeded"
    | "origin_rejected"
    | "honeypot_triggered"
    | "timing_check_failed"
    | "api_error";

interface SecurityLogEntry {
    timestamp: string;
    type: SecurityEventType;
    ip: string;
    path: string;
    details?: Record<string, unknown>;
}

/**
 * Log security events in a structured format
 * In production, this could be sent to a logging service
 *
 * IMPORTANT: Never log PII (names, emails, message content)
 * Only log counts and metadata
 */
export function logSecurityEvent(
    request: NextRequest,
    type: SecurityEventType,
    details?: Record<string, unknown>
): void {
    const entry: SecurityLogEntry = {
        timestamp: new Date().toISOString(),
        type,
        ip: getClientIp(request),
        path: new URL(request.url).pathname,
        details,
    };

    // Use structured logging format
    // In production, replace with proper logging service (e.g., Axiom, Logtail)
    if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify(entry));
    } else {
        console.log("[Security]", entry.type, entry.path, entry.details || "");
    }
}

/**
 * Increment counter for a specific event type
 * Useful for monitoring without logging every detail
 */
export function incrementSecurityCounter(type: SecurityEventType): void {
    // In production, this could send to a metrics service
    // For now, we just log a minimal entry
    if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify({ metric: "security_event", type, count: 1 }));
    }
}
