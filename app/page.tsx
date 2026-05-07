import Presentation from './components/Presentation';
import TitleSlide from './components/TitleSlide';
import OpeningSlide from './components/OpeningSlide';
import DemoPlaceholder from './components/DemoPlaceholder';
import WhatIsReact from './components/slides/WhatIsReact';
import { DemoSlide, placeholderDemo, miniRuntimeDemo, fixedLoopDemo, hookSlotScramblerDemo, effectLoopDemo, flickerDerivedStateDemo, childDeletesItselfDemo } from './components/demos';
import {
  HowDoesReactWork,
  CentralWeirdness,
  ReactEffects,
  ReactHooks,
  TheProblem,
  WhatIsReactTrace,
  WhyFormalize,
  MiniLanguage,
  CoreSyntax,
  UseStateAndEffect,
  HowUseStateWorks,
  StateUpdateQueues,
  WhyHookOrder,
  UseEffectPostRender,
  InfiniteLoops,
  TopLevelSetters,
  Flicker,
  RuntimeModes,
  TheRenderLoop,
  WhatPaperContributes,
  WhyThisMatters,
  Conclusion,
} from './components/slides/AllSlides';
import Slide from './components/Slide';

export default function Home() {
  return (
    <Presentation>
      {/* Opening */}
      <OpeningSlide />

      <Slide>
        <h2>STAGE 1</h2>
        <ol>
          <li className="fragment">What is React?</li>
          <li className="fragment">
            How does React work?
            <ul>
                <li className="fragment">Demo: component re-rendering</li>
            </ul>

          </li>
          
          <li className="fragment">
            The Problem: Hooks are semantically opaque
          </li>
          <li className="fragment">
            What is React-tRace?
          </li>
          <li className="fragment">
            The simplified React-tRace language
            <ul>
                <li>
                    {/* <pre style={{"marginRight": "4px", "width": "auto"}}>
                        <code
                            className={`language-javascript`}
                            data-trim
                        >
                            useState
                        </code>
                    </pre> */}
                    <span className='font-mono p-1 px-2 rounded-md bg-gray-700 '>useState</span> and external state storage
                </li>
            </ul>
          </li>
          
        </ol>
      </Slide>

      <Slide>
        <h2>STAGE 2</h2>

        <ol>
          <li className="fragment">
            Rules of Hooks / Hook Order
            <ul>
                <li>
                    <span className='font-mono p-1 px-2 rounded-md bg-gray-700 '>useEffect</span> and post-render effects
                </li>
            </ul>
          </li>
          <li className="fragment">

            Two loop mechanisms + flicker

            <ul>
                <li>
                    Demo: bug + fixed version
                </li>
            </ul>
            
          </li>
          <li className="fragment">
            Render / effect / check / event loop mental model
          </li>
          <li className="fragment">
            Visualizer Demo
          </li>

          <li className="fragment">
            Conclusion: what the paper contributes
          </li>
        </ol>
      </Slide>

      {/* Introduction to React */}
      <WhatIsReact />
      <HowDoesReactWork />

      {/* Demo: Basic React - Using Semantic Demo Shell */}
      <DemoSlide config={placeholderDemo} />

      {/* The Central Problem */}
      <CentralWeirdness />
      <ReactEffects />
      <ReactHooks />

      {/* Demo: React Hooks */}
      {/* <DemoPlaceholder
        title="Demo: React Hooks"
        purpose="Show useState persistence and useEffect post-render behavior"
      /> */}

      <TheProblem />

      {/* Introducing React-tRace */}
      <WhatIsReactTrace />
      <WhyFormalize />
      <MiniLanguage />
      <CoreSyntax />

      {/* Demo: Mini React Runtime Simulator */}
      <DemoSlide config={miniRuntimeDemo} />

      {/* Deep Dive: useState and useEffect */}
      <UseStateAndEffect />
      <HowUseStateWorks />
      <StateUpdateQueues />
      <WhyHookOrder />

      {/* Demo: Hook Order Violation */}
      <DemoSlide config={hookSlotScramblerDemo} />

      <UseEffectPostRender />

      {/* Demo: Effect Loop - detailed phase-by-phase */}
      <DemoSlide config={effectLoopDemo} />

      {/* Common Bugs */}
      <InfiniteLoops />

      <TopLevelSetters />
      <Flicker />

      {/* Demo: Flicker from Derived State in Effect */}
      <DemoSlide config={flickerDerivedStateDemo} />

      {/* Demo: Fixed Version */}
      <DemoSlide config={fixedLoopDemo} />

      {/* Demo: Cross-component Effects */}
      <DemoSlide config={childDeletesItselfDemo} />

      {/* The Formal Model */}
      <RuntimeModes />
      <TheRenderLoop />

      {/* The Visualizer */}
      {/* <DemoPlaceholder
        title="Demo: React-tRace Visualizer"
        purpose="Run a small bug example in the visualizer or show a recording"
      /> */}

      {/* Conclusion */}
      <WhatPaperContributes />
      <WhyThisMatters />
      <Conclusion />

      {/* End */}
      <TitleSlide title="Thank You" subtitle="Questions?" />
    </Presentation>
  );
}
