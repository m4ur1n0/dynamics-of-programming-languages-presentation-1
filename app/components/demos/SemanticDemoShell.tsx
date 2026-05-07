'use client';

import { useState, useEffect } from 'react';
import { DemoConfig } from './types';
import CodePanel from './CodePanel';
import RuntimeStatePanel from './RuntimeStatePanel';
import PhaseTimeline from './PhaseTimeline';

interface SemanticDemoShellProps {
  config: DemoConfig;
  autoplayDelay?: number;
}

export default function SemanticDemoShell({
  config,
  autoplayDelay = 2000
}: SemanticDemoShellProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);

  const step = config.steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === config.steps.length - 1;

  // Autoplay logic
  useEffect(() => {
    if (!isAutoplay || isLastStep) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, config.steps.length - 1));
    }, autoplayDelay);

    return () => clearTimeout(timer);
  }, [isAutoplay, currentStep, isLastStep, autoplayDelay, config.steps.length]);

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    setIsAutoplay(false);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, config.steps.length - 1));
    setIsAutoplay(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAutoplay(false);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(prev => !prev);
  };

  return (
    <div className="w-full h-[680px] flex flex-col bg-slate-900 rounded-lg border border-slate-700 p-4">
      {/* Header - More compact */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-cyan-400 font-mono">{config.title}</h3>
        {config.subtitle && (
          <p className="text-xs text-slate-400 mt-1">{config.subtitle}</p>
        )}
      </div>

      {/* Main Content Area - Two columns with breathing room */}
      <div className="flex-1 flex gap-4 min-h-0 mb-4">
        {/* Left: Code Panel (60%) */}
        <div className="w-[58%]">
          <CodePanel
            codeLines={config.codeLines}
            highlightedLines={step.highlightedLines}
          />
        </div>

        {/* Right: Runtime State Panel (40%) */}
        <div className="w-[42%]">
          <RuntimeStatePanel runtime={step.runtime} />
        </div>
      </div>

      {/* Bottom: Timeline, Explanation, Controls - Compact */}
      <div className="space-y-2">
        {/* Phase Timeline - Compact */}
        <PhaseTimeline currentPhase={step.phase} />

        {/* Explanation - Smaller */}
        <div className="p-3 bg-slate-800/30 rounded">
          <div className="text-xs font-mono text-slate-500">
            Step {currentStep + 1}/{config.steps.length}
          </div>
          <div className="text-sm text-slate-200 leading-snug">{step.explanation}</div>
        </div>

        {/* Controls - Compact buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4  h-[30px] w-[200px] ">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className={`!px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                isFirstStep
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={isLastStep}
              className={`!px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                isLastStep
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-cyan-600 text-white hover:bg-cyan-500'
              }`}
            >
              Next
            </button>
            <button
              onClick={handleReset}
              className="!px-3 py-1.5 rounded-lg text-sm font-mono bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
            >
              Reset
            </button>
          </div>

          <button
            onClick={toggleAutoplay}
            className={`!px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
              isAutoplay
                ? 'bg-rose-600 text-white hover:bg-rose-500'
                : 'bg-purple-600 text-white hover:bg-purple-500'
            }`}
          >
            {isAutoplay ? '⏸' : '▶'} {isAutoplay ? 'Pause' : 'Auto'}
          </button>
        </div>
      </div>
    </div>
  );
}
