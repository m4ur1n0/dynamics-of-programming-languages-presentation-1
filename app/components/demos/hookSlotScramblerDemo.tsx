import { DemoConfig } from './types';

export const hookSlotScramblerDemo: DemoConfig = {
  title: 'Hook Order Matters',
  subtitle: 'React maps Hook calls to state slots by position',
  codeLines: [
    'function BadHooks() {',
    '  const [show, setShow] = useState(false);',
    '',
    '  if (show) {',
    '    const [secret, setSecret] = useState("secret");',
    '  }',
    '',
    '  const [name, setName] = useState("Theo");',
    '',
    '  return (',
    '    <div>',
    '      <button onClick={() => setShow(s => !s)}>Toggle</button>',
    '      <p>{name}</p>',
    '    </div>',
    '  );',
    '}',
  ],
  steps: [
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'React runtime ready. Hook slots are empty.',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (no output yet)
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1],
      explanation: 'First render begins → Runtime starts Hook position tracking',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks()' },
          { name: 'Hook Position', value: 0 },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (rendering...)
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [2],
      explanation: 'Hook call #1: useState(false) → Runtime assigns to slot 0',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks()' },
          { name: 'show', value: false },
          { name: 'Hook Position', value: 1 },
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
      highlightedLines: [4],
      explanation: 'Conditional check: show is false → skip the conditional block',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks()' },
          { name: 'show', value: false },
          { name: 'Hook Position', value: 1 },
        ],
        output: (
          <div className="space-y-2">
            <div className="text-sm text-slate-400">Conditional Block:</div>
            <div className="text-slate-600 italic">⊘ Skipped (show = false)</div>
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [8],
      explanation: 'Hook call #2: useState("Theo") → Runtime assigns to slot 1',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: false, hookIndex: 0 },
          { label: 'slot #1', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks()' },
          { name: 'show', value: false },
          { name: 'name', value: 'Theo' },
          { name: 'Hook Position', value: 2 },
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
      highlightedLines: [10, 11, 12, 13, 14, 15],
      explanation: 'First render complete → Hook mapping established: [slot 0 → show, slot 1 → name]',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: false, hookIndex: 0 },
          { label: 'slot #1 → name', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800">
            <button className="px-4 py-2 bg-blue-600 text-white rounded mb-3">
              Toggle
            </button>
            <p className="text-lg">Theo</p>
          </div>
        ),
      },
    },
    {
      phase: 'event',
      highlightedLines: [12],
      explanation: 'User clicks Toggle → setShow(s => !s) queues update',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: false, hookIndex: 0 },
          { label: 'slot #1 → name', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [
          { id: 'u1', label: 'show: false → true', type: 'updater' },
        ],
        localVariables: [
          { name: '🎯 Event Handler', value: 'onClick' },
        ],
        decisions: ['Check'],
        output: (
          <div className="p-4 border-2 border-yellow-400 rounded-lg bg-slate-800">
            <div className="text-sm text-yellow-400 mb-2">User clicked!</div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded mb-3">
              Toggle
            </button>
            <p className="text-lg">Theo</p>
          </div>
        ),
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'Check phase: update queued → re-render needed',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: true, hookIndex: 0 },
          { label: 'slot #1 → name', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [],
        decisions: [],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800">
            <button className="px-4 py-2 bg-blue-600 text-white rounded mb-3">
              Toggle
            </button>
            <p className="text-lg">Theo</p>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Second render begins → Runtime resets Hook position to 0',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: true, hookIndex: 0 },
          { label: 'slot #1 → name', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks() [2nd call]' },
          { name: 'Hook Position', value: 0 },
        ],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800">
            <button className="px-4 py-2 bg-blue-600 text-white rounded mb-3">
              Toggle
            </button>
            <p className="text-lg">Theo</p>
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [2],
      explanation: 'Hook call #1: useState(false) → reads from slot 0 → returns true',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: true, hookIndex: 0 },
          { label: 'slot #1 → name', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks() [2nd call]' },
          { name: 'show', value: true },
          { name: 'Hook Position', value: 1 },
        ],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800">
            <button className="px-4 py-2 bg-blue-600 text-white rounded mb-3">
              Toggle
            </button>
            <p className="text-lg">Theo</p>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [4, 5],
      explanation: '⚠️ Conditional check: show is TRUE → entering conditional block!',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: true, hookIndex: 0 },
          { label: 'slot #1 → name', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks() [2nd call]' },
          { name: 'show', value: true },
          { name: 'Hook Position', value: 1 },
        ],
        output: (
          <div className="space-y-2">
            <div className="text-sm text-yellow-400">Conditional Block:</div>
            <div className="text-yellow-400">✓ Entered (show = true)</div>
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [5],
      explanation: '💥 Hook call #2: useState("secret") → tries to read slot 1 → finds "Theo"!',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: true, hookIndex: 0 },
          { label: 'slot #1 → ???', value: 'Theo', hookIndex: 1 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks() [2nd call]' },
          { name: 'show', value: true },
          { name: 'secret', value: 'Theo' },
          { name: 'Hook Position', value: 2 },
        ],
        output: (
          <div className="p-4 border-2 border-red-500 rounded-lg bg-slate-800">
            <div className="text-red-400 text-sm mb-2">⚠️ Hook Slot Mismatch!</div>
            <div className="text-xs text-slate-400">
              Expected: "secret" initial value
              <br />
              Got: "Theo" from previous render's name Hook
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [8],
      explanation: '💥 Hook call #3: useState("Theo") → would read slot 2 → slot does not exist!',
      runtime: {
        stateSlots: [
          { label: 'slot #0 → show', value: true, hookIndex: 0 },
          { label: 'slot #1 → secret?', value: 'Theo', hookIndex: 1 },
          { label: 'slot #2 → name?', value: '?', hookIndex: 2 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'BadHooks() [2nd call]' },
          { name: 'show', value: true },
          { name: 'secret', value: 'Theo' },
          { name: 'name', value: '?' },
          { name: 'Hook Position', value: 3 },
        ],
        output: (
          <div className="p-4 border-2 border-red-500 rounded-lg bg-slate-800">
            <div className="text-red-400 font-bold mb-2">💥 ERROR</div>
            <div className="text-sm text-red-300 mb-3">
              Hook order violation detected
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>First render: 2 Hooks (slots 0, 1)</div>
              <div>Second render: 3 Hooks (slots 0, 1, 2)</div>
              <div className="text-red-400 font-bold mt-2">Hook count changed!</div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'React-tRace semantic insight: Hook-to-slot mapping must be stable across renders',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="space-y-4 p-4">
            <div className="text-red-400 font-bold text-lg mb-3">
              ⚠️ Why Hook Order Matters
            </div>

            <div className="bg-slate-700 p-3 rounded-lg space-y-2 text-sm">
              <div className="text-cyan-400 font-semibold">Semantic Rule:</div>
              <div className="text-slate-300">
                React maps Hook calls to state slots <span className="text-yellow-400">by position</span>, not by variable name.
              </div>
              <div className="text-slate-300">
                The same code line must map to the same slot every render.
              </div>
            </div>

            <div className="bg-red-950 border border-red-500 p-3 rounded-lg space-y-2 text-sm">
              <div className="text-red-400 font-semibold">What Went Wrong:</div>
              <div className="text-slate-300 font-mono text-xs space-y-1">
                <div>Render 1: show→slot0, name→slot1</div>
                <div>Render 2: show→slot0, secret→slot1, name→slot2</div>
              </div>
              <div className="text-slate-400 text-xs">
                Conditional Hook changed the mapping!
              </div>
            </div>

            <div className="bg-green-950 border border-green-500 p-3 rounded-lg space-y-2 text-sm">
              <div className="text-green-400 font-semibold">✓ Fixed Pattern:</div>
              <div className="text-slate-300 text-xs space-y-1">
                <div>• Call all Hooks <span className="text-green-400">unconditionally</span></div>
                <div>• Use conditional <span className="text-cyan-400">rendering</span>, not conditional <span className="text-red-400">Hooks</span></div>
              </div>
              <pre className="bg-slate-900 p-2 rounded text-xs mt-2">
                <code className="text-green-300">{`const [show, setShow] = useState(false);
const [secret, setSecret] = useState("...");
const [name, setName] = useState("Theo");

return show ? <SecretView /> : <PublicView />;`}</code>
              </pre>
            </div>
          </div>
        ),
      },
    },
  ],
};
