"use client";

import { motion } from "framer-motion";
import { CountUp } from "./count-up";
import { Navbar } from "./navbar";
import { Reveal } from "./reveal";

const features = [
  {
    title: "Real Profit Tracking",
    description: "See true SaaS profitability after infrastructure, tools, payroll, and ad spend.",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#22C55E]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 15L9 10L13 14L20 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 7H15M20 7V12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "MRR & Churn Insights",
    description: "Track growth trends, retention shifts, and churn cohorts in one clean view.",
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#6366F1]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 20H21" />
        <rect x="5" y="11" width="3" height="6" rx="1" />
        <rect x="10.5" y="7" width="3" height="10" rx="1" />
        <rect x="16" y="4" width="3" height="13" rx="1" />
      </svg>
    ),
  },
  {
    title: "Cash Flow Forecasting",
    description: "Project runway and future cash positions with confidence before decisions.",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#F59E0B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3V21" strokeLinecap="round" />
        <path d="M17 8C17 6.34 14.76 5 12 5C9.24 5 7 6.34 7 8C7 9.66 9.24 11 12 11C14.76 11 17 12.34 17 14C17 15.66 14.76 17 12 17C9.24 17 7 15.66 7 14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Smart Alerts",
    description: "Get proactive notifications when churn spikes or margins drop below threshold.",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#3B82F6]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21H20.47A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" strokeLinejoin="round" />
        <path d="M12 9V13" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "Dashigains helped us finally see why our revenue looked healthy but profits were leaking every month.",
    name: "Sarah Lin",
    role: "Founder, Loopbyte",
    avatar: "SL",
    avatarBg: "bg-[#EEF2FF] text-[#6366F1]",
  },
  {
    quote: "The churn and margin alerts are insanely useful. We now fix problems before they become expensive.",
    name: "Rohit Mehta",
    role: "CEO, Stackpilot",
    avatar: "RM",
    avatarBg: "bg-[#DCFCE7] text-[#22C55E]",
  },
  {
    quote: "It feels like having a CFO dashboard built for SaaS. Setup took minutes and our team actually uses it.",
    name: "Ava Thompson",
    role: "Co-founder, Metricsly",
    avatar: "AT",
    avatarBg: "bg-[#DBEAFE] text-[#3B82F6]",
  },
];

const steps = [
  { step: "Connect your tools", desc: "Link your payment processor, CRM, and expense tools in minutes." },
  { step: "Track metrics automatically", desc: "MRR, churn, and expenses are calculated and updated in real time." },
  { step: "Get insights to grow profit", desc: "Act on alerts and forecasts before problems become expensive." },
];

export function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Hero section */}
        <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 text-center sm:px-6 sm:pt-24 lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-xs font-medium text-[#6366F1] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" />
              Built for SaaS founders
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">
              Know your real SaaS
              <span className="bg-gradient-to-r from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent"> profit</span>
              <br />— not just revenue.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#475569] sm:text-lg">
              Track MRR, churn, expenses, and real profit in one simple dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-xl bg-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#4F46E5] hover:shadow-md">
                Get Started Free
              </button>
              <button className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#475569] shadow-sm transition hover:bg-[#F1F5F9]">
                View Demo
              </button>
            </div>
            <p className="mt-4 text-xs text-[#94A3B8]">14 day trial · No credit card · Setup in 3 minutes</p>
          </Reveal>

          {/* Dashboard preview */}
          <Reveal delay={0.15} className="relative mt-16">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto max-w-4xl rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_40px_rgba(99,102,241,0.12)]"
            >
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-left">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#6366F1] text-[10px] font-bold text-white">D</span>
                    <span className="text-xs font-medium text-[#475569]">dashigains.app / dashboard</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#22C55E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                    Live · updated 12s ago
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  {[
                    { label: "Revenue", value: "$124,320", growth: "+5.2%", color: "text-[#22C55E]", bg: "bg-[#DCFCE7]" },
                    { label: "Net Profit", value: "$42,180", growth: "+8.1%", color: "text-[#6366F1]", bg: "bg-[#EEF2FF]" },
                    { label: "Orders", value: "1,284", growth: "+4.3%", color: "text-[#3B82F6]", bg: "bg-[#DBEAFE]" },
                    { label: "Margin", value: "22.9%", growth: "+1.7%", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
                  ].map(({ label, value, growth, color, bg }) => (
                    <div key={label} className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-[#94A3B8]">{label}</p>
                      <p className="mt-2 text-xl font-semibold text-[#0F172A]">{value}</p>
                      <p className={`mt-1 inline-flex items-center gap-1 rounded-full ${bg} px-2 py-0.5 text-xs font-medium ${color}`}>
                        {growth}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        {/* Stats bar */}
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="grid gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
                <div className="pt-4 sm:pt-0 sm:pl-0 sm:pr-6 first:pt-0">
                  <p className="text-sm text-[#94A3B8]">Current MRR</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">
                    <CountUp prefix="$" value={124320} />
                  </p>
                  <p className="mt-1 text-xs text-[#22C55E]">↑ 5.2% this month</p>
                </div>
                <div className="pt-4 sm:pt-0 sm:px-6">
                  <p className="text-sm text-[#94A3B8]">Monthly Churn</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">
                    <CountUp value={4.2} suffix="%" decimals={1} />
                  </p>
                  <p className="mt-1 text-xs text-[#F59E0B]">↓ 0.3% from last month</p>
                </div>
                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <p className="text-sm text-[#94A3B8]">Net Profit</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">
                    <CountUp prefix="$" value={32100} />
                  </p>
                  <p className="mt-1 text-xs text-[#22C55E]">↑ 8.1% this month</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Features */}
        <section id="product" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium text-[#6366F1]">Features</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0F172A] sm:text-4xl">
              Everything you need to run profitable growth
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                >
                  <div className={`inline-flex rounded-xl ${feature.iconBg} ${feature.iconColor} p-3`}>{feature.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">{feature.title}</h3>
                  <p className="mt-2 text-[#475569]">{feature.description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium text-[#6366F1]">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0F172A] sm:text-4xl">
              Up and running in minutes
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map(({ step, desc }, index) => (
              <Reveal key={step} delay={index * 0.1}>
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF] text-sm font-bold text-[#6366F1]">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-[#0F172A]">{step}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium text-[#6366F1]">Testimonials</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0F172A] sm:text-4xl">
              Trusted by ambitious founders
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#F59E0B]">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#475569]">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${testimonial.avatarBg}`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{testimonial.name}</p>
                      <p className="text-xs text-[#94A3B8]">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] p-10 text-center shadow-[0_8px_32px_rgba(99,102,241,0.25)]">
              <p className="text-sm font-medium text-indigo-200">Get started today</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Start tracking your real profit today</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-indigo-200">
                Join hundreds of SaaS founders who finally know where every dollar goes.
              </p>
              <button className="mt-8 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#6366F1] shadow-sm transition hover:bg-[#F8FAFC]">
                Create Free Account
              </button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer id="contact" className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#6366F1] text-[10px] font-bold text-white">D</span>
            <p>© {new Date().getFullYear()} Dashigains. All rights reserved.</p>
          </div>
          <div className="flex gap-5">
            {["Product", "Contact", "Privacy"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#475569]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
