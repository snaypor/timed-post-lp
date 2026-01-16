import { NextRequest, NextResponse } from "next/server";
import { contactSchema, MIN_FORM_SUBMIT_TIME_MS, validateInput } from "@/lib/validation";
import { runSecurityChecks, RATE_LIMITS, logSecurityEvent } from "@/lib/security";

export async function POST(request: NextRequest) {
    try {
        // Run security checks (origin + rate limit)
        const securityCheck = await runSecurityChecks(request, RATE_LIMITS.contact);
        if (!securityCheck.success) {
            return securityCheck.response;
        }

        // Parse and validate input
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON" },
                { status: 400 }
            );
        }

        const validation = validateInput(contactSchema, body);
        if (!validation.success) {
            logSecurityEvent(request, "validation_failure");
            return validation.response;
        }

        const { name, email, message, company_website, _formTime } = validation.data;

        // Honeypot check - if filled, it's likely a bot
        // Return success to avoid giving feedback to bots
        if (company_website && company_website.length > 0) {
            logSecurityEvent(request, "honeypot_triggered");
            // Fake success response to not tip off bots
            return NextResponse.json({ success: true });
        }

        // Timing check - if submitted too fast, it's likely a bot
        if (_formTime) {
            const submitDuration = Date.now() - _formTime;
            if (submitDuration < MIN_FORM_SUBMIT_TIME_MS) {
                logSecurityEvent(request, "timing_check_failed", {
                    duration: submitDuration,
                });
                // Fake success response to not tip off bots
                return NextResponse.json({ success: true });
            }
        }

        // Process the contact form
        // In a real application, this would send an email or save to a database
        // For now, we log it (without PII in production)
        console.log("Contact form submission received:", {
            name: name.substring(0, 20) + (name.length > 20 ? "..." : ""),
            emailDomain: email.split("@")[1],
            messageLength: message.length,
            timestamp: new Date().toISOString(),
        });

        // TODO: Integrate with email service (e.g., Resend, SendGrid, or SMTP)
        // Example:
        // await sendEmail({
        //     to: "hello@timedpost.com",
        //     subject: `Contact form: ${name}`,
        //     text: `From: ${name} <${email}>\n\n${message}`,
        // });

        return NextResponse.json({
            success: true,
            message: "Thank you for your message. We'll get back to you soon!",
        });
    } catch (error) {
        // Never expose stack traces to client
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
