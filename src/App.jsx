import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronDown,
  Laptop,
  Lock,
  Menu,
  ShieldCheck,
  Smartphone,
  Star,
  Wallet,
  X,
} from "lucide-react";

const navLinks = [
  { key: "home", label: "Home" },
  { key: "faq", label: "FAQ" },
  { key: "privacy", label: "Privacy" },
  { key: "terms", label: "Terms" },
  { key: "contact", label: "Contact" },
];
const SUPPORT_EMAIL = "support@tasksportal.online";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const faqs = [
  {
    question: "How fast can I receive the first payout?",
    answer:
      "Most users complete onboarding in under 10 minutes and receive their first $15.60 payout after device verification.",
  },
  {
    question: "Do I need previous experience?",
    answer: "No experience is needed. The tasks are beginner-friendly and include clear instructions.",
  },
  {
    question: "Which payout methods are available?",
    answer: "You can receive instant credits through PayPal or Amazon gift balance after approval.",
  },
  {
    question: "Is this available outside UK and AU?",
    answer:
      "The premium early-access cycle currently prioritizes United Kingdom and Australia participants.",
  },
];

const testimonials = [
  {
    name: "Liam, Manchester",
    quote: "I verified my device and got the first payout the same day. Super smooth process.",
  },
  {
    name: "Sarah, Sydney",
    quote: "The dashboard is simple, tasks are clear, and the payouts have been very reliable.",
  },
  {
    name: "Noah, Brisbane",
    quote: "I started during lunch and had my PayPal payout before dinner. Legit and fast.",
  },
];

