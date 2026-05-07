import ContentSlide from '../ContentSlide';
import ComponentTree from '../visuals/ComponentTree';

export default function WhatIsReact() {
  return (
    <ContentSlide title="What is React?">
      <div className="flex items-center justify-between w-full gap-12">
        <ul className="list-none text-3xl text-slate-300 space-y-6 flex-1">
          <li className="fragment">
            <span className="text-cyan-400 font-mono">•</span> JavaScript library
          </li>
          <li className="fragment">
            <span className="text-cyan-400 font-mono">•</span> Used for building front-end applications
          </li>
          <li className="fragment">
            <span className="text-cyan-400 font-mono">•</span> Breaks down UI to components using a virtual DOM
            <ul className="list-none ml-8 mt-4 text-2xl text-slate-400 space-y-3">
              <li className="fragment">○ tree of components</li>
            </ul>
          </li>
          <li className="fragment">
            <span className="text-cyan-400 font-mono">•</span> UI is treated as a function of state
            <ul className="list-none ml-8 mt-4 text-2xl text-slate-400 space-y-3">
              <li className="fragment">○ functions describe what the screen should look like</li>
              <li className="fragment">○ is declarative</li>
            </ul>
          </li>
        </ul>

        <div className="flex-1">
          <ComponentTree />
        </div>
      </div>
    </ContentSlide>
  );
}
