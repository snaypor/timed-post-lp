import { z } from "zod";

/**
 * Caption Generator validation schema
 */
export const captionSchema = z
    .object({
        topic: z
            .string()
            .trim()
            .min(1, "Topic/description is required")
            .max(1000, "Topic must be 1000 characters or less"),
        platform: z
            .enum(["instagram", "tiktok", "facebook", "twitter"])
            .optional()
            .default("instagram"),
        tone: z
            .enum(["casual", "professional", "humorous", "inspirational", "storytelling"])
            .optional()
            .default("casual"),
        includeHashtags: z.boolean().optional().default(true),
        includeEmoji: z.boolean().optional().default(true),
        includeCallToAction: z.boolean().optional().default(false),
    })
    .strict();

export type CaptionInput = z.infer<typeof captionSchema>;