const payoutFeedSeed = [
  "✨ Liam (Sydney) just earned $15.60",
  "✨ Sarah (London) just earned $15.60",
  "✨ Noah (Melbourne) just earned $15.60",
  "✨ Ava (Manchester) just earned $15.60",
  "✨ Ethan (Perth) just earned $15.60",
  "✨ Mia (Birmingham) just earned $15.60",
  "✨ Oliver (Brisbane) just earned $15.60",
  "✨ Chloe (Leeds) just earned $15.60",
  "✨ Jack (Adelaide) just earned $15.60",
  "✨ Grace (Glasgow) just earned $15.60",
  "✨ Harry (Canberra) just earned $15.60",
  "✨ Isla (Liverpool) just earned $15.60",
];

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function SpotTracker({ compact = false, spotsLeft = 7 }) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-amber-200/50 bg-amber-100/10 px-4 py-2 text-amber-100 interactive ${
        compact ? "text-xs" : "text-sm"
      }`}
    >
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" />
      Hurry! Only <span className="font-bold text-white">{spotsLeft}</span> spots left in your area.
    </div>
  );
}

function ViewLink({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm interactive ${
        active ? "text-emerald-300" : "text-slate-200 hover:text-emerald-300"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-emerald-300 interactive ${
          active ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );
}

function BackToHome({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200 interactive"
    >
      <ChevronLeft size={16} />
      Back to Home
    </button>
  );
}

function PrivacyView({ onBack, region }) {
  return (
    <section className="hover-card rounded-3xl bg-slate-900/50 p-6 sm:p-10">
      <BackToHome onBack={onBack} />
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-3 text-slate-300">
        This placeholder policy applies to SideHustlePro early-access services for users in {region}, the UK, and AU.
      </p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
        <div>
          <h2 className="text-lg font-semibold text-white">1. Data Collection</h2>
          <p className="mt-2">
            We collect account and usage data necessary to operate this portal, including cookie identifiers, session
            analytics, IP addresses, browser metadata, and device verification signals used to prevent fraud.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">2. Third-Party Sharing</h2>
          <p className="mt-2">
            Data may be shared with trusted Offer Partners and compliance vendors solely for campaign delivery,
            conversion validation, anti-abuse checks, and payout reconciliation under strict contractual controls.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">3. User Rights (GDPR / APPs)</h2>
          <p className="mt-2">
            Where applicable, users can request access, correction, deletion, processing restrictions, or portability
            of personal data under GDPR and Australian Privacy Principles (APPs). Withdrawal of consent may reduce
            platform functionality where processing is required for service delivery.
          </p>
        </div>
      </div>
    </section>
  );
}

function TermsView({ onBack }) {
  return (
    <section className="hover-card rounded-3xl bg-slate-900/50 p-6 sm:p-10">
      <BackToHome onBack={onBack} />
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
        <div>
          <h2 className="text-lg font-semibold text-white">1. Early Access Nature</h2>
          <p className="mt-2">
            SideHustlePro is a limited-capacity early access portal. Features, partner campaigns, and eligibility
            criteria may change without notice while the program is actively tested.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">2. Eligibility and Age</h2>
          <p className="mt-2">
            You must be at least 18 years old to register, complete device verification, and receive incentive payouts.
            Users are responsible for providing truthful account and payout details.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">3. No Guarantee of Income</h2>
          <p className="mt-2">
            Availability of tasks and reward values depends on geography, partner demand, and compliance outcomes.
            Participation does not guarantee recurring income, specific earnings volume, or continuous offer access.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactView({ onBack }) {
  const [state, handleSubmit] = useForm("meeveyed");

  if (state.succeeded) {
    return (
      <section className="hover-card rounded-3xl bg-slate-900/50 p-6 sm:p-10">
        <BackToHome onBack={onBack} />
        <h1 className="text-3xl font-bold text-white">Message Sent</h1>
        <p className="mt-3 text-slate-300">
          Thanks for reaching out. Our team will reply from {SUPPORT_EMAIL} as soon as possible.
        </p>
      </section>
    );
  }

  return (
    <section className="hover-card rounded-3xl bg-slate-900/50 p-6 sm:p-10">
      <BackToHome onBack={onBack} />
      <h1 className="text-3xl font-bold text-white">Contact Us</h1>
      <p className="mt-3 text-slate-300">
        For legal notices, data requests, or campaign support, use the form below or email {SUPPORT_EMAIL}.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400 interactive"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-rose-300" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400 interactive"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-rose-300" />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-200">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400 interactive"
            required
          />
          <ValidationError
            prefix="Subject"
            field="subject"
            errors={state.errors}
            className="mt-1 text-xs text-rose-300"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your request..."
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400 interactive"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="mt-1 text-xs text-rose-300"
          />
        </div>
        <input type="hidden" name="_subject" value="TasksPortal Contact Form Submission" />
        <ValidationError errors={state.errors} className="text-xs text-rose-300" />
        <button type="submit" disabled={state.submitting} className="cta-button animate-pulse disabled:opacity-60">
          Send Message
        </button>
      </form>
    </section>
  );
}

function ActivityFeed({ items }) {
  return (
    <div className="fixed bottom-4 right-4 z-40 w-72 rounded-2xl border border-white/15 bg-slate-900/75 p-3 shadow-2xl backdrop-blur-xl max-sm:bottom-3 max-sm:right-3 max-sm:w-[calc(100vw-24px)]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">Live Activity</p>
      <div className="h-36 overflow-hidden">
        <AnimatePresence initial={false}>
          <div className="space-y-2">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-200"
              >
                {item.text}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [region, setRegion] = useState("United Kingdom");
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [spotsLeft, setSpotsLeft] = useState(() => {
    const saved = window.localStorage.getItem("spotsLeft");
    return saved ? Number(saved) : 7;
  });
  const [view, setView] = useState("home");
  const [activeNav, setActiveNav] = useState("home");
  const [activityFeed, setActivityFeed] = useState(() =>
    shuffleArray(payoutFeedSeed)
      .slice(0, 4)
      .map((text, idx) => ({ id: `${idx}-${text}`, text }))
  );
  const faqRef = useRef(null);
  const earningsRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const canDecrementRef = useRef(true);
  const activityQueueRef = useRef(shuffleArray(payoutFeedSeed));
  const queueIndexRef = useRef(4);

  useEffect(() => {
    const lang = navigator.language.toLowerCase();
    if (lang.includes("au")) {
      setRegion("Australia");
      return;
    }
    if (lang.includes("gb") || lang.includes("uk")) {
      setRegion("United Kingdom");
      return;
    }
    setRegion(Math.random() > 0.5 ? "United Kingdom" : "Australia");
  }, []);

  const tickerText = useMemo(
    () =>
      "User @Liam04 just earned $15.60... User @Sarah_AU just earned $15.60... User @Noah_UK just earned $15.60... User @AvaPerth just earned $15.60...",
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let timeoutId;

    function scheduleNextEntry() {
      const delay = 4000 + Math.floor(Math.random() * 3000);
      timeoutId = window.setTimeout(() => {
        if (queueIndexRef.current >= activityQueueRef.current.length) {
          activityQueueRef.current = shuffleArray(payoutFeedSeed);
          queueIndexRef.current = 0;
        }
        const nextItem = activityQueueRef.current[queueIndexRef.current];
        queueIndexRef.current += 1;
        setActivityFeed((prev) => [...prev.slice(-3), { id: `${Date.now()}-${nextItem}`, text: nextItem }]);
        scheduleNextEntry();
      }, delay);
    }

    scheduleNextEntry();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const distance = currentY - lastScrollYRef.current;

      if (distance > 120 && canDecrementRef.current) {
        canDecrementRef.current = false;
        setSpotsLeft((prev) => Math.max(2, prev - 1));
      }

      if (distance < 40) {
        canDecrementRef.current = true;
      }

      lastScrollYRef.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("spotsLeft", String(spotsLeft));
  }, [spotsLeft]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  function goToView(nextView) {
    setMenuOpen(false);
    if (nextView === "faq") {
      setView("home");
      setActiveNav("faq");
      setOpenFaq(0);
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }
    if (nextView === "earnings") {
      setView("home");
      setActiveNav("home");
      setTimeout(() => {
        earningsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }
    setActiveNav(nextView);
    setView(nextView);
  }

  const legalView = view !== "home";

  return (
    <div className="relative overflow-x-hidden">
      <div className="h-10 overflow-hidden border-b border-white/10 bg-slate-950/70">
        <div className="flex min-w-max animate-ticker items-center whitespace-nowrap py-2 text-xs font-medium text-emerald-200/90">
          <span className="mx-4">{tickerText}</span>
          <span className="mx-4">{tickerText}</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <div className="text-lg font-extrabold tracking-wide text-white">
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-slate-900">Tasks</span>
            <span className="text-emerald-600">Portal</span>
            <p className="mt-0.5 text-[11px] font-medium text-slate-300">Your Gateway to Premium Side Hustles.</p>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <ViewLink
                key={link.key}
                active={activeNav === link.key}
                onClick={() => goToView(link.key)}
              >
                {link.label}
              </ViewLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <button className="cta-button animate-pulse">Join Now</button>
          </div>

          <button
            className="rounded-md border border-white/15 p-2 text-slate-100 md:hidden interactive"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 md:hidden"
                aria-label="Close menu overlay"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/15 bg-slate-900 p-5 md:hidden"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-base font-semibold text-white">Menu</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-white/15 p-2 text-slate-200 interactive"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.key}
                      onClick={() => goToView(link.key)}
                      className="text-left text-sm text-slate-200 hover:text-emerald-300 interactive"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button className="cta-button mt-4 w-full animate-pulse">Join Now</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mx-auto max-w-7xl space-y-[120px] px-5 py-24 md:px-8 md:py-28 lg:px-10"
        >
          {legalView ? (
            <>
              {view === "privacy" && <PrivacyView onBack={() => setView("home")} region={region} />}
              {view === "terms" && <TermsView onBack={() => setView("home")} />}
              {view === "contact" && <ContactView onBack={() => setView("home")} />}
            </>
          ) : (
            <>
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="grid gap-10 lg:grid-cols-2 lg:items-center"
              >
                <div className="space-y-6">
                  <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    Premium Early Access | {region}
                  </span>
                  <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                    Turn Your Spare Time Into a $15.60/Task Income Stream.
                  </h1>
                  <p className="max-w-xl text-base text-slate-300 sm:text-lg">
                    Premium early-access for UK & AU testers. No experience needed. Verified daily payouts.
                  </p>
                  <p className="inline-flex w-fit items-center rounded-full border border-sky-300/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                    Works on PC, Mac, Tablet, and Mobile.
                  </p>
                  <SpotTracker spotsLeft={spotsLeft} />
                  <button className="cta-button animate-pulse group">
                    Check Availability & Start Now
                    <ArrowRight size={18} className="interactive group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="hover-card relative rounded-3xl bg-white/5 p-7 shadow-glow backdrop-blur">
                  <div className="absolute -top-4 right-6 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    Multi-Device Ready
                  </div>
                  <div className="mb-5 flex items-center gap-3 text-slate-200">
                    <Laptop size={22} className="text-emerald-300" />
                    <Smartphone size={20} className="text-emerald-300" />
                    <span className="text-xs uppercase tracking-wide text-slate-300">
                      Desktop + Mobile Workflow
                    </span>
                  </div>
                  <div className="space-y-5 pt-4">
                    {[
                      "Register on any device in under 60 seconds",
                      "Verify connection once to secure your payout eligibility",
                      "Track approved tasks from desktop or mobile",
                    ].map((entry) => (
                      <div
                        key={entry}
                        className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200"
                      >
                        {entry}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                ref={earningsRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">The 3-Step Income Flow</h2>
                  <p className="mt-3 text-slate-300">
                    Simple onboarding for users in {region}. Start in minutes, get paid the same day.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      icon: Lock,
                      title: "Step 1: Register Interest",
                      detail: "Join from any device and reserve your early-access testing profile.",
                    },
                    {
                      icon: Smartphone,
                      title: "Step 2: Verify Connection",
                      detail: "Complete a simple one-time task to secure your $15.60 payout.",
                    },
                    {
                      icon: Wallet,
                      title: "Step 3: Collect Earnings",
                      detail: "Receive earnings directly to your chosen account after approval.",
                    },
                  ].map((step) => (
                    <article key={step.title} className="hover-card rounded-2xl bg-slate-900/50 p-6">
                      <step.icon className="mb-4 text-emerald-300" size={28} />
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.detail}</p>
                    </article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="hover-card rounded-3xl bg-gradient-to-r from-slate-900/70 to-slate-800/70 p-8 text-center sm:p-12"
              >
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to claim your spot?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                  Limited tester capacity for {region}. Join now before this cycle closes and secure high-priority
                  payout slots.
                </p>
                <div className="mt-6">
                  <SpotTracker compact spotsLeft={spotsLeft} />
                </div>
                <button className="cta-button group mt-8 animate-pulse">
                  Check Availability & Start Now
                  <ArrowRight size={18} className="interactive group-hover:translate-x-1" />
                </button>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="grid gap-8 lg:grid-cols-2"
              >
                <article className="hover-card rounded-3xl bg-slate-900/50 p-8">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100">
                    <Star size={14} />
                    User Success Stories
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="min-h-36"
                    >
                      <p className="text-lg leading-relaxed text-slate-100">"{testimonials[testimonialIndex].quote}"</p>
                      <p className="mt-4 text-sm font-semibold text-emerald-300">{testimonials[testimonialIndex].name}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-6 flex gap-2">
                    {testimonials.map((item, idx) => (
                      <button
                        key={item.name}
                        onClick={() => setTestimonialIndex(idx)}
                        className={`h-2.5 rounded-full interactive ${
                          idx === testimonialIndex ? "w-8 bg-emerald-400" : "w-2.5 bg-slate-600"
                        }`}
                        aria-label={`Show testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </article>

                <article ref={faqRef} className="hover-card rounded-3xl bg-slate-900/50 p-8">
                  <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
                  <div className="mt-6 space-y-3">
                    {faqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div key={faq.question} className="rounded-xl border border-white/10 bg-slate-950/50">
                          <button
                            onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left interactive"
                          >
                            <span className="font-medium text-slate-100">{faq.question}</span>
                            <ChevronDown
                              className={`interactive ${isOpen ? "rotate-180 text-emerald-300" : "text-slate-300"}`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-4 text-sm leading-relaxed text-slate-300">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </motion.section>
            </>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-white/10 bg-slate-950/90 px-5 py-12 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">About</h4>
            <p className="text-sm text-slate-300">
              TasksPortal.online connects early testers in UK/AU with verified micro-tasks and secure daily payouts.
            </p>
            <p className="text-sm text-slate-300">Contact: {SUPPORT_EMAIL}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <button
              onClick={() => goToView("home")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              Home
            </button>
            <button
              onClick={() => goToView("earnings")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              Tasks
            </button>
            <button
              onClick={() => goToView("faq")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              FAQ
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <button
              onClick={() => goToView("privacy")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => goToView("terms")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              Terms of Service
            </button>
            <button
              onClick={() => goToView("privacy")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => goToView("contact")}
              className="block text-sm text-slate-300 hover:text-emerald-300 interactive"
            >
              Impressum
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Social / Trust</h4>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="inline-flex items-center gap-1.5 text-xs">
                <ShieldCheck size={14} />
                Secure SSL
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs">
                <BadgeCheck size={14} />
                24/7 Support
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs">
                <Lock size={14} />
                Verified Payouts
              </div>
            </div>
            <div className="text-xs text-slate-400">
              © 2026 TasksPortal.online. All Rights Reserved. Global Task Distribution Network.
            </div>
          </div>
        </div>
      </footer>
      <ActivityFeed items={activityFeed} />
    </div>
  );
}
