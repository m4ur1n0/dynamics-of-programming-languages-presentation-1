import Slide from './Slide';

interface DemoPlaceholderProps {
  title: string;
  purpose: string;
}

export default function DemoPlaceholder({ title, purpose }: DemoPlaceholderProps) {
  return (
    <Slide className="!bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="h-full flex flex-col items-center justify-center px-16 py-12">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-rose-400 mb-4 font-mono">
            {title}
          </h2>
          <p className="text-2xl text-slate-400 italic">
            {purpose}
          </p>
        </div>

        <div className="flex-1 w-full max-w-5xl border-4 border-dashed border-slate-600 rounded-2xl flex items-center justify-center bg-slate-900/50">
          <div className="text-center">
            <div className="text-8xl mb-4">🎬</div>
            <div className="text-3xl font-mono text-slate-500 font-bold">
              LIVE DEMO / CODE HERE
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
