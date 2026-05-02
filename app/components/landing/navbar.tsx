"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navLinks = ["Product", "Contact", "Privacy"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl border border-emerald-300/15 bg-slate-950/70 px-4 backdrop-blur-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-[10px] font-bold text-slate-950">
            D
          </span>
          Dashigains
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-xs text-slate-300 transition hover:text-white">
              {link}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login" className="text-xs text-slate-300 transition hover:text-white">
            Sign in
          </Link>
          <Link href="/dashboard" className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/20 transition hover:brightness-110">
            Open dashboard
          </Link>
        </div>
        <button className="inline-flex rounded-xl border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden" onClick={() => setIsOpen((state) => !state)} aria-label="Toggle navigation">
          {isOpen ? <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5L15 15M15 5L5 15" /></svg> : <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5H17M3 10H17M3 15H17" /></svg>}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-emerald-300/15 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Link href="/login" className="mt-2 rounded-xl border border-white/15 px-3 py-2 text-left text-sm text-slate-200" onClick={() => setIsOpen(false)}>
                Sign in
              </Link>
              <Link href="/dashboard" className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-2 text-left text-sm font-semibold text-slate-950" onClick={() => setIsOpen(false)}>
                Open dashboard
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
