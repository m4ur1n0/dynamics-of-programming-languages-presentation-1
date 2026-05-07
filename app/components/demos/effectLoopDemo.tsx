import { DemoConfig } from './types';

export const effectLoopDemo: DemoConfig = {
  title: 'Effect Loop: Render → Effect → Check → Render',
  subtitle: 'Effects run AFTER render commits, triggering endless cycles',
  codeLines: [
    'function RunawayProgress() {',
    '  const [progress, setProgress] = useState(0);',
    '',
    '  useEffect(() => {',
    '    setProgress(p => p + 1);',
    '  }); // ⚠️ No dependencies!',
    '',
    '  return <progress value={progress} max={100} />;',
    '}',
  ],
  steps: [
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Initial render begins → progress = 0',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'RunawayProgress()' },
          { name: 'progress', value: 0 },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (rendering...)
          </div>
        ),
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [4, 5, 6],
      explanation: 'useEffect reached → effect body is NOT run yet, only queued',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setProgress(p => p + 1)' },
        ],
        localVariables: [
          { name: '📦 Function Call', value: 'RunawayProgress()' },
          { name: 'progress', value: 0 },
        ],
        decisions: ['Effect'],
        output: (
          <div className="space-y-2">
            <div className="text-sm text-rose-400">Effect Queue:</div>
            <div className="text-slate-300 text-xs bg-rose-950 p-2 rounded border border-rose-500">
              Effect registered, will run after commit
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [8],
      explanation: 'Component returns JSX → render complete',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setProgress(p => p + 1)' },
        ],
        localVariables: [],
        decisions: ['Effect'],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (render complete, committing...)
          </div>
        ),
      },
    },
    {
      phase: 'commit',
      highlightedLines: [],
      explanation: 'Commit phase → UI updates to DOM with progress = 0',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setProgress(p => p + 1)' },
        ],
        localVariables: [],
        decisions: ['Effect'],
        output: (
          <div className="p-4 border-2 border-green-500 rounded-lg bg-slate-800">
            <div className="text-sm text-green-400 mb-3">✓ Committed to DOM</div>
            <progress
              value={0}
              max={100}
              className="w-full h-6"
            />
            <div className="text-xs text-slate-400 mt-2">progress = 0</div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: 'Effect phase → NOW the effect body runs (after commit)',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '🔄 Effect Running', value: 'setProgress(p => p + 1)' },
        ],
        output: (
          <div className="p-4 border-2 border-rose-400 rounded-lg bg-slate-800">
            <div className="text-sm text-rose-400 mb-3">⚡ Effect Executing</div>
            <progress
              value={0}
              max={100}
              className="w-full h-6"
            />
            <div className="text-xs text-slate-400 mt-2">progress = 0</div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: 'Effect calls setProgress(p => p + 1) → update queued',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 0, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: 'p => p + 1', type: 'updater' },
        ],
        effectQueue: [],
        localVariables: [],
        decisions: ['Check'],
        output: (
          <div className="p-4 border-2 border-yellow-500 rounded-lg bg-slate-800">
            <div className="text-sm text-yellow-400 mb-3">⚡ Update Queued</div>
            <progress
              value={0}
              max={100}
              className="w-full h-6"
            />
            <div className="text-xs text-slate-400 mt-2">progress = 0</div>
          </div>
        ),
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'Check phase → update queue not empty → re-render needed',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        output: (
          <div className="p-4 border-2 border-purple-500 rounded-lg bg-slate-800">
            <div className="text-sm text-purple-400 mb-3">Check: 0 → 1</div>
            <progress
              value={0}
              max={100}
              className="w-full h-6"
            />
            <div className="text-xs text-slate-400 mt-2">Re-render scheduled</div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Re-render with progress = 1',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'RunawayProgress() [2nd]' },
          { name: 'progress', value: 1 },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (rendering...)
          </div>
        ),
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [4, 5, 6],
      explanation: '⚠️ Effect queued AGAIN (no dependencies = runs every render)',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e2', label: 'setProgress(p => p + 1)' },
        ],
        localVariables: [
          { name: '📦 Function Call', value: 'RunawayProgress() [2nd]' },
          { name: 'progress', value: 1 },
        ],
        decisions: ['Effect'],
        output: (
          <div className="space-y-2">
            <div className="text-sm text-rose-400">Effect Queue:</div>
            <div className="text-slate-300 text-xs bg-rose-950 p-2 rounded border border-rose-500">
              Effect queued again!
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'commit',
      highlightedLines: [],
      explanation: 'Commit with progress = 1',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e2', label: 'setProgress(p => p + 1)' },
        ],
        localVariables: [],
        decisions: ['Effect'],
        output: (
          <div className="p-4 border-2 border-green-500 rounded-lg bg-slate-800">
            <div className="text-sm text-green-400 mb-3">✓ Committed to DOM</div>
            <progress
              value={1}
              max={100}
              className="w-full h-6"
            />
            <div className="text-xs text-slate-400 mt-2">progress = 1</div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: '💥 Effect runs → setProgress → Check → Render → Effect → ...',
      runtime: {
        stateSlots: [
          { label: 'progress', value: 1, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u2', label: 'p => p + 1', type: 'updater' },
        ],
        effectQueue: [],
        localVariables: [],
        decisions: ['Check'],
        output: (
          <div className="p-4 border-2 border-red-500 rounded-lg bg-slate-800 space-y-3">
            <div className="text-red-400 font-bold text-lg">♾️ INFINITE LOOP</div>
            <div className="text-sm text-slate-300 bg-red-950 p-3 rounded border border-red-500">
              <div className="font-semibold mb-2">The Loop:</div>
              <div className="font-mono text-xs space-y-1">
                <div>1. Render → registers effect</div>
                <div>2. Commit → DOM updates</div>
                <div>3. Effect → calls setProgress</div>
                <div>4. Check → processes update</div>
                <div>5. Render → cycle repeats ↻</div>
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'CONTRAST: Fixed version with dependencies and guard',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        output: (
          <div className="space-y-4 p-4 text-sm">
            <div className="text-red-400 font-bold text-lg mb-2">
              ⚠️ Why This Loops
            </div>

            <div className="bg-red-950 border border-red-500 p-3 rounded space-y-2">
              <div className="text-red-400 font-semibold">Problem:</div>
              <div className="text-slate-300 text-xs space-y-1">
                <div>• Effect has no dependency array</div>
                <div>• Runs after EVERY render</div>
                <div>• Each run queues a state update</div>
                <div>• Update triggers re-render</div>
                <div>• Effect runs again → infinite</div>
              </div>
            </div>

            <div className="text-green-400 font-bold text-base mt-4">
              ✓ Fixed Version
            </div>

            <pre className="bg-slate-900 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-300">{`function SafeProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return; // Guard
    const id = setTimeout(() => {
      setProgress(p => p + 1);
    }, 50);
    return () => clearTimeout(id); // Cleanup
  }, [progress]); // ✓ Dependencies

  return <progress value={progress} max={100} />;
}`}</code>
            </pre>

            <div className="bg-green-950 border border-green-500 p-3 rounded space-y-2">
              <div className="text-green-400 font-semibold">Why This Works:</div>
              <div className="text-slate-300 text-xs space-y-1">
                <div>• <span className="text-cyan-400">[progress]</span> dependency → effect re-runs only when progress changes</div>
                <div>• <span className="text-yellow-400">if (progress &gt;= 100) return</span> → guard stops at 100</div>
                <div>• <span className="text-rose-400">setTimeout</span> → controlled async update</div>
                <div>• <span className="text-purple-400">cleanup</span> → prevents overlapping timers</div>
              </div>
            </div>

            <div className="bg-cyan-950 border border-cyan-500 p-3 rounded text-xs">
              <div className="text-cyan-400 font-semibold mb-2">React-tRace Insight:</div>
              <div className="text-slate-300 space-y-1">
                <div>Effects are committed AFTER render completes.</div>
                <div>This delayed execution creates the loop opportunity.</div>
                <div>Dependencies control when effects re-run.</div>
              </div>
            </div>
          </div>
        ),
      },
    },
  ],
};
