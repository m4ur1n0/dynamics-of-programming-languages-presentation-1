import { Phase } from './types';

interface PhaseTimelineProps {
  currentPhase: Phase;
}

const PHASES: { id: Phase; label: string; color: string }[] = [
  { id: 'idle', label: 'Idle', color: 'text-slate-400' },
  { id: 'event', label: 'Event', color: 'text-yellow-400' },
  { id: 'render', label: 'Render', color: 'text-cyan-400' },
  { id: 'useState', label: 'useState', color: 'text-cyan-400' },
  { id: 'useEffect', label: 'useEffect', color: 'text-rose-400' },
  { id: 'effect', label: 'Effect', color: 'text-rose-400' },
  { id: 'check', label: 'Check', color: 'text-purple-400' },
  { id: 'commit', label: 'Commit', color: 'text-green-400' },
  { id: 'reconcile', label: 'Reconcile', color: 'text-blue-400' },
];

export default function PhaseTimeline({ currentPhase }: PhaseTimelineProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {PHASES.map((phase, index) => {
        const isActive = phase.id === currentPhase;
        const isPast = PHASES.findIndex(p => p.id === currentPhase) > index;

        return (
          <div key={phase.id} className="flex items-center flex-shrink-0">
            <div
              className={`px-3 py-1.5 rounded text-[0.65rem] font-mono transition-all duration-200 ${
                isActive
                  ? `${phase.color} font-bold bg-slate-700 border border-current`
                  : isPast
                  ? 'text-slate-600 bg-slate-800/50'
                  : 'text-slate-700 bg-slate-800/20'
              }`}
            >
              {phase.label}
            </div>
            {index < PHASES.length - 1 && (
              <div className={`w-2 h-px transition-colors duration-200 ${
                isPast ? 'bg-slate-700' : 'bg-slate-800'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
