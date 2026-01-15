// Centralized content for the marketing site

// Platform data
export const platforms = [
    { name: "Facebook", icon: "facebook" },
    { name: "Instagram", icon: "instagram" },
    { name: "TikTok", icon: "tiktok" },
    { name: "Threads", icon: "threads" },
    { name: "YouTube", icon: "youtube" },
] as const;

// Features data
export const features = [
    {
        title: "Social Accounts Linking",
        description: "Connect your platforms once, then schedule from one place. Best part: no more logging in and out of different apps.",
        icon: "calendar",
    },
    {
        title: "Content Calendar",
        description: "Visual calendar shows all scheduled posts so you never miss a beat.",
        icon: "grid",
    },
    {
        title: "Know when to post",
        description: "Smart suggestions help you pick optimal times based on your audience.",
        icon: "clock",
    },
    {
        title: "Store your media",
        description: "Upload images and videos to your library for quick access when creating posts.",
        icon: "image",
    },
    {
        title: "Track what works",
        description: "Simple analytics show which posts perform best across all platforms.",
        icon: "chart",
    },
    {
        title: "Work with your team",
        description: "Invite team members, assign roles, and collaborate on content together.",
        icon: "users",
    },
] as const;

// How it works steps
export const steps = [
    {
        step: "1",
        title: "Connect your accounts",
        description: "Link your social profiles in seconds. We support all major platforms.",
    },
    {
        step: "2",
        title: "Create your content",
        description: "Write your post, add media, and customize it for each platform.",
    },
    {
        step: "3",
        title: "Schedule and relax",
        description: "Pick a time or let us suggest the best one. Your post goes live automatically.",
    },
] as const;

// Pricing plans
export const pricingPlans = [
    {
        name: "Starter",
        description: "For solo creators getting started",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            "3 connected accounts",
            "30 scheduled posts/month",
            "Basic analytics",
            "Content calendar",
            "Mobile app access",
        ],
        cta: "Start free",
        popular: false,
    },
    {
        name: "Creator",
        description: "For serious content creators",
        monthlyPrice: 19,
        yearlyPrice: 15,
        features: [
            "10 connected accounts",
            "Unlimited scheduled posts",
            "Advanced analytics",
            "AI caption suggestions",
            "Media library (5GB)",
            "Priority support",
        ],
        cta: "Start Creator",
        popular: true,
    },
    {
        name: "Studio",
        description: "For small teams and agencies",
        monthlyPrice: 49,
        yearlyPrice: 39,
        features: [
            "Unlimited connected accounts",
            "Unlimited scheduled posts",
            "Up to 5 team members",
            "Advanced analytics",
            "AI caption suggestions",
            "Media library (25GB)",
            "Priority support",
        ],
        cta: "Start Studio",
        popular: false,
    },
] as const;

// FAQ data
export const faqs = [
    {
        question: "Which platforms do you support?",
        answer: "We support X (Twitter), Instagram, TikTok, LinkedIn, Facebook, and YouTube. More platforms are added regularly.",
    },
    {
        question: "Can I try before I pay?",
        answer: "Yes! Our Starter plan is completely free forever with no credit card required. You can upgrade anytime.",
    },
    {
        question: "How does the AI suggestion work?",
        answer: "Our AI analyzes your past posts and audience engagement to suggest the best times to post for maximum reach.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Absolutely. No contracts, no commitments. Cancel your subscription anytime from your account settings.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with your paid plan.",
    },
] as const;

// Tools data
export const tools = [
    {
        title: "Bio Generator",
        description: "Create compelling social media bios that capture attention and showcase your personality.",
        href: "/tools/bio-generator",
        icon: "user",
    },
    {
        title: "Hashtag Generator",
        description: "Generate relevant hashtags to increase your reach and engagement on social media.",
        href: "/tools/hashtag-generator",
        icon: "hashtag",
    },
] as const;

// Type exports
export type Platform = typeof platforms[number];
export type Feature = typeof features[number];
export type Step = typeof steps[number];
export type PricingPlan = typeof pricingPlans[number];
export type Faq = typeof faqs[number];
export type Tool = typeof tools[number];
