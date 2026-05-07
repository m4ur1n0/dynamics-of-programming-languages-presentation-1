'use client';

import { useEffect, useState, useRef } from 'react';

interface CodeDemoStep<T> {
  lines: string;
  state: T;
  description?: string;
}

interface CodeDemoProps<T> {
  code: string;
  language?: string;
  steps: CodeDemoStep<T>[];
  renderDemo: (state: T, currentStep: number) => React.ReactNode;
  initialState: T;
}

// Type for Reveal.js fragment events
interface RevealFragmentEvent extends CustomEvent {
  fragment: HTMLElement;
}

export default function CodeDemo<T>({
  code,
  language = 'typescript',
  steps,
  renderDemo,
  initialState,
}: CodeDemoProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentState, setCurrentState] = useState<T>(initialState);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleFragmentShown = (event: Event) => {
      // Type guard: check if event is a RevealFragmentEvent
      if (!('fragment' in event) || !(event.fragment instanceof HTMLElement)) return;
      if (!sectionRef.current?.contains(event.fragment)) return;

      const stepIndex = parseInt(event.fragment.dataset.stepIndex || '0');
      setCurrentStep(stepIndex);
      if (steps[stepIndex]) {
        setCurrentState(steps[stepIndex].state);
      }
    };

    const handleFragmentHidden = (event: Event) => {
      // Type guard: check if event is a RevealFragmentEvent
      if (!('fragment' in event) || !(event.fragment instanceof HTMLElement)) return;
      if (!sectionRef.current?.contains(event.fragment)) return;

      const stepIndex = parseInt(event.fragment.dataset.stepIndex || '0');
      if (stepIndex > 0 && steps[stepIndex - 1]) {
        setCurrentStep(stepIndex - 1);
        setCurrentState(steps[stepIndex - 1].state);
      } else {
        setCurrentStep(0);
        setCurrentState(initialState);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('fragmentshown', handleFragmentShown);
      window.addEventListener('fragmenthidden', handleFragmentHidden);

      return () => {
        window.removeEventListener('fragmentshown', handleFragmentShown);
        window.removeEventListener('fragmenthidden', handleFragmentHidden);
      };
    }
  }, [steps, initialState]);

  const lineNumbers = steps.map(step => step.lines).join('|');

  return (
    <section ref={sectionRef}>
      <div style={{ display: 'flex', gap: '2rem', height: '600px', alignItems: 'stretch' }}>
        <div style={{ flex: 1, overflow: 'auto', width: "70%"}}>
          <pre style={{ margin: 0, height: '100%' }}>
            <code
              className={`language-${language}`}
              data-line-numbers={lineNumbers}
              data-trim
            >
              {code}
            </code>
          </pre>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '30%'}}>
          <div style={{
            flex: 1,
            border: '2px solid #444',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1e1e1e'
          }}>
            {renderDemo(currentState, currentStep)}
          </div>

          {steps[currentStep]?.description && (
            <div style={{
              padding: '1rem',
              background: '#2a2a2a',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              {steps[currentStep].description}
            </div>
          )}
        </div>
      </div>

      {steps.map((_, index) => (
        <div
          key={index}
          className="fragment"
          data-step-index={index}
          style={{ display: 'none' }}
        />
      ))}
    </section>
  );
}
