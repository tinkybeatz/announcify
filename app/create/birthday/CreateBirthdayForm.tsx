"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import ShareButton from "@/components/shareButton";

type StepStatus = "completed" | "current" | "upcoming";

interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  status: StepStatus;
  isLast?: boolean;
}

function StepIndicator({
  stepNumber,
  title,
  status,
  isLast,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
            transition-all duration-300 ease-in-out
            ${
              status === "completed"
                ? "bg-main-red text-white"
                : status === "current"
                ? "bg-main-red text-white ring-4 ring-red-100"
                : "bg-white text-zinc-500"
            }
          `}
        >
          {status === "completed" ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            stepNumber
          )}
        </div>
        <span
          className={`
            mt-2 text-xs font-medium transition-colors duration-300
            ${
              status === "current"
                ? "text-red-600"
                : status === "completed"
                ? "text-zinc-700"
                : "text-zinc-400"
            }
          `}
        >
          {title}
        </span>
      </div>
      {!isLast && (
        <div
          className={`
            w-24 h-0.5 mx-3 mb-6 transition-colors duration-300
            ${status === "completed" ? "bg-main-red" : "bg-zinc-200"}
          `}
        />
      )}
    </div>
  );
}

export function CreateBirthdayForm() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cardLink, setCardLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cardCreated, setCardCreated] = useState(false);
  const [shortMessageAcknowledged, setShortMessageAcknowledged] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    to: "",
    from: "",
    message: "",
    giftOption: "none" as "none" | "gift",
    giftDescription: "",
    theme: "basic" as "basic" | "dark" | "other",
  });

  // Pre-fill 'from' field with user's first name if logged in
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user?.firstName && !formData.from) {
      setFormData((prev) => ({ ...prev, from: session.user.firstName || "" }));
    }
  }, [session, formData.from]);

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Options" },
    { number: 3, title: "Review" },
  ];

  const getStepStatus = (stepNumber: number): StepStatus => {
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "current";
    return "upcoming";
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    setError(null);
    if (step === 1) {
      if (
        !formData.to.trim() ||
        !formData.from.trim() ||
        !formData.message.trim()
      ) {
        setError("Please fill every field to keep the magic personal.");
        return false;
      }
      
      // Check if message is under 100 characters and not yet acknowledged
      if (formData.message.trim().length < 100 && !shortMessageAcknowledged) {
        setError("Your message is a bit short (under 100 characters). Click Continue again if you'd like to proceed anyway, or add more to make it extra special.");
        return false;
      }
    }
    if (step === 2) {
      if (formData.giftOption === "gift" && !formData.giftDescription.trim()) {
        setError("Please describe the gift you're including.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    // If on step 1 and message is short but not yet acknowledged
    if (currentStep === 1 && formData.message.trim().length < 100 && !shortMessageAcknowledged) {
      if (validateStep(currentStep)) {
        // This won't proceed, but will show the warning
        return;
      }
      // Set acknowledged to true so next click will proceed
      setShortMessageAcknowledged(true);
      return;
    }
    
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      // Reset acknowledgment when moving to next step
      if (currentStep === 1) {
        setShortMessageAcknowledged(false);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    setShortMessageAcknowledged(false);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setError(null);
      setCurrentStep(stepNumber);
    }
  };

  async function handleCreateCard() {
    // If card already exists, just re-open the modal
    if (cardCreated && cardLink) {
      setShowModal(true);
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/birthday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toName: formData.to,
          fromName: formData.from,
          message: formData.message,
          gift: formData.giftOption === "gift",
          giftDescription:
            formData.giftOption === "gift"
              ? formData.giftDescription
              : undefined,
          theme: formData.theme,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong while crafting your card.");
      }

      const body = (await res.json()) as { id?: string; url?: string };
      const redirectTo = body.url ?? (body.id ? `/birthday/${body.id}` : null);
      if (!redirectTo) {
        throw new Error("Missing birthday id.");
      }
      const fullUrl = `${window.location.origin}${redirectTo}`;
      setCardLink(fullUrl);
      setCardCreated(true);
      setShowModal(true);
      setSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create card.");
      setSubmitting(false);
    }
  }

  return (
    <div className="h-full w-full flex-col mt-6">
        {/* Stepper Header */}
        <div className="flex items-center justify-between w-full mb-6">
        <div className="flex justify-center">
          {steps.map((step, index) => (
            <div
              key={step.number}
              onClick={() => handleStepClick(step.number)}
              className={step.number < currentStep ? "cursor-pointer" : ""}
              tabIndex={-1}
            >
              <StepIndicator
                stepNumber={step.number}
                title={step.title}
                status={getStepStatus(step.number)}
                isLast={index === steps.length - 1}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          {/* Logged in status */}
          {session?.user?.firstName && (
            <div className="inline-flex w-fit items-center bg-linear-to-r from-main-red to-main-yellow rounded-full px-px py-px">
              <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-4 py-2">
                <div className="flex flex-col items-center text-main-black/80 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-zinc-600">
                      Logged in as{" "}
                      <span className="font-semibold text-zinc-900">
                        {session.user.firstName}{" "}
                      </span>{" "}
                    </span>
                  </div>
                  <span className="text-xs font-light text-zinc-400">
                    This card will be saved to your account.
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* NOT Logged in status */}
          {!session?.user?.firstName && (
            <div className="inline-flex w-fit items-center bg-linear-to-r from-zinc-300 to-zinc-400 rounded-full px-px py-px">
              <div className="bg-linear-to-r from-zinc-50 to-zinc-100 rounded-full px-4 py-2">
                <div className="flex flex-col items-center text-main-black/80 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm text-zinc-600">
                      You are {" "}
                      <span className="font-semibold text-zinc-900">NOT {" "}</span>
                      logged in
                    </span>
                  </div>
                  <span className="text-xs font-light text-zinc-400">
                    Sign-in or create an account to save the card
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Content */}
      <div className="relative overflow-hidden">
        {/* Step 1: Basic Information */}
        <div
          className={`
            transition-all duration-400 ease-in-out
            ${
              currentStep === 1
                ? "opacity-100 translate-x-0"
                : currentStep > 1
                ? "opacity-0 -translate-x-full absolute inset-0"
                : "opacity-0 translate-x-full absolute inset-0"
            }
          `}
        >
          <div className="flex flex-col w-full h-full p-6 rounded-xl space-y-4 bg-white border border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-zinc-800 font-semibold text-xl">
                Basic Information
              </h2>
            </div>

            <p className="text-zinc-500 text-sm">
              Tell us who this card is for and write your heartfelt message.
            </p>

            <div className="flex w-full space-x-3">
              <div className="flex-col w-full">
                <label
                  htmlFor="to"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Who&apos;s the celebration for?
                </label>
                <input
                  id="to"
                  name="to"
                  type="text"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-main-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Jamie"
                  maxLength={80}
                  disabled={submitting}
                  tabIndex={currentStep === 1 ? 0 : -1}
                  required
                />
              </div>

              <div className="flex-col w-full">
                <label
                  htmlFor="from"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Your name
                </label>
                <input
                  id="from"
                  name="from"
                  type="text"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-main-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Avery"
                  maxLength={80}
                  disabled={submitting}
                  tabIndex={currentStep === 1 ? 0 : -1}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-main-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                placeholder="Write something heartfelt..."
                maxLength={500}
                disabled={submitting}
                tabIndex={currentStep === 1 ? 0 : -1}
                required
              />
              <p className="text-xs text-zinc-400 mt-1 text-right">
                {formData.message.length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Options */}
        <div
          className={`
            transition-all duration-400 ease-in-out
            ${
              currentStep === 2
                ? "opacity-100 translate-x-0"
                : currentStep > 2
                ? "opacity-0 -translate-x-full absolute inset-0"
                : "opacity-0 translate-x-full absolute inset-0"
            }
          `}
        >
          <div className="flex flex-col w-full h-full p-6 rounded-xl space-y-4 bg-white border border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h2 className="text-zinc-800 font-semibold text-xl">Options</h2>
            </div>

            <p className="text-zinc-500 text-sm">
              Customize your card with additional options.
            </p>

            <div className="flex-col w-full">
              <label
                htmlFor="giftOption"
                className="block text-sm font-medium text-zinc-700"
              >
                Would you like to include a gift mention?
              </label>
              <select
                id="giftOption"
                name="giftOption"
                value={formData.giftOption}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-main-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all cursor-pointer"
                disabled={submitting}
                tabIndex={currentStep === 2 ? 0 : -1}
              >
                <option value="none">No gift mention</option>
                <option value="gift">Yes, include a gift</option>
              </select>
            </div>

            {formData.giftOption === "gift" && (
              <div className="flex-col w-full animate-fadeIn">
                <label
                  htmlFor="giftDescription"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Describe the gift
                </label>
                <input
                  id="giftDescription"
                  name="giftDescription"
                  type="text"
                  value={formData.giftDescription}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-main-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="A special surprise awaits..."
                  maxLength={200}
                  disabled={submitting}
                  tabIndex={currentStep === 2 ? 0 : -1}
                />
              </div>
            )}

            <div className="flex-col w-full">
              <label
                htmlFor="theme"
                className="block text-sm font-medium text-zinc-700"
              >
                Choose a theme
              </label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-main-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all cursor-pointer"
                disabled={submitting}
                tabIndex={currentStep === 2 ? 0 : -1}
              >
                <option value="basic">Basic</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 3: Review */}
        <div
          className={`
            transition-all duration-400 ease-in-out
            ${
              currentStep === 3
                ? "opacity-100 translate-x-0"
                : currentStep > 3
                ? "opacity-0 -translate-x-full absolute inset-0"
                : "opacity-0 translate-x-full absolute inset-0"
            }
          `}
        >
          <div className="flex flex-col w-full h-120 p-6 rounded-xl space-y-4 bg-white border border-zinc-200 overflow-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-zinc-800 font-semibold text-xl">
                Review Your Card
              </h2>
            </div>

            <p className="text-zinc-500 text-sm">
              Double-check everything before creating your card.
            </p>

            <div className="space-y-4">
              {/* Recipients Section */}
              <div className="bg-main-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">
                    Recipients
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">
                      To
                    </p>
                    <p className="text-zinc-900 font-medium">
                      {formData.to || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">
                      From
                    </p>
                    <p className="text-zinc-900 font-medium">
                      {formData.from || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-main-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">
                    Message
                  </span>
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {formData.message || "—"}
                </p>
              </div>

              {/* Gift Section */}
              <div className="bg-main-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">
                    Gift
                  </span>
                </div>
                {formData.giftOption === "gift" ? (
                  <div className="flex items-center gap-2">
                    <div className="inline-flex w-fit items-center bg-linear-to-r from-main-red to-main-yellow rounded-full px-px py-px">
                      <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-1.5 py-0.5">
                        <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
                          Included
                        </p>
                      </div>
                    </div>
                    <p className="text-zinc-700 text-sm">
                      {formData.giftDescription}
                    </p>
                  </div>
                ) : (
                  <div className="inline-flex w-fit items-center bg-linear-to-r from-zinc-300 to-zinc-400 rounded-full px-px py-px">
                    <div className="bg-linear-to-r from-zinc-50 to-zinc-100 rounded-full px-1.5 py-0.5">
                      <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
                        No gift
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Section */}
              <div className="bg-main-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">
                    Theme
                  </span>
                </div>
                <div className="inline-flex w-fit items-center bg-linear-to-r from-main-red to-main-yellow rounded-full px-px py-px">
                  <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-1.5 py-0.5">
                    <p className="text-xs text-main-black/80 font-medium whitespace-nowrap capitalize">
                      {formData.theme}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className={`mt-4 rounded-xl px-4 py-3 flex items-center gap-3 ${
          error.includes("under 100 characters")
            ? "bg-yellow-50 border border-yellow-200"
            : "bg-red-50 border border-red-200"
        }`}>
          <svg
            className={`w-5 h-5 shrink-0 ${
              error.includes("under 100 characters") ? "text-yellow-500" : "text-red-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className={`text-sm font-medium ${
            error.includes("under 100 characters") ? "text-yellow-700" : "text-red-600"
          }`}>{error}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex mt-6 justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1 || submitting}
          className={`
            inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all
            ${
              currentStep === 1
                ? "opacity-0 pointer-events-none"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
            }
          `}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-main-red px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-red-600 hover:shadow-xl disabled:opacity-60"
          >
            Continue
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCreateCard}
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-main-red px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-red-600 hover:shadow-xl disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </>
            ) : cardCreated ? (
              <>
                View Card Link
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </>
            ) : (
              <>
                Create Card
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {isMounted && showModal && createPortal(
        <ShareButton shareUrl={cardLink} onClose={() => setShowModal(false)} />,
        document.body
      )}
    </div>
  );
}
