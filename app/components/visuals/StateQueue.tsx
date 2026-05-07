'use client';

export default function StateQueue() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="text-2xl font-mono text-slate-300 mb-4">State Update Queue</div>

      <div className="flex items-center space-x-4">
        {/* Queue items */}
        <div className="flex space-x-2">
          <div className="px-6 py-4 bg-rose-500/20 border-2 border-rose-400 rounded-lg">
            <div className="text-rose-400 font-mono text-lg">c → c + 1</div>
          </div>
          <div className="text-4xl text-slate-500">→</div>
          <div className="px-6 py-4 bg-rose-500/20 border-2 border-rose-400 rounded-lg">
            <div className="text-rose-400 font-mono text-lg">c → c + 1</div>
          </div>
          <div className="text-4xl text-slate-500">→</div>
          <div className="px-6 py-4 bg-cyan-500/20 border-2 border-cyan-400 rounded-lg">
            <div className="text-cyan-400 font-mono text-lg font-bold">result</div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8 mt-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-slate-500 mb-2">0</div>
          <div className="text-sm text-slate-400">initial</div>
        </div>
        <div className="text-4xl text-slate-500">→</div>
        <div className="text-center">
          <div className="text-4xl font-bold text-rose-400 mb-2">1</div>
          <div className="text-sm text-slate-400">after first</div>
        </div>
        <div className="text-4xl text-slate-500">→</div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 mb-2">2</div>
          <div className="text-sm text-slate-400">final state</div>
        </div>
      </div>
    </div>
  );
}
