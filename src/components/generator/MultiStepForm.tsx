'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import StepIndicator from '@/components/ui/StepIndicator';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import FormStep5 from './FormStep5';
import { EulogyFormData } from '@/types/eulogy';

const TOTAL_STEPS = 5;

const STEP_LABELS = ['Details', 'Memories', 'Character', 'Style', 'Email'];

const initialData: EulogyFormData = {
  deceasedName: '',
  age: '',
  occupation: '',
  hometown: '',
  relationship: '',
  memories: '',
  personalityTraits: '',
  achievements: '',
  familyInfo: '',
  tone: 'warm',
  length: 'medium',
  email: '',
};

function canAdvance(step: number, data: EulogyFormData): boolean {
  if (step === 1) return data.deceasedName.trim().length > 0;
  if (step === 2) return data.relationship.trim().length > 0 && data.memories.trim().length >= 60;
  if (step === 5) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  return true;
}

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EulogyFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsMoreInfo, setNeedsMoreInfo] = useState<string | null>(null);
  const [prevEulogyCount, setPrevEulogyCount] = useState(0);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  useEffect(() => {
    if (step !== 5 || !emailValid) return;
    fetch(`/api/eulogies?email=${encodeURIComponent(formData.email)}`)
      .then((r) => r.json())
      .then((d) => setPrevEulogyCount(d.eulogies?.length ?? 0))
      .catch(() => {});
  }, [step, formData.email, emailValid]);

  function handleChange(field: keyof EulogyFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setNeedsMoreInfo(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      if (json.needsMoreInfo) {
        setNeedsMoreInfo(json.message);
        setLoading(false);
        return;
      }

      if (json.blocked) {
        // Store info and redirect to result with blocked flag
        sessionStorage.setItem('eulogy_email', formData.email);
        sessionStorage.setItem('eulogy_blocked', 'true');
        router.push('/result');
        return;
      }

      sessionStorage.setItem('eulogy_text', json.eulogy);
      sessionStorage.setItem('eulogy_email', formData.email);
      sessionStorage.setItem('eulogy_form', JSON.stringify(formData));
      sessionStorage.setItem('eulogy_blocked', 'false');
      sessionStorage.setItem('eulogy_id', json.eulogyId || '');
      sessionStorage.setItem('eulogy_saved', json.eulogySaved ? 'true' : 'false');
      router.push('/result');
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
      setLoading(false);
    }
  }

  const isLastStep = step === TOTAL_STEPS;
  const canGoNext = canAdvance(step, formData);

  return (
    <div className="min-h-screen bg-[#F3F7FA] flex flex-col items-center pt-24 pb-16 px-4">
      <div className="w-full max-w-xl">
        {/* Step indicator */}
        <div className="mb-8 flex justify-center">
          <StepIndicator
            totalSteps={TOTAL_STEPS}
            currentStep={step}
            labels={STEP_LABELS}
          />
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white border border-[#D4E9CA] p-8 shadow-sm">
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && <FormStep1 data={formData} onChange={handleChange} />}
            {step === 2 && <FormStep2 data={formData} onChange={handleChange} />}
            {step === 3 && <FormStep3 data={formData} onChange={handleChange} />}
            {step === 4 && <FormStep4 data={formData} onChange={handleChange} />}
            {step === 5 && <FormStep5 data={formData} onChange={handleChange} />}

            {error && (
              <div className="mt-4 rounded-lg bg-[#FF4E68]/10 border border-[#FF4E68]/30 px-4 py-3">
                <p className="text-sm text-[#FF4E68]">{error}</p>
              </div>
            )}

            {needsMoreInfo && (
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-300 px-4 py-4 flex flex-col gap-3">
                <p className="text-sm font-medium text-amber-800">Not enough detail to write a personal eulogy</p>
                <p className="text-sm text-amber-700">{needsMoreInfo}</p>
                <button
                  type="button"
                  onClick={() => { setNeedsMoreInfo(null); setStep(2); }}
                  className="self-start text-sm font-semibold text-amber-800 underline underline-offset-2 hover:text-amber-900"
                >
                  Go back and add more memories
                </button>
              </div>
            )}

            {step === 5 && prevEulogyCount > 0 && (
              <div className="mt-4 rounded-lg bg-[#D4E9CA] border border-[#85F199]/50 px-4 py-3 flex items-center justify-between gap-3">
                <p className="text-sm text-[#1D4641]">
                  You have {prevEulogyCount} saved {prevEulogyCount === 1 ? 'eulogy' : 'eulogies'} under this email.
                </p>
                <a
                  href="/my-eulogies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#1D4641] underline underline-offset-2 whitespace-nowrap hover:text-[#48705B]"
                >
                  View them
                </a>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className={step === 1 ? 'invisible' : ''}
              >
                Back
              </Button>

              {isLastStep ? (
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={!canGoNext || loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'Writing your eulogy...' : 'Create my eulogy'}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  disabled={!canGoNext}
                  onClick={handleNext}
                >
                  Continue
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Step counter */}
        <p className="mt-4 text-center text-sm text-[#807388]">
          Step {step} of {TOTAL_STEPS}
        </p>
      </div>
    </div>
  );
}
