# Semantic Demo Shell

Interactive visualization framework for React-tRace presentation demos.

## Overview

The `SemanticDemoShell` is a reusable component for creating step-by-step visualizations of React's operational semantics. It makes the hidden runtime behavior of React Hooks visible and explicit.

## Components

- **`SemanticDemoShell`**: Main wrapper component with code panel, runtime state panel, phase timeline, and controls
- **`CodePanel`**: Displays code with line numbers and highlights active lines
- **`RuntimeStatePanel`**: Visualizes runtime state (state slots, queues, decisions, tree, output)
- **`PhaseTimeline`**: Shows current execution phase
- **`DemoSlide`**: Wrapper to use a demo config in a presentation slide

## Usage

### 1. Create a Demo Configuration

```typescript
import { DemoConfig } from './components/demos/types';

const myDemo: DemoConfig = {
  title: 'useEffect Bug Demo',
  subtitle: 'Infinite render loop from improper effect dependency',
  codeLines: [
    'function Component() {',
    '  const [count, setCount] = useState(0);',
    '  useEffect(() => {',
    '    setCount(count + 1);',
    '  });',
    '  return <div>{count}</div>;',
    '}',
  ],
  steps: [
    {
      phase: 'render',
      highlightedLines: [1, 2],
      explanation: 'Initial render with count = 0',
      runtime: {
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        effectQueue: [],
        decisions: [],
      },
    },
    {
      phase: 'useEffect',
      highlightedLines: [3, 4, 5],
      explanation: 'Effect is scheduled to run after render',
      runtime: {
        stateSlots: [{ label: 'count', value: 0, hookIndex: 0 }],
        effectQueue: [{ id: '1', label: 'setCount(count + 1)' }],
        decisions: ['Effect'],
      },
    },
    // ... more steps
  ],
};
```

### 2. Add to Presentation

```typescript
import { DemoSlide } from './components/demos';
import { myDemo } from './demos/myDemo';

<DemoSlide config={myDemo} />
```

## Visual Language

The demo shell uses consistent visual styling to represent different semantic concepts:

### Local Variables
- **Appearance**: Dashed border, semi-transparent background
- **Color**: Yellow values
- **Purpose**: Show that these are temporary and reset every render

### State Slots
- **Appearance**: Solid border, cyan theme
- **Color**: Cyan with hook index label
- **Purpose**: Show persistent storage outside function scope

### Update Queue
- **Appearance**: Pill-shaped cards
- **Color**: Rose/pink
- **Purpose**: Show queued state updates waiting to be processed

### Effect Queue
- **Appearance**: Rounded cards
- **Color**: Purple
- **Purpose**: Show scheduled effects waiting to run

### Decisions
- **Appearance**: Rounded pills
- **Colors**:
  - Check: Yellow (state update detected, check needed)
  - Effect: Purple (effects need to run)
- **Purpose**: Make React's scheduling decisions explicit

### Phase Timeline
- **Active Phase**: Highlighted with colored border and larger scale
- **Past Phases**: Dimmed
- **Future Phases**: Very dim
- **Purpose**: Show progression through render cycle

## Phases

Available phase values:
- `event` - User interaction (click, input, etc.)
- `render` - Component function execution
- `useState` - State hook call
- `useEffect` - Effect hook call
- `effect` - Effect execution
- `check` - Checking for queued updates
- `commit` - Committing changes to DOM
- `reconcile` - Reconciling component tree
- `idle` - Waiting for next event

## Controls

- **Prev**: Go to previous step
- **Next**: Go to next step
- **Reset**: Return to first step
- **Autoplay**: Automatically advance steps (2 second delay)

## Animation

All transitions include:
- 300ms fade-in for new elements
- Slide-in from bottom for queue items
- Color transitions for code highlights
- Scale animations for phase timeline

## Creating New Demos

1. Define your demo config following the `DemoConfig` type
2. Add semantic steps that progress through the execution
3. Visualize the runtime state at each step
4. Include clear explanations focused on *why* React behaves this way
5. Import and use with `<DemoSlide config={yourDemo} />`

## Example Demos to Create

- Basic useState counter
- useEffect infinite loop bug
- useEffect with correct dependencies
- Multiple state updates batching
- Effect cleanup
- State update queues with updater functions
- Component tree with parent/child state
- Top-level setter bug
- Reconciliation after state change
