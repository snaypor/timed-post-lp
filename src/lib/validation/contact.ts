import { z } from "zod";

/**
 * Contact Form validation schema
 * Includes honeypot field and timing check
 */
export const contactSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required")
            .max(100, "Name must be 100 characters or less"),
        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .max(254, "Email must be 254 characters or less"),
        message: z
            .string()
            .trim()
            .min(10, "Message must be at least 10 characters")
            .max(5000, "Message must be 5000 characters or less"),
        // Honeypot field - must be empty (bots will fill this)
        company_website: z
            .string()
            .max(0, "Invalid submission")
            .optional()
            .default(""),
        // Timestamp for timing check (form must take > 2 seconds to submit)
        _formTime: z.number().optional(),
    })
    .strict();

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Minimum time in milliseconds that must pass between form load and submit
 * Forms submitted faster than this are likely bots
 */
export const MIN_FORM_SUBMIT_TIME_MS = 2000;
