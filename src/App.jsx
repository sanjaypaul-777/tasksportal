import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  Gamepad2,
  Lock,
  Menu,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import siteConfig from "./siteConfig";
import { mountPayoutNotifications } from "./payoutNotifications";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function FeatureIcon({ name }) {
  const className = "h-8 w-8 text-neon";
  if (name === "clipboard") return <ClipboardList className={className} aria-hidden />;
  if (name === "gamepad") return <Gamepad2 className={className} aria-hidden />;
  return <Smartphone className={className} aria-hidden />;
}

function ViewLink({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-sm font-medium interactive ${
        active ? "text-neon" : "text-slate-400 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-neon interactive ${
          active ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );
}

function BackToHome({ onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-neon hover:text-white interactive"
    >
      <ChevronLeft size={16} aria-hidden />
      Back to Home
    </button>
  );
}

function PrivacyView({ onBack }) {
  const { title, intro, sections } = siteConfig.legal.privacy;
  return (
    <section className="neo-card p-6 sm:p-10">
      <BackToHome onBack={onBack} />
      <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{intro}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-400">
        {sections.map((block) => (
          <div key={block.title}>
            <h2 className="text-lg font-semibold text-white">{block.title}</h2>
            <p className="mt-2">{block.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TermsView({ onBack }) {
  const { title, sections } = siteConfig.legal.terms;
  return (
    <section className="neo-card p-6 sm:p-10">
      <BackToHome onBack={onBack} />
      <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-400">
        {sections.map((block) => (
          <div key={block.title}>
            <h2 className="text-lg font-semibold text-white">{block.title}</h2>
            <p className="mt-2">{block.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactView({ onBack }) {
  const [state, handleSubmit] = useForm(siteConfig.formspree.formId);
  const c = siteConfig.contact;
  const email = siteConfig.supportEmail;

  if (state.succeeded) {
    return (
      <section className="neo-card p-6 sm:p-10">
        <BackToHome onBack={onBack} />
        <h1 className="font-display text-3xl font-bold text-white">{c.successTitle}</h1>
        <p className="mt-3 text-slate-400">{c.successBody}</p>
      </section>
    );
  }

  return (
    <section className="neo-card p-6 sm:p-10">
      <BackToHome onBack={onBack} />
      <h1 className="font-display text-3xl font-bold text-white">{c.pageTitle}</h1>
      <p className="mt-3 text-sm text-slate-400">
        {c.intro} <span className="text-neon">{email}</span>
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
            {c.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={c.fields.name.placeholder}
            className="w-full rounded-xl border border-white/10 bg-vault/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-neon/60 interactive"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-rose-400" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
            {c.fields.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={c.fields.email.placeholder}
            className="w-full rounded-xl border border-white/10 bg-vault/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-neon/60 interactive"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-rose-400" />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
            {c.fields.subject.label}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder={c.fields.subject.placeholder}
            className="w-full rounded-xl border border-white/10 bg-vault/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-neon/60 interactive"
            required
          />
          <ValidationError
            prefix="Subject"
            field="subject"
            errors={state.errors}
            className="mt-1 text-xs text-rose-400"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
            {c.fields.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={c.fields.message.placeholder}
            className="w-full rounded-xl border border-white/10 bg-vault/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-neon/60 interactive"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="mt-1 text-xs text-rose-400"
          />
        </div>
        <input type="hidden" name="_subject" value={c.formSubject} />
        <ValidationError errors={state.errors} className="text-xs text-rose-400" />
        <button type="submit" disabled={state.submitting} className="neo-cta w-full justify-center disabled:opacity-60">
          {c.submitLabel}
        </button>
      </form>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState("home");
  const [activeNav, setActiveNav] = useState("home");
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCta, setActiveCta] = useState(null);

  const featuresRef = useRef(null);
  const faqRef = useRef(null);

  const mainCta = siteConfig.urls.mainCta;
  const hero = siteConfig.hero;

  useEffect(() => {
    document.title = siteConfig.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", siteConfig.meta.description);
    const kw = document.querySelector('meta[name="keywords"]');
    if (kw) kw.setAttribute("content", siteConfig.meta.keywords);
  }, []);

  useEffect(() => {
    const src = siteConfig.tracking.bemobLandingPixelSrc;
    if (!src || typeof document === "undefined") return undefined;
    const existing = document.querySelector(`script[data-bemob-pixel="1"]`);
    if (existing) return undefined;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.bemobPixel = "1";
    document.head.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  useEffect(() => {
    const cleanup = mountPayoutNotifications(siteConfig);
    return cleanup;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  function handlePrimaryCtaClick(event, ctaName) {
    if (activeCta) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "click", cta: ctaName });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "click", { event_category: "cta", event_label: ctaName });
    }

    const targetUrl = new URL(mainCta);
    targetUrl.searchParams.set("event", "click");
    targetUrl.searchParams.set("cta", ctaName);

    setActiveCta(ctaName);
    window.setTimeout(() => {
      window.location.assign(targetUrl.toString());
    }, 500);
  }

  function goToView(nextView) {
    setMenuOpen(false);
    if (nextView === "faq") {
      setView("home");
      setActiveNav("faq");
      setOpenFaq(0);
      window.setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }
    if (nextView === "features") {
      setView("home");
      setActiveNav("features");
      window.setTimeout(() => {
        featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }
    setActiveNav(nextView);
    setView(nextView);
  }

  const legalView = view !== "home";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0e17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => goToView("home")}
            className="text-left font-display text-lg font-extrabold tracking-tight text-white"
          >
            <span className="text-white">{siteConfig.brand.namePrimary}</span>
            <span className="text-neon">{siteConfig.brand.nameAccent}</span>
            <p className="mt-0.5 max-w-[220px] text-[10px] font-medium uppercase tracking-wider text-slate-500">
              {siteConfig.brand.tagline}
            </p>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.nav.map((link) => (
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
            <a
              href={mainCta}
              onClick={(e) => handlePrimaryCtaClick(e, "header_cta")}
              className="neo-cta px-6 py-3 text-sm"
            >
              {activeCta === "header_cta" ? hero.ctaConnectingLabel : hero.ctaLabel}
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/10 p-2 text-white md:hidden interactive"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/70 md:hidden"
                aria-label="Close menu overlay"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed right-0 top-0 z-50 h-screen w-[min(100vw-3rem,20rem)] border-l border-white/10 bg-[#0d121f] p-5 md:hidden"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-base font-semibold text-white">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-white/10 p-2 text-slate-300 interactive"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {siteConfig.nav.map((link) => (
                    <button
                      key={link.key}
                      type="button"
                      onClick={() => goToView(link.key)}
                      className="text-left text-sm font-medium text-slate-300 hover:text-neon interactive"
                    >
                      {link.label}
                    </button>
                  ))}
                  <a
                    href={mainCta}
                    onClick={(e) => handlePrimaryCtaClick(e, "mobile_cta")}
                    className="neo-cta mt-4 w-full justify-center py-3 text-sm"
                  >
                    {activeCta === "mobile_cta" ? hero.ctaConnectingLabel : hero.ctaLabel}
                  </a>
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
          transition={{ duration: 0.25 }}
          className="mx-auto max-w-5xl space-y-24 px-5 py-16 md:space-y-28 md:px-8 md:py-20 lg:px-10"
        >
          {legalView ? (
            <>
              {view === "privacy" && <PrivacyView onBack={() => setView("home")} />}
              {view === "terms" && <TermsView onBack={() => setView("home")} />}
              {view === "contact" && <ContactView onBack={() => setView("home")} />}
            </>
          ) : (
            <>
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                className="mx-auto max-w-3xl text-center"
              >
                <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                  {hero.headline}
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                  {hero.subheadline}
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={mainCta}
                    onClick={(e) => handlePrimaryCtaClick(e, "hero_primary")}
                    className="neo-cta min-w-[240px] justify-center px-10 py-4 text-lg"
                  >
                    {activeCta === "hero_primary" ? hero.ctaConnectingLabel : hero.ctaLabel}
                  </a>
                </div>
              </motion.section>

              <motion.section
                ref={featuresRef}
                id="features"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="scroll-mt-28"
              >
                <div className="mb-10 text-center">
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {siteConfig.features.sectionTitle}
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">{siteConfig.features.sectionSubtitle}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {siteConfig.features.items.map((item) => (
                    <article key={item.id} className="neo-card p-6 text-left">
                      <FeatureIcon name={item.icon} />
                      <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                    </article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="neo-card px-6 py-10 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {siteConfig.trustBar.title}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                  {siteConfig.trustBar.brands.map((b) => (
                    <span
                      key={b.id}
                      className="font-display text-lg font-bold uppercase tracking-wider text-slate-600 grayscale"
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </motion.section>

              <motion.section
                ref={faqRef}
                id="faq"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="scroll-mt-28"
              >
                <h2 className="mb-8 text-center font-display text-2xl font-bold text-white sm:text-3xl">
                  {siteConfig.faqSectionTitle}
                </h2>
                <div className="mx-auto max-w-2xl space-y-3">
                  {siteConfig.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={faq.question} className="rounded-xl border border-white/10 bg-[#121826]/80">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left interactive"
                        >
                          <span className="font-medium text-slate-100">{faq.question}</span>
                          <ChevronDown
                            className={`shrink-0 interactive ${isOpen ? "rotate-180 text-neon" : "text-slate-500"}`}
                            aria-hidden
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-4 text-sm leading-relaxed text-slate-500">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="neo-card px-6 py-12 text-center"
              >
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {siteConfig.footerCta.title}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">{siteConfig.footerCta.subtitle}</p>
                <a
                  href={mainCta}
                  onClick={(e) => handlePrimaryCtaClick(e, "footer_cta_strip")}
                  className="neo-cta mt-8 inline-flex justify-center px-10 py-4"
                >
                  {activeCta === "footer_cta_strip" ? hero.ctaConnectingLabel : hero.ctaLabel}
                </a>
              </motion.section>
            </>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className="mt-12 border-t border-white/[0.06] bg-[#080b12]/90 px-5 py-12 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              {siteConfig.footer.aboutTitle}
            </h4>
            <p className="text-sm leading-relaxed text-slate-500">{siteConfig.footer.aboutText}</p>
            <p className="text-xs text-slate-600">
              Contact: <span className="text-neon/90">{siteConfig.supportEmail}</span>
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              {siteConfig.footer.quickLinksTitle}
            </h4>
            {siteConfig.footer.quickLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToView(item.view)}
                className="block text-left text-sm text-slate-500 hover:text-neon interactive"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              {siteConfig.footer.legalTitle}
            </h4>
            {siteConfig.footer.legalLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToView(item.view)}
                className="block text-left text-sm text-slate-500 hover:text-neon interactive"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              {siteConfig.footer.trustTitle}
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              {siteConfig.footer.trustBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-2 grayscale">
                  {badge.id === "ssl" && <ShieldCheck size={14} className="shrink-0" aria-hidden />}
                  {badge.id === "support" && <BadgeCheck size={14} className="shrink-0" aria-hidden />}
                  {badge.id === "payouts" && <Lock size={14} className="shrink-0" aria-hidden />}
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">{siteConfig.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
