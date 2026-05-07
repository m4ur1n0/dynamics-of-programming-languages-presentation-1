import { DemoConfig } from './types';

export const fixedLoopDemo: DemoConfig = {
  title: 'Fixed: Proper Dependencies',
  subtitle: 'Empty dependency array [] → effect runs only once',
  codeLines: [
    'function FixedCounter() {',
    '  const [count, setCount] = useState(0);',
    '',
    '  useEffect(() => {',
    '    setCount(c => c + 1);',
    '  }, []); // ✓ Empty deps = run once',
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
      explanation: 'useEffect with [] deps → effect scheduled to run once after mount',
      runtime: {
        localVariables: [{ name: 'count', value: 0 }],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setCount(c => c + 1)' }
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
        localVariables: [],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'setCount(c => c + 1)' }
        ],
        decisions: ['Effect'],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'effect',
      highlightedLines: [5],
      explanation: 'Effect runs: setCount(c => c + 1) queues updater function',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        updateQueue: [
          { id: 'u1', label: 'c => c + 1', type: 'updater' }
        ],
        effectQueue: [],
        decisions: ['Check'],
        output: <div className="text-xl font-mono text-green-400">Count: 0</div>,
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'Runtime processes update: 0 → 1',
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
      explanation: 'Re-render with count = 1',
      runtime: {
        localVariables: [{ name: 'count', value: 1 }],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-xl font-mono text-slate-300">Count: 1</div>,
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [4, 5, 6],
      explanation: '✓ Effect dependencies [] haven\'t changed → effect NOT re-run',
      runtime: {
        localVariables: [{ name: 'count', value: 1 }],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-xl font-mono text-slate-300">Count: 1</div>,
      },
    },
    {
      phase: 'commit',
      highlightedLines: [8],
      explanation: 'React commits UI with count = 1',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-xl font-mono text-green-400">Count: 1</div>,
      },
    },
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: '✓ No more updates → stable at count = 1. Effect ran exactly once!',
      runtime: {
        localVariables: [],
        stateSlots: [{ label: 'count', value: 1, hookIndex: 0 }],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: (
          <div className="space-y-3">
            <div className="text-xl font-mono text-green-400 font-bold">
              Count: 1
            </div>
            <div className="text-sm text-cyan-400 border-t border-slate-600 pt-3">
              ✓ Effect ran once at mount
            </div>
            <div className="text-sm text-slate-400">
              Dependencies [] prevent re-execution
            </div>
          </div>
        ),
      },
    },
  ],
};
