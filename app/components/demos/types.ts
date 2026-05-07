export type Phase =
  | "event"
  | "render"
  | "useState"
  | "useEffect"
  | "effect"
  | "check"
  | "commit"
  | "reconcile"
  | "idle";

export type Decision = "Check" | "Effect";

export interface StateSlot {
  label: string;
  value: string | number | boolean;
  hookIndex: number;
}

export interface QueueItem {
  id: string;
  label: string;
  type?: "updater" | "value";
}

export interface LocalVariable {
  name: string;
  value: string | number | boolean;
}

export interface TreeNode {
  name: string;
  active?: boolean;
  hasState?: boolean;
  hasEffects?: boolean;
}

export interface RuntimeState {
  localVariables?: LocalVariable[];
  stateSlots?: StateSlot[];
  updateQueue?: QueueItem[];
  effectQueue?: QueueItem[];
  componentTree?: TreeNode[];
  decisions?: Decision[];
  output?: React.ReactNode;
}

export interface DemoStep {
  phase: Phase;
  highlightedLines: number[];
  explanation: string;
  runtime: RuntimeState;
}

export interface DemoConfig {
  title: string;
  subtitle?: string;
  codeLines: string[];
  steps: DemoStep[];
}
