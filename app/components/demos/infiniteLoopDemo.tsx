import { DemoConfig } from './types';

export const infiniteLoopDemo: DemoConfig = {
  title: 'Infinite Loop Bug',
  subtitle: 'Effect sets state without dependencies → endless render cycle',
  codeLines: [
    'function BuggyCounter() {',
    '  const [count, setCount] = useState(0);',
    '',
    '  useEffect(() => {',
    '    setCount(count + 1);',
    '  }); // ⚠️ No dependency array!',
    '',
    '  return <div>Count: {count}</div>;',
    '}',
  ],
  steps: [
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Initial render: Counter starts at 0',
      runtime: {
        localVariables: [{ name: 'count', value: 0 }],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-xl font-mono text-slate-300">Count: 0</div>,
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [4, 5, 6],
      explanation: 'useEffect schedules effect to run after render (no deps = runs every render)',
      runtime: {
        localVariables: [{ name: 'count', value: 0 }],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setCount(count + 1)' }
        ],
        decisions: ['Effect'],
        output: <div className="text-xl font-mono text-slate-300">Count: 0</div>,
      },
    },
    {
      phase: 'commit',
      highlightedLines: [8],
      explanation: 'React commits the UI to DOM with count = 0',
      runtime: {
        localVariables: [{ name: 'count', value: 0 }],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setCount(count + 1)' }
        ],
        decisions: ['Effect'],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: 'Effect runs: setCount(0 + 1) queues an update',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [
          { id: 'u1', label: 'count → 1', type: 'value' }
        ],
        effectQueue: [],
        decisions: ['Check'],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'React checks queue → state changed → re-render needed',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Re-render: count = 1',
      runtime: {
        localVariables: [{ name: 'count', value: 1 }],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [4, 5, 6],
      explanation: '⚠️ Effect scheduled again! (no dependency array = runs every render)',
      runtime: {
        localVariables: [{ name: 'count', value: 1 }],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [
          { id: 'e2', label: 'setCount(count + 1)' }
        ],
        decisions: ['Effect'],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'commit',
      highlightedLines: [8],
      explanation: 'React commits UI with count = 1',
      runtime: {
        localVariables: [{ name: 'count', value: 1 }],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [
          { id: 'e2', label: 'setCount(count + 1)' }
        ],
        decisions: ['Effect'],
        output: <div className="text-xl font-mono text-yellow-400">Count: 1</div>,
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: '⚠️ Effect runs again: setCount(1 + 1) → infinite loop!',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [
          { id: 'u2', label: 'count → 2', type: 'value' }
        ],
        effectQueue: [],
        decisions: ['Check'],
        output: <div className="text-xl font-mono text-yellow-400">Count: 1</div>,
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: '💥 Pattern: render → effect → state update → check → render → ...',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 2, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: (
          <div className="space-y-2">
            <div className="text-xl font-mono text-red-400 font-bold">
              ♾️ INFINITE LOOP
            </div>
            <div className="text-sm text-slate-400">
              This will continue forever!
            </div>
          </div>
        ),
      },
    },
  ],
};
