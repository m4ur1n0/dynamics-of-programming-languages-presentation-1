'use client';

import Slide from './Slide';

export default function OpeningSlide() {
  return (
    <Slide className="!bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="h-full flex flex-col items-center justify-center px-16">

        {/* Title */}
        <h1 className="text-9xl font-bold tracking-tight mb-6 font-mono">
          <span className="text-cyan-400">React</span>
          <span className="text-slate-500">-</span>
          <span className="text-rose-400">tRace</span>
        </h1>

        {/* Divider line */}
        <div className="w-96 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8" />

        {/* Subtitle */}
        <h2 className="text-3xl font-light text-slate-300 tracking-wide">
          Ben Auby, Theo Maurino
        </h2>

      </div>
    </Slide>
  );
}
