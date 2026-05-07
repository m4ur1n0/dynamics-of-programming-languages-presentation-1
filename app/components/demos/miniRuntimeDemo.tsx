import { DemoConfig } from './types';

export const miniRuntimeDemo: DemoConfig = {
  title: 'React Runtime Semantics',
  subtitle: 'Components are functions; state lives in the runtime',
  codeLines: [
    ' function Counter() {',
    '   const [count, setCount] = useState(0);',
    ' ',
    '   return (',
    '     <button onClick={() => setCount(c => c + 1)}>',
    '       {count}',
    '     </button>',
    '   );',
    ' }',
  ],
  steps: [
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'React runtime ready. State store is empty. No component executing yet.',
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
      explanation: 'Runtime calls Counter() → function execution begins',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'Counter()' },
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
      explanation: 'useState(0) reached → runtime checks Hook slot #0',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: '?', hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'Counter()' },
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
      explanation: 'Slot #0 is empty → initialize with 0. Returns [0, setCount].',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'Counter()' },
          { name: 'count', value: 0 },
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
      highlightedLines: [4, 5, 6, 7, 8],
      explanation: 'Component returns JSX view. Function execution completes.',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-2">Rendered Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'event',
      highlightedLines: [5],
      explanation: 'User clicks button → onClick handler executes',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '🎯 Event Handler', value: 'onClick' },
        ],
        output: (
          <div className="p-4 border-2 border-yellow-400 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-yellow-400 mb-2">User clicked!</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'event',
      highlightedLines: [5],
      explanation: 'setCount(c => c + 1) queues updater function to slot #0',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: 'c => c + 1', type: 'updater' },
        ],
        localVariables: [],
        decisions: ['Check'],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-2">Rendered Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'Runtime enters Check mode: update queue is not empty → must re-render',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: 'c => c + 1', type: 'updater' },
        ],
        localVariables: [],
        decisions: ['Check'],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-2">Rendered Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1],
      explanation: 'Runtime calls Counter() AGAIN → new function execution',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: 'c => c + 1', type: 'updater' },
        ],
        localVariables: [
          { name: '📦 Function Call', value: 'Counter() [2nd call]' },
        ],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-2">Rendered Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [2],
      explanation: 'useState(0) reached again → runtime checks slot #0 (NOT re-initialized!)',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 0, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: 'c => c + 1', type: 'updater' },
        ],
        localVariables: [
          { name: '📦 Function Call', value: 'Counter() [2nd call]' },
        ],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-2">Rendered Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'useState',
      highlightedLines: [2],
      explanation: 'Runtime processes update queue: applies c => c + 1 where c = 0 → result = 1',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [
          { name: '📦 Function Call', value: 'Counter() [2nd call]' },
          { name: 'count', value: 1 },
        ],
        output: (
          <div className="p-4 border-2 border-slate-600 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-2">Rendered Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              0
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [4, 5, 6, 7, 8],
      explanation: 'Component returns NEW JSX view with count = 1. Function execution completes.',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="p-4 border-2 border-green-500 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-green-400 mb-2">Updated Output:</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              1
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'commit',
      highlightedLines: [],
      explanation: 'Runtime commits changes to DOM. Counter is now stable at count = 1.',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="p-4 border-2 border-green-500 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-green-400 mb-2 font-bold">✓ Committed to DOM</div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              1
            </button>
          </div>
        ),
      },
    },
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'Runtime returns to event loop. State persists in slot #0. Ready for next interaction.',
      runtime: {
        stateSlots: [
          { label: 'slot #0', value: 1, hookIndex: 0 },
        ],
        updateQueue: [],
        localVariables: [],
        output: (
          <div className="p-4 border-2 border-cyan-500 rounded-lg bg-slate-800 text-center">
            <div className="text-sm text-cyan-400 mb-2 font-bold">
              🔄 Key insight: State persisted across renders!
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-mono text-xl">
              1
            </button>
            <div className="text-xs text-slate-500 mt-3">
              The Counter function was called twice, but useState(0) only initialized once.
            </div>
          </div>
        ),
      },
    },
  ],
};
