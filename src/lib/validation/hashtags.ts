import { z } from "zod";

/**
 * Hashtag Generator validation schema
 */
export const hashtagsSchema = z
    .object({
        topic: z
            .string()
            .trim()
            .min(1, "Topic is required")
            .max(500, "Topic must be 500 characters or less"),
        platform: z
            .enum(["all", "instagram", "tiktok", "twitter", "facebook"])
            .optional()
            .default("all"),
        style: z
            .enum(["balanced", "trending", "niche", "viral"])
            .optional()
            .default("balanced"),
        count: z
            .number()
            .int()
            .min(1, "Count must be at least 1")
            .max(30, "Count must be 30 or less")
            .optional()
            .default(15),
    })
    .strict();

export type HashtagsInput = z.infer<typeof hashtagsSchema>;
