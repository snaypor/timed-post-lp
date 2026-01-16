import { z } from "zod";

/**
 * Bio Generator validation schema
 * Validates user input for social media bio generation
 */
export const bioSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required")
            .max(100, "Name must be 100 characters or less"),
        niche: z
            .string()
            .trim()
            .min(1, "Niche is required")
            .max(200, "Niche must be 200 characters or less"),
        tone: z
            .enum(["professional", "casual", "witty", "minimal"])
            .optional()
            .default("professional"),
    })
    .strict();

export type BioInput = z.infer<typeof bioSchema>;
