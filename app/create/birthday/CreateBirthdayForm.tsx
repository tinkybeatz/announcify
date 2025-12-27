"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ShareButton from "@/components/shareButton";

type StepStatus = "completed" | "current" | "upcoming";

interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  status: StepStatus;
  isLast?: boolean;
}

function StepIndicator({ stepNumber, title, status, isLast }: StepIndicatorProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
            transition-all duration-300 ease-in-out
            ${status === "completed" 
              ? "bg-main-red text-white" 
              : status === "current"
                ? "bg-main-red text-white ring-4 ring-red-100"
                : "bg-zinc-200 text-zinc-500"
            }
          `}
        >
          {status === "completed" ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            stepNumber
          )}
        </div>
        <span
          className={`
            mt-2 text-xs font-medium transition-colors duration-300
            ${status === "current" ? "text-red-600" : status === "completed" ? "text-zinc-700" : "text-zinc-400"}
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
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cardLink, setCardLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cardCreated, setCardCreated] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    to: "",
    from: "",
    message: "",
    giftOption: "none" as "none" | "gift",
    giftDescription: "",
  });

  const router = useRouter();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    setError(null);
    if (step === 1) {
      if (!formData.to.trim() || !formData.from.trim() || !formData.message.trim()) {
        setError("Please fill every field to keep the magic personal.");
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
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setError(null);
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
          presentEnabled: formData.giftOption === "gift",
          giftDescription: formData.giftOption === "gift" ? formData.giftDescription : undefined,
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
    <div className="h-full w-full flex-col mt-8">
      {/* Stepper Header */}
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            onClick={() => handleStepClick(step.number)}
            className={step.number < currentStep ? "cursor-pointer" : ""}
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

      {/* Step Content */}
      <div className="relative overflow-hidden">
        {/* Step 1: Basic Information */}
        <div
          className={`
            transition-all duration-400 ease-in-out
            ${currentStep === 1 
              ? "opacity-100 translate-x-0" 
              : currentStep > 1 
                ? "opacity-0 -translate-x-full absolute inset-0" 
                : "opacity-0 translate-x-full absolute inset-0"
            }
          `}
        >
          <div className="flex flex-col w-full h-full p-6 rounded-xl space-y-4 bg-zinc-100 border border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-zinc-800 font-semibold text-xl">Basic Information</h2>
            </div>
            
            <p className="text-zinc-500 text-sm">Tell us who this card is for and write your heartfelt message.</p>

            <div className="flex w-full space-x-4">
              <div className="flex-col w-full">
                <label htmlFor="to" className="block text-sm font-medium text-zinc-700">
                  Who&apos;s the celebration for?
                </label>
                <input
                  id="to"
                  name="to"
                  type="text"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Jamie"
                  maxLength={80}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="flex-col w-full">
                <label htmlFor="from" className="block text-sm font-medium text-zinc-700">
                  Your name
                </label>
                <input
                  id="from"
                  name="from"
                  type="text"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Avery"
                  maxLength={80}
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                placeholder="Write something heartfelt..."
                maxLength={500}
                disabled={submitting}
                required
              />
              <p className="text-xs text-zinc-400 mt-1 text-right">{formData.message.length}/500</p>
            </div>
          </div>
        </div>

        {/* Step 2: Options */}
        <div
          className={`
            transition-all duration-400 ease-in-out
            ${currentStep === 2 
              ? "opacity-100 translate-x-0" 
              : currentStep > 2 
                ? "opacity-0 -translate-x-full absolute inset-0" 
                : "opacity-0 translate-x-full absolute inset-0"
            }
          `}
        >
          <div className="flex flex-col w-full h-full p-6 rounded-xl space-y-4 bg-zinc-100 border border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="text-zinc-800 font-semibold text-xl">Options</h2>
            </div>
            
            <p className="text-zinc-500 text-sm">Customize your card with additional options.</p>

            <div className="flex-col w-full">
              <label htmlFor="giftOption" className="block text-sm font-medium text-zinc-700">
                Would you like to include a gift mention?
              </label>
              <select
                id="giftOption"
                name="giftOption"
                value={formData.giftOption}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all cursor-pointer"
                disabled={submitting}
              >
                <option value="none">No gift mention</option>
                <option value="gift">Yes, include a gift</option>
              </select>
            </div>

            {formData.giftOption === "gift" && (
              <div className="flex-col w-full animate-fadeIn">
                <label htmlFor="giftDescription" className="block text-sm font-medium text-zinc-700">
                  Describe the gift
                </label>
                <input
                  id="giftDescription"
                  name="giftDescription"
                  type="text"
                  value={formData.giftDescription}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="A special surprise awaits..."
                  maxLength={200}
                  disabled={submitting}
                />
              </div>
            )}

            {formData.giftOption === "none" && (
              <div className="flex items-center justify-center py-8 text-zinc-400">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                  </svg>
                  <p className="text-sm">No additional options selected</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Review */}
        <div
          className={`
            transition-all duration-400 ease-in-out
            ${currentStep === 3 
              ? "opacity-100 translate-x-0" 
              : currentStep > 3 
                ? "opacity-0 -translate-x-full absolute inset-0" 
                : "opacity-0 translate-x-full absolute inset-0"
            }
          `}
        >
          <div className="flex flex-col w-full h-full p-6 rounded-xl space-y-4 bg-zinc-100 border border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-zinc-800 font-semibold text-xl">Review Your Card</h2>
            </div>
            
            <p className="text-zinc-500 text-sm">Double-check everything before creating your card.</p>

            <div className="space-y-4">
              {/* Recipients Section */}
              <div className="bg-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">Recipients</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">To</p>
                    <p className="text-zinc-900 font-medium">{formData.to || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">From</p>
                    <p className="text-zinc-900 font-medium">{formData.from || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">Message</span>
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {formData.message || "—"}
                </p>
              </div>

              {/* Gift Section */}
              <div className="bg-white rounded-lg p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">Gift</span>
                </div>
                {formData.giftOption === "gift" ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Included
                    </span>
                    <p className="text-zinc-700 text-sm">{formData.giftDescription}</p>
                  </div>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-200 text-zinc-600">
                    No gift
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-red-600">{error}</p>
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
            ${currentStep === 1 
              ? "opacity-0 pointer-events-none" 
              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
            }
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-main-red px-6 py-3 text-sm font-medium text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600 hover:shadow-xl hover:shadow-red-200 disabled:opacity-60"
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCreateCard}
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-main-red px-6 py-3 text-sm font-medium text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600 hover:shadow-xl hover:shadow-red-200 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </>
            ) : cardCreated ? (
              <>
                View Card Link
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </>
            ) : (
              <>
                Create Card
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {showModal && <ShareButton shareUrl={cardLink} onClose={() => setShowModal(false)} />}
    </div>
  );
}