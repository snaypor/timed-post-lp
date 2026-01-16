import { z } from "zod";

/**
 * Tweet Generator validation schema
 */
export const tweetSchema = z
    .object({
        topic: z
            .string()
            .trim()
            .min(1, "Topic is required")
            .max(500, "Topic must be 500 characters or less"),
        tone: z
            .enum(["informative", "witty", "controversial", "inspirational", "promotional"])
            .optional()
            .default("informative"),
        includeHashtags: z.boolean().optional().default(true),
        includeEmoji: z.boolean().optional().default(true),
    })
    .strict();

export type TweetInput = z.infer<typeof tweetSchema>;
