import { DemoConfig } from './types';

export const placeholderDemo: DemoConfig = {
  title: 'useState Counter Demo',
  subtitle: 'Visualizing state persistence across renders',
  codeLines: [
    'function Counter() {',
    '  const [count, setCount] = useState(0);',
    '',
    '  const increment = () => {',
    '    setCount(count + 1);',
    '  };',
    '',
    '  return <button onClick={increment}>{count}</button>;',
    '}',
  ],
  steps: [
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Initial render: React calls Counter() and initializes state',
      runtime: {
        localVariables: [],
        stateSlots: [
          { label: 'count', value: 0, hookIndex: 0 }
        ],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-2xl font-mono text-cyan-400">Button: 0</div>,
      },
    },
    {
      phase: 'useState',
      highlightedLines: [2],
      explanation: 'useState reads from state slot #0, returns [0, setCount]',
      runtime: {
        localVariables: [
          { name: 'count', value: 0 },
        ],
        stateSlots: [
          { label: 'count', value: 0, hookIndex: 0 }
        ],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-2xl font-mono text-cyan-400">Button: 0</div>,
      },
    },
    {
      phase: 'event',
      highlightedLines: [4, 5],
      explanation: 'User clicks button → increment() is called',
      runtime: {
        localVariables: [
          { name: 'count', value: 0 },
        ],
        stateSlots: [
          { label: 'count', value: 0, hookIndex: 0 }
        ],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-2xl font-mono text-cyan-400">Button: 0</div>,
      },
    },
    {
      phase: 'event',
      highlightedLines: [5],
      explanation: 'setCount(1) queues an update to state slot #0',
      runtime: {
        localVariables: [
          { name: 'count', value: 0 },
        ],
        stateSlots: [
          { label: 'count', value: 0, hookIndex: 0 }
        ],
        updateQueue: [
          { id: '1', label: 'count → 1', type: 'value' }
        ],
        effectQueue: [],
        decisions: ['Check'],
        output: <div className="text-2xl font-mono text-cyan-400">Button: 0</div>,
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'React processes update queue → state changed, re-render needed',
      runtime: {
        localVariables: [],
        stateSlots: [
          { label: 'count', value: 1, hookIndex: 0 }
        ],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-2xl font-mono text-cyan-400">Button: 0</div>,
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Re-render: React calls Counter() again with new state',
      runtime: {
        localVariables: [
          { name: 'count', value: 1 },
        ],
        stateSlots: [
          { label: 'count', value: 1, hookIndex: 0 }
        ],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-2xl font-mono text-cyan-400">Button: 0</div>,
      },
    },
    {
      phase: 'commit',
      highlightedLines: [8],
      explanation: 'React commits the new UI to the DOM',
      runtime: {
        localVariables: [
          { name: 'count', value: 1 },
        ],
        stateSlots: [
          { label: 'count', value: 1, hookIndex: 0 }
        ],
        updateQueue: [],
        effectQueue: [],
        decisions: [],
        output: <div className="text-2xl font-mono text-green-400">Button: 1</div>,
      },
    },
  ],
};
