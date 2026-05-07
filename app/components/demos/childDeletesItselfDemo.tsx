import { DemoConfig } from './types';

export const childDeletesItselfDemo: DemoConfig = {
  title: 'Effects Across the Component Tree',
  subtitle: 'Child effect modifies parent state → tree restructuring',
  codeLines: [
    'function Child({ close }) {',
    '  useEffect(() => {',
    '    close();',
    '  }, [close]);',
    '  return <div>I appear briefly.</div>;',
    '}',
    '',
    'function Parent() {',
    '  const [show, setShow] = useState(true);',
    '  return (',
    '    <section>',
    '      <h2>Parent</h2>',
    '      {show && <Child close={() => setShow(false)} />}',
    '    </section>',
    '  );',
    '}',
  ],
  steps: [
    {
      phase: 'render',
      highlightedLines: [8, 9],
      explanation: 'Parent render begins → useState reads show = true',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '📦 Rendering', value: 'Parent' },
          { name: 'show', value: true },
        ],
        componentTree: [
          { name: 'Parent', active: true, hasState: true },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (rendering Parent...)
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [13],
      explanation: 'show is true → Parent includes Child in render tree',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '📦 Rendering', value: 'Parent' },
          { name: 'show', value: true },
        ],
        componentTree: [
          { name: 'Parent', active: true, hasState: true },
          { name: 'Child', active: false },
        ],
        output: (
          <div className="space-y-2 text-sm">
            <div className="text-cyan-400 font-semibold">Component Tree:</div>
            <div className="bg-slate-700 p-3 rounded border border-cyan-500 space-y-2">
              <div className="text-white font-mono">Parent</div>
              <div className="ml-4 text-slate-400 font-mono">└─ Child (will render)</div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [1, 2, 3, 4],
      explanation: 'Child render begins → useEffect queues effect',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'Child: close()' },
        ],
        localVariables: [
          { name: '📦 Rendering', value: 'Child' },
          { name: 'close', value: '() => setShow(false)' },
        ],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: true },
        ],
        decisions: ['Effect'],
        output: (
          <div className="space-y-2 text-sm">
            <div className="text-rose-400 font-semibold">Effect Queue:</div>
            <div className="bg-rose-950 p-3 rounded border border-rose-500">
              <div className="text-slate-300 text-xs">
                Child's effect registered: will call close() after commit
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [5],
      explanation: 'Child returns JSX → both components rendered',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'Child: close()' },
        ],
        localVariables: [],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: false },
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
      explanation: 'Commit to DOM → both Parent and Child visible',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [
          { id: 'e1', label: 'Child: close()' },
        ],
        localVariables: [],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: false },
        ],
        decisions: ['Effect'],
        output: (
          <div className="p-4 border-2 border-green-500 rounded-lg bg-slate-800">
            <div className="text-sm text-green-400 mb-3">✓ Committed to DOM</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Parent</h2>
              <div className="ml-4 p-2 border border-cyan-400 rounded bg-cyan-950">
                <div className="text-sm text-cyan-300">I appear briefly.</div>
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [3],
      explanation: 'Commit Effects phase → Child effect executes',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '🔄 Effect Running', value: 'Child' },
        ],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: true },
        ],
        output: (
          <div className="p-4 border-2 border-rose-400 rounded-lg bg-slate-800">
            <div className="text-sm text-rose-400 mb-3">⚡ Child Effect Executing</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Parent</h2>
              <div className="ml-4 p-2 border border-rose-400 rounded bg-rose-950">
                <div className="text-sm text-rose-300">I appear briefly.</div>
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [3],
      explanation: '⚠️ Child effect calls close() → targets Parent\'s state slot!',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '🔄 Effect Running', value: 'Child' },
          { name: 'Calling', value: 'close = () => setShow(false)' },
        ],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: true },
        ],
        output: (
          <div className="p-4 border-2 border-yellow-500 rounded-lg bg-slate-800">
            <div className="text-sm text-yellow-400 mb-3 font-bold">
              ⚡ Cross-component update!
            </div>
            <div className="space-y-3">
              <div className="text-xs text-slate-300 bg-yellow-950 p-2 rounded border border-yellow-500">
                Child effect → close() → setShow(false) → Parent.show slot
              </div>
              <div className="text-xs text-yellow-300">
                Effect closure captures Parent's setter function
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'effect',
      highlightedLines: [3],
      explanation: 'setShow(false) queues update to Parent\'s state slot',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: true, hookIndex: 0 },
        ],
        updateQueue: [
          { id: 'u1', label: 'Parent.show: false', type: 'value' },
        ],
        effectQueue: [],
        localVariables: [],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: true },
        ],
        decisions: ['Check'],
        output: (
          <div className="p-4 border-2 border-yellow-500 rounded-lg bg-slate-800">
            <div className="text-sm text-yellow-400 mb-3">⚡ Update Queued</div>
            <div className="space-y-2 text-xs">
              <div className="bg-purple-950 p-2 rounded border border-purple-500">
                <div className="text-purple-300">Update Queue:</div>
                <div className="text-white font-mono ml-2">Parent.show: true → false</div>
              </div>
              <div className="text-yellow-300">
                Parent will be marked for Check
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'check',
      highlightedLines: [],
      explanation: 'Check phase → Parent state changed → Parent must re-render',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
          { name: 'Child', active: false },
        ],
        output: (
          <div className="p-4 border-2 border-purple-500 rounded-lg bg-slate-800">
            <div className="text-sm text-purple-400 mb-3">Check: Parent.show true → false</div>
            <div className="text-xs text-slate-300 bg-purple-950 p-2 rounded border border-purple-500">
              Re-render scheduled for Parent component
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [8, 9],
      explanation: 'Parent re-renders → reads show = false',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '📦 Rendering', value: 'Parent [2nd]' },
          { name: 'show', value: false },
        ],
        componentTree: [
          { name: 'Parent', active: true, hasState: true },
          { name: 'Child', active: false },
        ],
        output: (
          <div className="text-slate-500 italic text-center py-8">
            (re-rendering Parent...)
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [13],
      explanation: 'show is false → {show && <Child />} returns null',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [
          { name: '📦 Rendering', value: 'Parent [2nd]' },
          { name: 'show', value: false },
        ],
        componentTree: [
          { name: 'Parent', active: true, hasState: true },
        ],
        output: (
          <div className="space-y-2 text-sm">
            <div className="text-red-400 font-semibold">Component Tree Updated:</div>
            <div className="bg-slate-700 p-3 rounded border border-red-500 space-y-2">
              <div className="text-white font-mono">Parent</div>
              <div className="ml-4 text-red-400 font-mono line-through opacity-50">
                └─ Child (removed)
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'render',
      highlightedLines: [10, 11, 12, 14, 15],
      explanation: 'Parent returns JSX without Child',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
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
      explanation: 'Commit → reconciliation removes Child from DOM',
      runtime: {
        stateSlots: [
          { label: 'Parent.show', value: false, hookIndex: 0 },
        ],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        componentTree: [
          { name: 'Parent', active: false, hasState: true },
        ],
        output: (
          <div className="p-4 border-2 border-green-500 rounded-lg bg-slate-800">
            <div className="text-sm text-green-400 mb-3">✓ Committed to DOM</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Parent</h2>
              <div className="text-xs text-slate-400 italic mt-2">
                (Child removed from tree)
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      phase: 'idle',
      highlightedLines: [],
      explanation: 'React-tRace insight: Effects operate across component boundaries',
      runtime: {
        stateSlots: [],
        updateQueue: [],
        effectQueue: [],
        localVariables: [],
        output: (
          <div className="space-y-4 p-4 text-sm">
            <div className="text-cyan-400 font-bold text-lg mb-2">
              🌲 Effects Across the Component Tree
            </div>

            <div className="bg-cyan-950 border border-cyan-500 p-3 rounded space-y-2">
              <div className="text-cyan-400 font-semibold">What Happened:</div>
              <div className="text-slate-300 text-xs space-y-1">
                <div>1. Parent renders with show = true</div>
                <div>2. Child included in render tree</div>
                <div>3. Child effect queued</div>
                <div>4. Commit phase → Child visible in DOM</div>
                <div>5. Effect phase → Child effect executes</div>
                <div className="text-yellow-300 font-semibold">
                  6. Effect calls close() → updates Parent's state slot
                </div>
                <div>7. Check phase detects Parent state change</div>
                <div>8. Parent re-renders with show = false</div>
                <div>9. Reconciliation removes Child from tree</div>
              </div>
            </div>

            <div className="bg-purple-950 border border-purple-500 p-3 rounded space-y-2">
              <div className="text-purple-400 font-semibold">React-tRace Insight:</div>
              <div className="text-slate-300 text-xs space-y-2">
                <div>
                  <span className="text-yellow-400">Effects are not isolated.</span> They can schedule updates to any state slot they have access to via closures.
                </div>
                <div className="mt-2 pt-2 border-t border-purple-700">
                  This models <span className="text-cyan-400">AppSetNormal</span> behavior: a Normal-phase effect uses a setter closure pointing to another component's state location/path.
                </div>
              </div>
            </div>

            <div className="bg-slate-700 border border-slate-500 p-3 rounded text-xs space-y-2">
              <div className="text-slate-300 font-semibold mb-2">Component Tree Model:</div>
              <div className="space-y-1 text-slate-400">
                <div>• State slots are associated with specific components</div>
                <div>• Effects are queued during render on their declaring component</div>
                <div>• Effect bodies execute during Commit Effects phase</div>
                <div>• Effects can invoke setters from parent/sibling components</div>
                <div>• Cross-component updates trigger Check on affected components</div>
                <div>• Reconciliation updates the tree structure</div>
              </div>
            </div>

            <div className="bg-yellow-950 border border-yellow-500 p-3 rounded text-xs">
              <div className="text-yellow-400 font-semibold mb-2">Key Semantic Concept:</div>
              <div className="text-slate-300">
                Effects can schedule updates <span className="text-yellow-400 font-semibold">across the tree</span>. The runtime tracks which component owns each state slot and which effects need to run.
              </div>
            </div>

            <div className="bg-green-950 border border-green-500 p-3 rounded text-xs">
              <div className="text-green-400 font-semibold mb-2">This is not necessarily "bad":</div>
              <div className="text-slate-300 space-y-1">
                <div>✓ Parent passing callbacks to children is normal React</div>
                <div>✓ Effects calling those callbacks is semantically valid</div>
                <div>✓ React-tRace models this as cross-component state updates</div>
                <div className="mt-2 text-slate-400">
                  The model makes explicit how effects and state exist in a shared runtime, not isolated per-component.
                </div>
              </div>
            </div>
          </div>
        ),
      },
    },
  ],
};
