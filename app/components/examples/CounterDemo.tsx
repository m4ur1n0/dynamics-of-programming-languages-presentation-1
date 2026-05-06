'use client';

import CodeDemo from '../CodeDemo';

interface CounterState {
  count: number;
  message: string;
}

const code = `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}`;

const steps = [
  {
    lines: '1-2',
    state: { count: 0, message: 'Initialize state with useState' },
    description: 'Component starts with count initialized to 0',
  },
  {
    lines: '4-6',
    state: { count: 0, message: 'Define increment function' },
    description: 'Create a function that updates the count',
  },
  {
    lines: '5',
    state: { count: 1, message: 'Call setCount to update state' },
    description: 'setCount triggers re-render with new count value',
  },
  {
    lines: '10',
    state: { count: 1, message: 'Component re-renders with new count' },
    description: 'The UI updates to show count: 1',
  },
];

export default function CounterDemo() {
  return (
    <CodeDemo
      code={code}
      language="tsx"
      steps={steps}
      initialState={{ count: 0, message: 'Initial render' }}
      renderDemo={(state) => (
        <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#61dafb'
          }}>
            {state.count}
          </div>
          <div style={{ fontSize: '1.2rem', color: '#888', marginTop: '2rem' }}>
            {state.message}
          </div>
        </div>
      )}
    />
  );
}
