import { DemoConfig } from './types';

export const flickerDerivedStateDemo: DemoConfig = {
  title: 'Flicker: Effect for Derived State',
  subtitle: 'Effects run AFTER render → extra render cycle',
  codeLines: [
    'function NameFlicker({ user }) {',
    '  const [displayName, setDisplayName] = useState("");',
    '',
    '  useEffect(() => {',
    '    setDisplayName(`${user.firstName} ${user.lastName}`);',
    '  }, [user]);',
    '',
    '  return <h1>{displayName || "Loading..."}</h1>;',
    '}',
  ],
  steps: [
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'Component receives prop: user = { firstName: "Ada", lastName: "Lovelace" }',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: 'user.firstName', value: 'Ada' },
          { name: 'user.lastName', value: 'Lovelace' },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (component not rendered yet)
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Render #1 begins → useState initializes displayName to ""',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: '', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: 'user.firstName', value: 'Ada' },
          { name: 'user.lastName', value: 'Lovelace' },
          { name: 'displayName', value: '' },
          { name: 'Render Count', value: 1 },
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
      explanation: 'useEffect queues computation (not run yet!)',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: '', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setDisplayName("Ada Lovelace")' },
        ],
        localVariables: [
          { name: 'user.firstName', value: 'Ada' },
          { name: 'user.lastName', value: 'Lovelace' },
          { name: 'displayName', value: '' },
          { name: 'Render Count', value: 1 },
        ],
        decisions: ['Effect'],
        output: (
          <div className="space-y-2">
            <div className="text-sm text-rose-400">Effect Queue:</div>
            <div className="text-slate-300 text-xs bg-rose-950 p-2 rounded border border-rose-500">
              Name computation queued, will run after commit
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [8],
      explanation: 'displayName is "" → condition returns "Loading..."',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: '', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setDisplayName("Ada Lovelace")' },
        ],
        localVariables: [
          { name: 'displayName', value: '' },
          { name: 'Render Count', value: 1 },
        ],
        decisions: ['Effect'],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (render complete)
          </div>
        ),
      },
    },
    {
      phase: 'commit',
      highlightedLines: [],
      explanation: '⚠️ UI commits with "Loading..." (first render)',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: '', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setDisplayName("Ada Lovelace")' },
        ],
        localVariables: [
          { name: 'Render Count', value: 1 },
        ],
        decisions: ['Effect'],
        output: (
          <div className="p-6 border-2 border-yellow-500 rounded-lg bg-slate-800">
            <div className="text-xs text-yellow-400 mb-3">⚠️ First Render - Empty State</div>
            <h1 className="text-3xl font-bold text-slate-400 italic">Loading...</h1>
            <div className="text-xs text-slate-500 mt-3">displayName = ""</div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: 'Effect runs AFTER commit → computes displayName from props',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: '', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '🔄 Effect Running', value: 'Computing name...' },
          { name: 'user.firstName', value: 'Ada' },
          { name: 'user.lastName', value: 'Lovelace' },
        ],
        output: (
          <div className="p-6 border-2 border-rose-400 rounded-lg bg-slate-800">
            <div className="text-xs text-rose-400 mb-3">⚡ Effect Executing</div>
            <h1 className="text-3xl font-bold text-slate-400 italic">Loading...</h1>
            <div className="text-xs text-slate-500 mt-3">Computing: "Ada" + " " + "Lovelace"</div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: 'Effect calls setDisplayName → queues update',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: '', hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: '"Ada Lovelace"', type: 'value' },
        ],
        effectQueue: [],
        localVariables: [],
        decisions: ['Check'],
        output: (
          <div className="p-6 border-2 border-yellow-500 rounded-lg bg-slate-800">
            <div className="text-xs text-yellow-400 mb-3">⚡ Update Queued</div>
            <h1 className="text-3xl font-bold text-slate-400 italic">Loading...</h1>
            <div className="text-xs text-slate-500 mt-3">New value queued: "Ada Lovelace"</div>
          </div>
        ),
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'Check phase → state changed → re-render needed',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: 'Ada Lovelace', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        output: (
          <div className="p-6 border-2 border-purple-500 rounded-lg bg-slate-800">
            <div className="text-xs text-purple-400 mb-3">Check: "" → "Ada Lovelace"</div>
            <h1 className="text-3xl font-bold text-slate-400 italic">Loading...</h1>
            <div className="text-xs text-slate-500 mt-3">Re-render scheduled</div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Render #2 begins → reads displayName = "Ada Lovelace"',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: 'Ada Lovelace', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: 'user.firstName', value: 'Ada' },
          { name: 'user.lastName', value: 'Lovelace' },
          { name: 'displayName', value: 'Ada Lovelace' },
          { name: 'Render Count', value: 2 },
        ],
        output: (
          <div className="p-6 border-2 border-yellow-500 rounded-lg bg-slate-800">
            <div className="text-xs text-yellow-400 mb-3">Second Render Starting</div>
            <h1 className="text-3xl font-bold text-slate-400 italic">Loading...</h1>
          </div>
        ),
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [4, 5, 6],
      explanation: 'useEffect dependencies [user] unchanged → effect NOT queued',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: 'Ada Lovelace', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: 'displayName', value: 'Ada Lovelace' },
          { name: 'Render Count', value: 2 },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (rendering...)
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [8],
      explanation: 'displayName is "Ada Lovelace" → renders actual name',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: 'Ada Lovelace', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: 'displayName', value: 'Ada Lovelace' },
          { name: 'Render Count', value: 2 },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (render complete)
          </div>
        ),
      },
    },
    {
      phase: 'commit',
      highlightedLines: [],
      explanation: '✓ UI commits with actual name (second render)',
      runtime: {
        stateSlots: [
          { label: 'displayName', value: 'Ada Lovelace', hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: 'Render Count', value: 2 },
        ],
        output: (
          <div className="p-6 border-2 border-green-500 rounded-lg bg-slate-800">
            <div className="text-xs text-green-400 mb-3">✓ Second Render - Actual Name</div>
            <h1 className="text-3xl font-bold text-white">Ada Lovelace</h1>
            <div className="text-xs text-slate-500 mt-3">displayName = "Ada Lovelace"</div>
            <div className="text-xs text-red-400 mt-2 font-bold">
              ⚠️ Total: 2 renders for derived data!
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'CONTRAST: Good version computes during render',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        output: (
          <div className="space-y-4 p-4 text-sm">
            <div className="text-red-400 font-bold text-lg mb-2">
              ⚠️ The Flicker Problem
            </div>

            <div className="bg-red-950 border border-red-500 p-3 rounded space-y-2">
              <div className="text-red-400 font-semibold">Bad Pattern (2 renders):</div>
              <div className="text-slate-300 text-xs space-y-1">
                <div>1. Render with displayName = "" → "Loading..."</div>
                <div>2. Commit "Loading..." to DOM</div>
                <div>3. Effect runs → setDisplayName</div>
                <div>4. Check triggers re-render</div>
                <div>5. Render with displayName = "Ada Lovelace"</div>
                <div>6. Commit actual name to DOM</div>
              </div>
              <div className="text-red-300 text-xs mt-2 font-semibold">
                User sees flicker: Loading... → Ada Lovelace
              </div>
            </div>

            <div className="text-green-400 font-bold text-base mt-4">
              ✓ Fixed Version
            </div>

            <pre className="bg-slate-900 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-300">{`function DerivedName({ user }) {
  // Compute during render, not in effect
  const displayName = \`\${user.firstName} \${user.lastName}\`;

  return <h1>{displayName}</h1>;
}`}</code>
            </pre>

            <div className="bg-green-950 border border-green-500 p-3 rounded space-y-2">
              <div className="text-green-400 font-semibold">Good Pattern (1 render):</div>
              <div className="text-slate-300 text-xs space-y-1">
                <div>1. Render computes displayName from props</div>
                <div>2. Returns actual name immediately</div>
                <div>3. Commit "Ada Lovelace" to DOM</div>
                <div className="text-green-400 font-semibold mt-2">✓ One render, no flicker!</div>
              </div>
            </div>

            <div className="bg-cyan-950 border border-cyan-500 p-3 rounded text-xs space-y-2">
              <div className="text-cyan-400 font-semibold">React-tRace Insight:</div>
              <div className="text-slate-300 space-y-1">
                <div>
                  <span className="text-rose-400">Effects run AFTER render commits.</span>
                </div>
                <div>
                  This temporal separation causes the extra render cycle.
                </div>
                <div className="mt-2 pt-2 border-t border-cyan-700">
                  <span className="text-yellow-400 font-semibold">Rule:</span> If a value can be computed from current props/state, derive it during render instead of storing it in effect-driven state.
                </div>
              </div>
            </div>

            <div className="bg-purple-950 border border-purple-500 p-3 rounded text-xs">
              <div className="text-purple-400 font-semibold mb-2">When to use Effects:</div>
              <div className="text-slate-300 space-y-1">
                <div>✓ Synchronizing with external systems (APIs, DOM, timers)</div>
                <div>✓ Side effects that don't contribute to render output</div>
                <div>✗ Computing values from props/state (use render instead)</div>
              </div>
            </div>
          </div>
        ),
      },
    },
  ],
};
