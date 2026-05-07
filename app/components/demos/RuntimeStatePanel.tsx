import { RuntimeState } from './types';

interface RuntimeStatePanelProps {
  runtime: RuntimeState;
}

export default function RuntimeStatePanel({ runtime }: RuntimeStatePanelProps) {
  // Helper to check if a section has meaningful content
  const hasStateSlots = runtime.stateSlots && runtime.stateSlots.length > 0;
  const hasLocalVars = runtime.localVariables && runtime.localVariables.length > 0;
  const hasUpdateQueue = runtime.updateQueue && runtime.updateQueue.length > 0;
  const hasEffectQueue = runtime.effectQueue && runtime.effectQueue.length > 0;
  const hasDecisions = runtime.decisions && runtime.decisions.length > 0;
  const hasComponentTree = runtime.componentTree && runtime.componentTree.length > 0;
  const hasOutput = runtime.output;

  return (
    <div className="h-full flex flex-col overflow-auto space-y-3">
      {/* State Slots - Most important, show first */}
      {hasStateSlots && (
        <div className="space-y-2">
          <div className="text-[0.65rem] font-mono text-cyan-400/70 uppercase tracking-wide">
            State Store
          </div>
          {runtime.stateSlots!.map((slot, i) => (
            <div
              key={i}
              className="p-2.5 bg-cyan-500/10 border border-cyan-400/40 rounded-lg font-mono text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.65rem] text-cyan-400/70">Hook #{slot.hookIndex}</span>
                <span className="text-xs text-slate-400">{slot.label}</span>
              </div>
              <div className="text-base text-cyan-300 font-semibold">
                {String(slot.value)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Queue */}
      {hasUpdateQueue && (
        <div className="space-y-2">
          <div className="text-[0.65rem] font-mono text-rose-400/70 uppercase tracking-wide">
            Updates Queued
          </div>
          {runtime.updateQueue!.map((item) => (
            <div
              key={item.id}
              className="p-2 bg-rose-500/10 border border-rose-400/50 rounded font-mono text-xs text-rose-300"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* Effect Queue */}
      {hasEffectQueue && (
        <div className="space-y-2">
          <div className="text-[0.65rem] font-mono text-purple-400/70 uppercase tracking-wide">
            Effects Queued
          </div>
          {runtime.effectQueue!.map((item) => (
            <div
              key={item.id}
              className="p-2 bg-purple-500/10 border border-purple-400/50 rounded font-mono text-xs text-purple-300"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* Decisions */}
      {hasDecisions && (
        <div className="flex flex-wrap gap-2">
          {runtime.decisions!.map((decision, i) => (
            <div
              key={i}
              className={`px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                decision === 'Check'
                  ? 'bg-yellow-500/20 border border-yellow-400 text-yellow-300'
                  : 'bg-purple-500/20 border border-purple-400 text-purple-300'
              }`}
            >
              {decision}
            </div>
          ))}
        </div>
      )}

      {/* Local Variables - Less prominent */}
      {hasLocalVars && (
        <div className="space-y-1.5">
          <div className="text-[0.6rem] font-mono text-slate-500 uppercase tracking-wide">
            Locals
          </div>
          {runtime.localVariables!.map((v, i) => (
            <div
              key={i}
              className="p-1.5 bg-slate-800/30 border border-dashed border-slate-700 rounded text-xs font-mono text-slate-400"
            >
              <span className="text-slate-600">{v.name}</span>
              <span className="text-slate-600"> = </span>
              <span className="text-slate-300">{String(v.value)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Component Tree */}
      {hasComponentTree && (
        <div className="space-y-2">
          <div className="text-[0.65rem] font-mono text-slate-400 uppercase tracking-wide">
            Components
          </div>
          {runtime.componentTree!.map((node, i) => (
            <div
              key={i}
              className={`p-2 rounded font-mono text-xs ${
                node.active
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-500'
              }`}
            >
              {node.name}
              {node.hasState && (
                <span className="ml-2 text-[0.6rem] px-1.5 py-0.5 bg-cyan-500/20 rounded text-cyan-400">
                  state
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rendered Output - Always at bottom if present */}
      {hasOutput && (
        <div className="mt-auto space-y-1.5">
          <div className="text-[0.65rem] font-mono text-green-400/70 uppercase tracking-wide">
            Output
          </div>
          <div className="p-3 bg-slate-900/50 border border-slate-700 rounded">
            {runtime.output}
          </div>
        </div>
      )}
    </div>
  );
}
