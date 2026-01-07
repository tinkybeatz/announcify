"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is it free to create cards?",
    answer:
      "Yes! You can create your first card completely free. We offer a generous free tier that lets you explore our templates and create beautiful cards without any cost.",
  },
  {
    question: "How do I share my card with someone?",
    answer:
      "Once you've created your card, you'll receive a unique link that you can share via text, email, or social media. The recipient can view your card instantly without needing an account.",
  },
  {
    question: "Can I edit my card after creating it?",
    answer:
      "Absolutely! All your cards are saved to your account, and you can edit them anytime. Just go to your dashboard, select the card you want to modify, and make your changes.",
  },
  {
    question: "What types of cards can I create?",
    answer:
      "We offer a wide variety of card types including birthday, Christmas, Valentine's Day, anniversary, graduation, New Year's Eve, and more. Each category has unique templates and designs.",
  },
  {
    question: "Do I need design skills to use this?",
    answer:
      "Not at all! Our platform is designed to be beginner-friendly. Simply choose a template, customize the text and colors, and you're done. No design experience required.",
  },
  {
    question: "Can I use my own images?",
    answer:
      "Yes, you can upload your own photos and images to personalize your cards. We support common image formats like JPG, PNG, and GIF.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  isFirst: boolean;
}

function AccordionItem({ item, isOpen, onClick, isFirst }: AccordionItemProps) {
  return (
    <div className={`border-b border-main-black/20 ${isFirst ? "border-t" : ""}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
      >
        <span className="text-lg font-semibold text-main-black pr-4">
          {item.question}
        </span>
        <div className="shrink-0 w-8 h-8 rounded-full border border-main-black/30 flex items-center justify-center">
          <svg
            className={`w-4 h-4 text-main-black transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-main-black/70 leading-relaxed pr-12">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-sky-400 py-24 px-8 font-rethink">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column - Introduction */}
        <div className="flex flex-col">
          <span className="text-pink-500 font-semibold text-sm">
            Support
          </span>
          <h2 className="text-5xl font-extrabold font-raleway text-main-black mt-3">
            FAQs
          </h2>
          <p className="text-lg text-main-black/80 mt-6 leading-relaxed">
            Everything you need to know about the product and billing. Can&apos;t
            find the answer you&apos;re looking for? Please{" "}
            <a
              href="mailto:support@example.com"
              className="underline underline-offset-2 hover:text-main-black transition-colors"
            >
              chat to our friendly team
            </a>
            .
          </p>
        </div>

        {/* Right Column - FAQ Accordion */}
        <div className="flex flex-col">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => toggleQuestion(index)}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}