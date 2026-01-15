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
                  Try it for free
                </PrimaryButton>
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
      {/* TODO: Enable when real testimonials are available */}
      {false && (
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
      )}

      {/* Features Section - Bento Grid */}
      <section id="features" className="bg-[#F8FCFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge="Features"
            title="Everything you need to run your socials on autopilot"
            subtitle="Keep all your projects, tasks, and posts in one organized hub with a centralized workspace."
          />

          {/* Bento Grid - 2 Columns with 40/60 Splits */}
          <div className="mt-16 flex flex-col gap-6">
            {/* Row 1 - Social Accounts (40%) + Scheduled Posts (60%) */}
            <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
              {/* Feature 1 - Social Accounts Linking - 40% */}
              <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.1)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#BDE8F5] px-3 py-1 text-xs font-medium text-[#0F2854]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Connect Once
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0F2854]">Social Accounts Linking</h3>
                <p className="mt-3 text-[#4A4A68] leading-relaxed">
                  Hook up all your favorite platforms in minutes—Instagram, TikTok, Facebook, X, LinkedIn, and more. Once connected, every post flows out from a single dashboard.
                </p>
                <div className="mt-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] p-6">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#BDE8F5] text-sm text-[#9090A7]">
                    Image Placeholder
                  </div>
                </div>
              </div>

              {/* Feature 2 - Scheduled Posts - 60% */}
              <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.1)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F0F7FF] px-3 py-1 text-xs font-medium text-[#4988C4]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Time It Right
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0F2854]">Scheduled Posts & Drafts</h3>
                <p className="mt-3 text-[#4A4A68] leading-relaxed">
                  Capture ideas the moment inspiration strikes, then polish and publish when the timing is perfect. Your drafts stay safely tucked away until you're ready.
                </p>
                <div className="mt-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] p-6">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#BDE8F5] text-sm text-[#9090A7]">
                    Image Placeholder
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 - Workspaces (60%) + Analytics (40%) */}
            <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
              {/* Feature 3 - Workspaces - 60% */}
              <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.1)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F9EE] px-3 py-1 text-xs font-medium text-emerald-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Stay Organized
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0F2854]">Workspaces (Brands)</h3>
                <p className="mt-3 text-[#4A4A68] leading-relaxed">
                  Give every brand, client, or project its own private space. Switch between them instantly without wading through unrelated content.
                </p>
                <div className="mt-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] p-6">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#BDE8F5] text-sm text-[#9090A7]">
                    Image Placeholder
                  </div>
                </div>
              </div>

              {/* Feature 4 - Analytics - 40% */}
              <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.1)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF7E6] px-3 py-1 text-xs font-medium text-amber-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  See What Works
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0F2854]">Analytics</h3>
                <p className="mt-3 text-[#4A4A68] leading-relaxed">
                  Glance at the numbers that matter: reach, engagement, growth. Without drowning in data. Spot winners fast, double down on what's clicking.
                </p>
                <div className="mt-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] p-6">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#BDE8F5] text-sm text-[#9090A7]">
                    Image Placeholder
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 - Content Calendar (40%) + Bulk Scheduling (60%) */}
            <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
              {/* Feature 5 - Content Calendar - 40% */}
              <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.1)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F3E8FF] px-3 py-1 text-xs font-medium text-purple-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Plan Visually
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0F2854]">Content Calendar</h3>
                <p className="mt-3 text-[#4A4A68] leading-relaxed">
                  Your entire content roadmap laid out in one clean view. Drag posts around to shuffle the schedule, zoom into a week, or pan out for the big picture.
                </p>
                <div className="mt-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] p-6">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#BDE8F5] text-sm text-[#9090A7]">
                    Image Placeholder
                  </div>
                </div>
              </div>

              {/* Feature 6 - Bulk Scheduling - 60% (White bg) */}
              <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.1)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0F2854] px-3 py-1 text-xs font-medium text-white">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Work Smarter
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0F2854]">Bulk Scheduling</h3>
                <p className="mt-3 text-[#4A4A68] leading-relaxed">
                  Load up an entire week or month of posts in a single power session. Upload, arrange, confirm, done. Then step away and let automation handle the rest.
                </p>
                <div className="mt-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] p-6">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#BDE8F5] text-sm text-[#9090A7]">
                    Image Placeholder
                  </div>
                </div>
              </div>
            </div>
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



      {/* Founder Bio Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,40,84,0.08)] md:p-12">
            <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-12">
              {/* Left - Photo & Info */}
              <div className="flex flex-col items-center md:items-start">
                {/* Founder photo */}
                <div className="h-64 w-64 overflow-hidden rounded-full bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] shadow-lg ring-4 ring-white">
                  <img
                    src="/images/mehdi-founder.jpg"
                    alt="Mehdi - Co-founder of Timed Post"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="mt-6 text-center md:text-left">
                  <h3 className="text-xl font-bold text-[#0F2854]">Mehdi</h3>
                  <p className="mt-1 text-sm text-[#6B6B8D]">Co-founder @ Timed Post</p>

                  {/* Social proof - optional */}
                  <div className="mt-3 flex items-center justify-center gap-2 md:justify-start">
                    <svg className="h-4 w-4 text-[#4A4A68]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-sm text-[#6B6B8D]">DJ / Producer / Builder</span>
                  </div>
                </div>
              </div>

              {/* Right - Bio Text */}
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-[#0F2854] md:text-3xl">
                  hey, i&apos;m mehdi 👋
                </h2>

                <div className="space-y-4 text-[#4A4A68] leading-relaxed">
                  <p>
                    i&apos;m one of the guys building timed post with my dev friend.
                    i did ecom for years too, so yeah i lived on social media.
                  </p>

                  <p>
                    my biggest problem was never &quot;ideas&quot;.
                    <span className="font-medium text-[#0F2854]"> it was the boring chaos after the content is ready.</span>
                  </p>

                  <p>
                    every platform wants something different.
                    different formats, different vibes, different rules, different everything.
                    and when you manage more than one account, it turns into this messy loop:
                  </p>

                  <p className="rounded-xl bg-[#F8FCFF] p-4 text-[#6B6B8D] italic border-l-4 border-[#4988C4]">
                    upload the same media again and again, tweak captions, switch apps, switch accounts, pray the post looks right.
                    it&apos;s not hard, it&apos;s just… draining.
                  </p>

                  <p>
                    i tried a bunch of schedulers to fix it.
                    but most of them felt either <span className="font-medium text-[#0F2854]">too expensive</span>, or <span className="font-medium text-[#0F2854]">too complex</span> for what i actually needed.
                    i just wanted something simple and affordable that helps me ship posts without the headache.
                  </p>

                  <p>
                    so i built timed post to manage my own apps, and keep my weekly posting plan clean.
                    <span className="font-medium text-[#0F2854]"> now we&apos;re building it for other creators and builders too.</span>
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link
                    href="/app"
                    className="inline-flex items-center gap-2 rounded-[6px] bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#1C4D8D]/25 transition-all hover:from-[#0F2854] hover:to-[#1C4D8D]"
                  >
                    Try Timed Post for free
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(15,40,84,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BDE8F5]">
                <svg className="h-5 w-5 text-[#1C4D8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#0F2854]">7-day free trial</p>
                <p className="text-xs text-[#6B6B8D]">Test everything before you commit</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(15,40,84,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BDE8F5]">
                <svg className="h-5 w-5 text-[#1C4D8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#0F2854]">Cancel anytime</p>
                <p className="text-xs text-[#6B6B8D]">No long-term commitments required</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(15,40,84,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BDE8F5]">
                <svg className="h-5 w-5 text-[#1C4D8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#0F2854]">14-day money back</p>
                <p className="text-xs text-[#6B6B8D]">Refunds available within 14 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[#F8FCFF] px-4 py-20 sm:px-6 lg:px-8">
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
              <span className="ml-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600">
                2 months free
              </span>
            </span>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
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

