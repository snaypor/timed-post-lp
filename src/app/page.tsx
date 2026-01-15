"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";
import { platforms, features, steps, pricingPlans, faqs } from "@/lib/content";
import { SectionHeader, FeatureCard, PricingCard, FaqItem, PrimaryButton, SecondaryButton, PlatformIcon } from "@/components/ui";
import { RadialIntro } from "@/components/animate-ui/components/community/radial-intro";

// Twitter/X style testimonials - authentic and personal
const testimonials = [
  {
    text: "Finally found a scheduler that actually works. Been using it for 2 weeks now and my posting consistency has improved so much 📈",
    author: "Sarah M.",
    handle: "@sarahcreates",
    avatar: "SM",
    rating: 5,
  },
  {
    text: "The calendar view is exactly what I needed. No more spreadsheets to track my content. Simple and does the job well.",
    author: "Marcus Chen",
    handle: "@marcuschen_",
    avatar: "MC",
    rating: 5,
  },
  {
    text: "Switched from another tool last month. The UI is cleaner and scheduling across platforms is way easier. Happy so far 👍",
    author: "Alex Rivera",
    handle: "@alexrivera",
    avatar: "AR",
    rating: 5,
  },
  {
    text: "Been testing this for my small business. Works great for Instagram and Twitter. Would love LinkedIn support though!",
    author: "Jamie L.",
    handle: "@jamieleedesign",
    avatar: "JL",
    rating: 4,
  },
  {
    text: "Not gonna lie, was skeptical at first. But the free tier is actually usable unlike most tools. Upgraded after a week.",
    author: "David Park",
    handle: "@davidparkdev",
    avatar: "DP",
    rating: 5,
  },
  {
    text: "My engagement went up after I started posting consistently. This tool helped me stick to a schedule. Nothing fancy, just works.",
    author: "Nina Torres",
    handle: "@ninatorres",
    avatar: "NT",
    rating: 5,
  },
  {
    text: "Used to forget to post for days. Now everything is scheduled ahead of time. Game changer for someone as forgetful as me 😅",
    author: "Tom Wilson",
    handle: "@tomwilson_",
    avatar: "TW",
    rating: 5,
  },
  {
    text: "The analytics could be more detailed, but for scheduling? This is solid. Clean interface, no learning curve.",
    author: "Rachel Kim",
    handle: "@rachelkimwrites",
    avatar: "RK",
    rating: 4,
  },
];

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Single testimonial card
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="w-[320px] shrink-0 rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
      <StarRating rating={testimonial.rating} />
      <p className="mt-3 text-sm leading-relaxed text-[#4A4A68]">
        {testimonial.text}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] text-sm font-semibold text-[#0F2854]">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-[#0F2854]">{testimonial.author}</p>
          <p className="text-xs text-[#6B6B8D]">{testimonial.handle}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth infinite scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset when we've scrolled half the content (since we duplicate it)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#BDE8F5]/30 via-[#F8FCFF] to-[#BDE8F5]/20" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left - Text Content */}
            <div>
              <span className="inline-block rounded-full bg-[#BDE8F5] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F2854]">
                Social Media Scheduler
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0F2854] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Schedule posts, boost your presence daily
              </h1>

              <p className="mt-6 max-w-xl text-lg text-[#4A4A68]">
                Our platform transforms how you manage social media, helping you plan content,
                reach your audience, and grow your following.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <PrimaryButton href={siteConfig.cta.primary.href} showArrow>
                  Get started today
                </PrimaryButton>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-[#4A4A68] hover:text-[#0F2854]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">Call us directly</span>
                </a>
              </div>
            </div>

            {/* Right - Animated Platform Icons */}
            <div className="relative hidden lg:flex items-center justify-center">
              <RadialIntro
                size={360}
                orbitItems={platforms.map((platform, index) => ({
                  id: index + 1,
                  name: platform.name,
                  icon: <PlatformIcon name={platform.icon} className="h-6 w-6" />,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - X/Twitter Style Carousel */}
      <section className="overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Testimonials"
            title="What our users are saying"
          />
        </div>

        {/* Scrolling testimonials */}
        <div
          ref={scrollRef}
          className="mt-12 flex gap-6 overflow-hidden px-4"
          style={{ scrollBehavior: "auto" }}
        >
          {/* Duplicate testimonials for infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Features"
            title="Everything you need to run your socials on autopilot"
            subtitle="Keep all your projects, tasks, and posts in one organized hub with a centralized workspace."
          />

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            badge="How it works"
            title="Stay productive with smarter scheduling"
            subtitle="Adapt the platform to match the way your workflow works."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-[#4988C4]/30 to-transparent md:block" />
                )}
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1C4D8D] text-2xl font-bold text-white shadow-lg shadow-[#1C4D8D]/25">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#0F2854]">{step.title}</h3>
                <p className="mt-2 text-[#4A4A68]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Pricing Section */}
      <section id="pricing" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Simple plans. No weird surprises."
            subtitle="Pick what fits your workflow today. Upgrade when you grow."
          />

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-[#0F2854] font-medium" : "text-[#6B6B8D]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative h-7 w-14 rounded-full transition-colors ${billingCycle === "yearly" ? "bg-[#4988C4]" : "bg-[#E5E7F0]"
                }`}
            >
              <div
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform shadow-sm ${billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                  }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "text-[#0F2854] font-medium" : "text-[#6B6B8D]"}`}>
              Yearly
              <span className="ml-1.5 rounded-full bg-[#BDE8F5] px-2 py-0.5 text-xs text-[#0F2854]">
                Save 20%
              </span>
            </span>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
            ))}
          </div>

          {/* Need help */}
          <p className="mt-10 text-center text-sm text-[#6B6B8D]">
            Need help choosing?{" "}
            <Link href="/contact" className="text-[#4988C4] hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            badge="FAQ"
            title="Everything you want to know"
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

