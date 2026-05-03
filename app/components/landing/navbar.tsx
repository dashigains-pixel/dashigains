"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navLinks = ["Product", "Contact", "Privacy"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white/95 px-5 shadow-[0_1px_8px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#0F172A]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#6366F1] text-[11px] font-bold text-white">
            D
          </span>
          Dashigains
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-[#475569] transition hover:text-[#0F172A]">
              {link}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-[#475569] transition hover:bg-[#F1F5F9] hover:text-[#0F172A]">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4F46E5]"
          >
            Open dashboard
          </Link>
        </div>
        <button
          className="inline-flex rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2 text-[#475569] transition hover:bg-[#F1F5F9] md:hidden"
          onClick={() => setIsOpen((state) => !state)}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5L15 15M15 5L5 15" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5H17M3 10H17M3 15H17" />
            </svg>
          )}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-[#E2E8F0] bg-white px-4 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="rounded-xl px-3 py-2.5 text-sm text-[#475569] transition hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="my-1 border-t border-[#E2E8F0]" />
              <Link
                href="/login"
                className="rounded-xl px-3 py-2.5 text-sm text-[#475569] transition hover:bg-[#F8FAFC]"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#6366F1] px-3 py-2.5 text-sm font-semibold text-white text-center"
                onClick={() => setIsOpen(false)}
              >
                Open dashboard
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
