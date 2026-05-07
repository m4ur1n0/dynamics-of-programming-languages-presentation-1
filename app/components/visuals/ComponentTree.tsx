'use client';

export default function ComponentTree() {
  return (
    <div className="flex items-center justify-center h-full">
      <svg width="400" height="300" viewBox="0 0 400 300" className="text-cyan-400">
        {/* Root node */}
        <g>
          <rect x="160" y="20" width="80" height="40" rx="8" fill="currentColor" className="opacity-20" />
          <text x="200" y="45" textAnchor="middle" className="fill-slate-200 text-sm font-mono">App</text>
        </g>

        {/* Lines to children */}
        <line x1="200" y1="60" x2="120" y2="120" stroke="currentColor" strokeWidth="2" className="opacity-40" />
        <line x1="200" y1="60" x2="280" y2="120" stroke="currentColor" strokeWidth="2" className="opacity-40" />

        {/* Child nodes */}
        <g>
          <rect x="60" y="120" width="120" height="40" rx="8" fill="currentColor" className="opacity-20" />
          <text x="120" y="145" textAnchor="middle" className="fill-slate-200 text-sm font-mono">Header</text>
        </g>

        <g>
          <rect x="220" y="120" width="120" height="40" rx="8" fill="currentColor" className="opacity-20" />
          <text x="280" y="145" textAnchor="middle" className="fill-slate-200 text-sm font-mono">Content</text>
        </g>

        {/* Lines to grandchildren */}
        <line x1="280" y1="160" x2="240" y2="220" stroke="currentColor" strokeWidth="2" className="opacity-40" />
        <line x1="280" y1="160" x2="320" y2="220" stroke="currentColor" strokeWidth="2" className="opacity-40" />

        {/* Grandchild nodes */}
        <g>
          <rect x="180" y="220" width="120" height="40" rx="8" fill="currentColor" className="opacity-20" />
          <text x="240" y="245" textAnchor="middle" className="fill-slate-200 text-sm font-mono">Article</text>
        </g>

        <g>
          <rect x="280" y="220" width="80" height="40" rx="8" fill="currentColor" className="opacity-20" />
          <text x="320" y="245" textAnchor="middle" className="fill-slate-200 text-sm font-mono">Sidebar</text>
        </g>

        {/* Label */}
        <text x="200" y="290" textAnchor="middle" className="fill-slate-400 text-xs italic">Component Tree</text>
      </svg>
    </div>
  );
}
