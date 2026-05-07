'use client';

export default function RenderLoop() {
  return (
    <div className="flex items-center justify-center h-full">
      <svg width="600" height="400" viewBox="0 0 600 400">
        {/* Render */}
        <g>
          <rect x="50" y="50" width="140" height="60" rx="12" fill="#06b6d4" className="opacity-30" />
          <text x="120" y="85" textAnchor="middle" className="fill-cyan-400 text-xl font-mono font-bold">render</text>
        </g>

        {/* Arrow to effects */}
        <path d="M 190 80 L 250 80" stroke="#94a3b8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />

        {/* Effects */}
        <g>
          <rect x="250" y="50" width="140" height="60" rx="12" fill="#f43f5e" className="opacity-30" />
          <text x="320" y="85" textAnchor="middle" className="fill-rose-400 text-xl font-mono font-bold">effects</text>
        </g>

        {/* Arrow to check */}
        <path d="M 390 80 L 450 80" stroke="#94a3b8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />

        {/* Check */}
        <g>
          <rect x="410" y="50" width="140" height="60" rx="12" fill="#a78bfa" className="opacity-30" />
          <text x="480" y="85" textAnchor="middle" className="fill-purple-400 text-xl font-mono font-bold">check</text>
        </g>

        {/* Arrow down to event */}
        <path d="M 480 110 L 480 180" stroke="#94a3b8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />

        {/* Event */}
        <g>
          <rect x="410" y="180" width="140" height="60" rx="12" fill="#fbbf24" className="opacity-30" />
          <text x="480" y="215" textAnchor="middle" className="fill-yellow-400 text-xl font-mono font-bold">event</text>
        </g>

        {/* Arrow back to check */}
        <path d="M 410 210 L 350 210 L 350 150 L 410 150" stroke="#94a3b8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

        {/* Arrow from check back to render */}
        <path d="M 480 50 L 480 20 L 120 20 L 120 50" stroke="#94a3b8" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

        {/* Labels */}
        <text x="220" y="70" textAnchor="middle" className="fill-slate-400 text-xs">after render</text>
        <text x="420" y="70" textAnchor="middle" className="fill-slate-400 text-xs">check updates</text>
        <text x="510" y="150" textAnchor="middle" className="fill-slate-400 text-xs">no updates</text>
        <text x="280" y="240" textAnchor="middle" className="fill-slate-400 text-xs">queue update</text>
        <text x="300" y="10" textAnchor="middle" className="fill-slate-400 text-xs">state changed</text>

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
