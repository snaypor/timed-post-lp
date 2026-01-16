import { z } from "zod";

/**
 * LinkedIn Post Generator validation schema
 */
export const linkedinPostSchema = z
    .object({
        topic: z
            .string()
            .trim()
            .min(1, "Topic is required")
            .max(1000, "Topic must be 1000 characters or less"),
        postType: z
            .enum(["thought_leadership", "story", "tips", "announcement", "engagement"])
            .optional()
            .default("thought_leadership"),
        tone: z
            .enum(["professional", "conversational", "inspirational", "educational"])
            .optional()
            .default("professional"),
        includeEmoji: z.boolean().optional().default(false),
    })
    .strict();

export type LinkedinPostInput = z.infer<typeof linkedinPostSchema>;
