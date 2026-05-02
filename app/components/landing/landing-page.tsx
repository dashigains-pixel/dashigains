"use client";

import { motion } from "framer-motion";
import { CountUp } from "./count-up";
import { Navbar } from "./navbar";
import { Reveal } from "./reveal";

const features = [
  {
    title: "Real Profit Tracking",
    description: "See true SaaS profitability after infrastructure, tools, payroll, and ad spend.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 15L9 10L13 14L20 7" />
        <path d="M20 7H15M20 7V12" />
      </svg>
    ),
  },
  {
    title: "MRR & Churn Insights",
    description: "Track growth trends, retention shifts, and churn cohorts in one clean view.",
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
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3V21" />
        <path d="M17 8C17 6.34 14.76 5 12 5C9.24 5 7 6.34 7 8C7 9.66 9.24 11 12 11C14.76 11 17 12.34 17 14C17 15.66 14.76 17 12 17C9.24 17 7 15.66 7 14" />
      </svg>
    ),
  },
  {
    title: "Smart Alerts",
    description: "Get proactive notifications when churn spikes or margins drop below threshold.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21H20.47A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" />
        <path d="M12 9V13" />
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
  },
  {
    quote: "The churn and margin alerts are insanely useful. We now fix problems before they become expensive.",
    name: "Rohit Mehta",
    role: "CEO, Stackpilot",
    avatar: "RM",
  },
  {
    quote: "It feels like having a CFO dashboard built for SaaS. Setup took minutes and our team actually uses it.",
    name: "Ava Thompson",
    role: "Co-founder, Metricsly",
    avatar: "AT",
  },
];

const steps = [
  "Connect your tools",
  "Track metrics automatically",
  "Get insights to grow profit",
];

export function LandingPage() {
  return (
    <div className="bg-[#020b17] text-slate-100">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(rgba(12,26,45,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(12,26,45,0.5)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,52px_52px,52px_52px]" />

        <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
          <Reveal>
            <p className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-1 text-xs text-emerald-200">
              Built for SaaS founders
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Know your real SaaS
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"> profit</span>
              <br />- not just revenue.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
              Track MRR, churn, expenses, and real profit in one simple dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-700/20 transition hover:scale-[1.02]">
                Get Started Free
              </button>
              <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                View Demo
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">14 day trial - No credit card - Setup in 3 minutes</p>
          </Reveal>

          <Reveal delay={0.15} className="relative mt-12">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto max-w-4xl rounded-[28px] border border-emerald-300/15 bg-slate-950/60 p-4 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl"
            >
              <div className="rounded-2xl border border-white/10 bg-[#0a1323]/90 p-5 text-left">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">dashigains.app / dashboard</span>
                  <span className="text-xs text-slate-500">Live - updated 12s ago</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-4">
                  {[
                    ["Revenue", "$124,320", "+5.2%"],
                    ["Net Profit", "$42,180", "+8.1%"],
                    ["Orders", "1,284", "+4.3%"],
                    ["Margin", "22.9%", "+1.7%"],
                  ].map(([label, value, growth]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                      <p className="mt-1 text-xs text-emerald-300">{growth}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-400">Current MRR</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  <CountUp prefix="$" value={124320} />
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Monthly Churn</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  <CountUp value={4.2} suffix="%" decimals={1} />
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Net Profit</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  <CountUp prefix="$" value={32100} />
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="product" className="mx-auto max-w-6xl px-4 py-18 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Everything you need to run profitable growth</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 shadow-lg shadow-emerald-950/25 backdrop-blur-xl"
                >
                  <div className="inline-flex rounded-xl bg-emerald-400/15 p-3 text-emerald-300">{feature.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-slate-300">{feature.description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">How it works</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step} delay={index * 0.1}>
                <div className="rounded-3xl border border-emerald-300/15 bg-slate-900/75 p-6 backdrop-blur-xl">
                  <p className="text-sm text-emerald-300">Step {index + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{step}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-18 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Trusted by ambitious founders</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <article className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-slate-200">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-semibold text-slate-950">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl border border-emerald-300/25 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-teal-500/25 p-10 text-center backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Start tracking your real profit today</h2>
            <button className="mt-8 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]">
              Create Free Account
            </button>
          </Reveal>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Dashigains. All rights reserved.</p>
          <div className="flex gap-5">
            {["Product", "Contact", "Privacy"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
