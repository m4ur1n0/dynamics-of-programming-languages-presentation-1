import Slide from '../Slide';
import SemanticDemoShell from './SemanticDemoShell';
import { DemoConfig } from './types';

interface DemoSlideProps {
  config: DemoConfig;
}

export default function DemoSlide({ config }: DemoSlideProps) {
  return (
    <Slide className="!bg-slate-950">
      <div className="h-full w-full p-8">
        <SemanticDemoShell config={config} />
      </div>
    </Slide>
  );
}
