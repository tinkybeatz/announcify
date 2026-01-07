"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add email sending logic here
    console.log("Form submitted:", formData);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Create", href: "/create" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-sky-400 font-rethink">
      <div className="border-y flex border-main-black/20 h-80 items-center justify-center text-main-black text-[200px] font-extrabold">
        announcify.
      </div>
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Brand & Links */}
          <div className="flex flex-col">
            <span className="text-pink-500 font-semibold text-sm">
              Get in touch
            </span>
            <h2 className="text-5xl font-extrabold font-raleway text-main-black mt-3">
              Let&apos;s connect
            </h2>
            <p className="text-lg text-main-black/80 mt-4 leading-relaxed">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>

            {/* Navigation Links */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-main-black/60 uppercase tracking-wide mb-4">
                Navigation
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-main-black hover:text-pink-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-main-black/60 uppercase tracking-wide mb-4">
                Follow us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-main-black/30 flex items-center justify-center hover:bg-main-black hover:text-yellow-50 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-main-black/30 flex items-center justify-center hover:bg-main-black hover:text-yellow-50 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-main-black/30 flex items-center justify-center hover:bg-main-black hover:text-yellow-50 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-main-black/20 bg-yellow-50 text-main-black placeholder:text-main-black/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-main-black/20 bg-yellow-50 text-main-black placeholder:text-main-black/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="px-4 py-3 rounded-xl border border-main-black/20 bg-yellow-50 text-main-black placeholder:text-main-black/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all resize-none"
              />
              <button
                type="submit"
                className="self-start bg-main-black text-yellow-50 font-medium px-8 py-3 rounded-full text-lg hover:scale-105 transition-transform duration-300"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-main-black/20">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-main-black/60 text-sm">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-main-black/60 text-sm hover:text-main-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
