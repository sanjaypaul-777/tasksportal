/**
 * TasksPortal — single source of truth for copy, links, meta, and tracking.
 * Edit this file only; rebuild (`npm run build` or `npm run cpanel:prep`) before upload.
 *
 * BeMob landing pixel: set `tracking.bemobLandingPixelSrc` to the script URL from your BeMob dashboard.
 * (React injects a <script src="…"> in <head> at runtime — no manual index.html edits needed.)
 */

export const siteConfig = {
  brand: {
    namePrimary: "Tasks",
    nameAccent: "Portal",
    tagline: "Your Gateway to Premium Side Hustles.",
  },

  meta: {
    title: "TasksPortal | Universal Rewards Portal — UK",
    description:
      "Join thousands of UK members earning PayPal, Amazon, and Google Play credit by sharing their opinion. Start earning today.",
    keywords:
      "rewards portal UK, earn PayPal credit, Amazon gift card, Google Play, surveys, app testing, TasksPortal",
  },

  /** Primary outbound CTA (same tab navigation handled in App). */
  urls: {
    mainCta: "https://ggawc.bemobtrcks.com/click",
  },

  /**
   * BeMob landing pixel — paste your full script `src` URL from BeMob dashboard.
   * Injected into <head> at runtime. Leave empty string to skip.
   * Example shape: "https://ggawc.bemobtrcks.com/landing?...=YOUR_TOKEN"
   */
  tracking: {
    bemobLandingPixelSrc: "",
  },

  supportEmail: "support@tasksportal.online",

  hero: {
    headline: "Turn Your Time into Daily Rewards",
    subheadline:
      "Join thousands of UK members earning PayPal, Amazon, and Google Play credit by sharing their opinion.",
    ctaLabel: "Start Earning Now",
    ctaConnectingLabel: "Connecting to Portal...",
  },

  features: {
    sectionTitle: "Earn your way",
    sectionSubtitle: "Pick what fits your day — every path leads to real rewards.",
    items: [
      {
        id: "surveys",
        title: "Take Surveys",
        description: "Share your opinion on brands, products, and everyday topics you already care about.",
        icon: "clipboard",
      },
      {
        id: "apps",
        title: "Test Apps",
        description: "Try new apps and features. Your feedback helps shape products before they launch.",
        icon: "smartphone",
      },
      {
        id: "games",
        title: "Play Games",
        description: "Complete fun milestones and quests while rewards stack in the background.",
        icon: "gamepad",
      },
    ],
  },

  trustBar: {
    title: "Rewards you can trust",
    brands: [
      { id: "paypal", label: "PayPal" },
      { id: "amazon", label: "Amazon" },
      { id: "googleplay", label: "Google Play" },
      { id: "visa", label: "Visa" },
    ],
  },

  nav: [
    { key: "home", label: "Home" },
    { key: "features", label: "Earn" },
    { key: "faq", label: "FAQ" },
    { key: "privacy", label: "Privacy" },
    { key: "terms", label: "Terms" },
    { key: "contact", label: "Contact" },
  ],

  faqs: [
    {
      question: "Who can join?",
      answer: "Adults 18+ in supported regions. Availability of offers can vary by profile and demand.",
    },
    {
      question: "How do payouts work?",
      answer: "Depending on the offer, you may receive PayPal cash, Amazon credit, or Google Play balance after verification.",
    },
    {
      question: "Do I need experience?",
      answer: "No. Tasks are designed to be simple, with clear instructions from our partner network.",
    },
  ],

  footer: {
    aboutTitle: "About",
    aboutText:
      "TasksPortal.online is a universal rewards portal connecting UK members with verified survey, app, and play-to-earn opportunities.",
    quickLinksTitle: "Quick links",
    legalTitle: "Legal",
    trustTitle: "Trust",
    trustBadges: [
      { id: "ssl", label: "Secure SSL" },
      { id: "support", label: "24/7 Support" },
      { id: "payouts", label: "Verified Payouts" },
    ],
    copyright: "© 2026 TasksPortal.online. All Rights Reserved. Global Task Distribution Network.",
    legalLinks: [
      { id: "privacy", view: "privacy", label: "Privacy Policy" },
      { id: "terms", view: "terms", label: "Terms of Service" },
      { id: "cookies", view: "privacy", label: "Cookie Policy" },
      { id: "contact", view: "contact", label: "Contact" },
    ],
    quickLinks: [
      { id: "home", view: "home", label: "Home" },
      { id: "earn", view: "features", label: "Ways to earn" },
      { id: "faq", view: "faq", label: "FAQ" },
    ],
  },

  contact: {
    pageTitle: "Contact Us",
    intro: "For legal notices, data requests, or partner enquiries, use the form below or email us directly.",
    successTitle: "Message sent",
    successBody: "Thanks — our team will reply as soon as possible.",
    formSubject: "TasksPortal Contact Form Submission",
    submitLabel: "Send message",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      email: { label: "Email", placeholder: "you@example.com" },
      subject: { label: "Subject", placeholder: "How can we help?" },
      message: { label: "Message", placeholder: "Write your request…" },
    },
  },

  legal: {
    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy describes how TasksPortal.online handles personal data for visitors and registered members in the UK and supported regions.",
      sections: [
        {
          title: "1. Data we collect",
          body: "We may collect identifiers you provide (email, name), technical data (IP address, device type, browser), cookies, and usage analytics to operate and secure the portal.",
        },
        {
          title: "2. Cookies",
          body: "We use cookies and similar technologies for session management, preferences, analytics, and fraud prevention. You can control cookies through your browser settings.",
        },
        {
          title: "3. Third parties & offer partners",
          body: "We may share limited data with vetted offer partners and infrastructure providers solely to deliver rewards, validate completions, and meet legal obligations.",
        },
        {
          title: "4. Your rights (UK GDPR)",
          body: "Where applicable you may request access, rectification, erasure, restriction, portability, or object to certain processing. Contact us using the details on this site.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      sections: [
        {
          title: "1. Nature of the service",
          body: "TasksPortal.online is an informational and early-access rewards portal. Features and partner offers may change without notice.",
        },
        {
          title: "2. Eligibility",
          body: "You must be 18 or older. You agree to provide accurate information and comply with partner terms when completing tasks.",
        },
        {
          title: "3. No guarantee of earnings",
          body: "Rewards depend on partner availability, your eligibility, and completion quality. Nothing on this site guarantees income or specific reward amounts.",
        },
      ],
    },
  },

  /** Floating payout toasts (bottom-left). */
  payoutToasts: {
    names: ["James W.", "Chloe S.", "Liam M.", "Amelia J.", "Oliver B.", "Sophia T."],
    amounts: ["£5.00", "£10.00", "£2.50", "£20.00", "£1.00"],
    methods: ["PayPal", "Amazon Gift Card", "Google Play"],
    firstDelayMs: 3000,
    intervalMs: 8000,
    visibleMs: 4000,
    fadeMs: 500,
  },

  formspree: {
    formId: "meeveyed",
  },

  /** Bottom home CTA strip (above footer). */
  footerCta: {
    title: "Ready when you are",
    subtitle: "Join in one tap. Same secure portal — rewards on your terms.",
  },

  faqSectionTitle: "Frequently asked questions",
};

export default siteConfig;
