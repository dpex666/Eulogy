interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  labels?: string[];
}

export default function StepIndicator({
  totalSteps,
  currentStep,
  labels,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200
                  ${isComplete ? 'bg-[#85F199] text-[#1D4641]' : ''}
                  ${isActive ? 'bg-[#1D4641] text-white ring-4 ring-[#D4E9CA]' : ''}
                  ${!isComplete && !isActive ? 'bg-[#F3F7FA] text-[#807388]' : ''}
                `}
              >
                {isComplete ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              {labels?.[i] && (
                <span className={`hidden text-xs sm:block ${isActive ? 'text-[#1D4641] font-semibold' : 'text-[#807388]'}`}>
                  {labels[i]}
                </span>
              )}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`h-0.5 w-8 sm:w-12 transition-all duration-200 ${
                  isComplete ? 'bg-[#85F199]' : 'bg-[#D4E9CA]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
