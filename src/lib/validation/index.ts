import { ZodError, ZodSchema } from "zod";
import { NextResponse } from "next/server";

// Re-export all schemas
export { bioSchema, type BioInput } from "./bio";
export { hashtagsSchema, type HashtagsInput } from "./hashtags";
export { captionSchema, type CaptionInput } from "./caption";
export { tweetSchema, type TweetInput } from "./tweet";
export { linkedinPostSchema, type LinkedinPostInput } from "./linkedin-post";
export { contactSchema, type ContactInput, MIN_FORM_SUBMIT_TIME_MS } from "./contact";

/**
 * Standard validation error response format
 */
export interface ValidationErrorResponse {
    error: string;
    fields?: Record<string, string>;
}

/**
 * Validate input using a Zod schema and return standardized error response if invalid
 */
export function validateInput<T>(
    schema: ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; response: NextResponse } {
    const result = schema.safeParse(data);

    if (!result.success) {
        const fields: Record<string, string> = {};
        for (const error of result.error.issues) {
            const path = error.path.join(".");
            fields[path] = error.message;
        }

        return {
            success: false,
            response: NextResponse.json(
                { error: "Invalid input", fields } as ValidationErrorResponse,
                { status: 400 }
            ),
        };
    }

    return { success: true, data: result.data };
}

/**
 * Format Zod errors into a user-friendly object
 */
export function formatZodErrors(error: ZodError): Record<string, string> {
    const fields: Record<string, string> = {};
    for (const err of error.issues) {
        const path = err.path.join(".");
        fields[path] = err.message;
    }
    return fields;
}
