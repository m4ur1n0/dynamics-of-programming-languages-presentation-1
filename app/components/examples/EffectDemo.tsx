'use client';

import CodeDemo from '../CodeDemo';

interface EffectState {
  count: number;
  title: string;
  phase: 'mount' | 'update' | 'cleanup';
}

const code = `function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;

    return () => {
      console.log('Cleanup!');
    };
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`;

const steps = [
  {
    lines: '2',
    state: { count: 0, title: 'Default Title', phase: 'mount' as const },
    description: 'Component mounts with initial count = 0',
  },
  {
    lines: '4-9',
    state: { count: 0, title: 'Default Title', phase: 'mount' as const },
    description: 'useEffect registered with dependency [count]',
  },
  {
    lines: '5',
    state: { count: 0, title: 'Count: 0', phase: 'mount' as const },
    description: 'Effect runs: document.title updated to "Count: 0"',
  },
  {
    lines: '13',
    state: { count: 1, title: 'Count: 0', phase: 'update' as const },
    description: 'User clicks button, setCount called with new value',
  },
  {
    lines: '7-8',
    state: { count: 1, title: 'Count: 0', phase: 'cleanup' as const },
    description: 'Cleanup function runs before next effect',
  },
  {
    lines: '5',
    state: { count: 1, title: 'Count: 1', phase: 'update' as const },
    description: 'Effect runs again with new count value',
  },
];

export default function EffectDemo() {
  return (
    <CodeDemo
      code={code}
      language="tsx"
      steps={steps}
      initialState={{ count: 0, title: 'Default Title', phase: 'mount' as const }}
      renderDemo={(state) => (
        <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>
          <div style={{
            padding: '1.5rem',
            background: '#2a2a2a',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
              document.title
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#61dafb' }}>
              {state.title}
            </div>
          </div>

          <div style={{
            padding: '1rem 2rem',
            background: state.phase === 'cleanup' ? '#ff6b6b' : '#4caf50',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Clicked {state.count} times
          </div>

          <div style={{
            fontSize: '0.9rem',
            color: '#888',
            padding: '1rem',
            background: '#1a1a1a',
            borderRadius: '4px'
          }}>
            Phase: <span style={{ color: '#ffd700' }}>{state.phase}</span>
          </div>
        </div>
      )}
    />
  );
}
