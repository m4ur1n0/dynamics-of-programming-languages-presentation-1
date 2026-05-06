import Presentation from './components/Presentation';
import Slide from './components/Slide';
import TitleSlide from './components/TitleSlide';
import CounterDemo from './components/examples/CounterDemo';

export default function Home() {
  return (
    <Presentation>
      <TitleSlide
        title="Formally Modeling Dynamics of React Hooks"
        subtitle="A Research Paper Presentation"
      />

      <Slide>
        <h2>Outline</h2>
        <ul>
          <li className="fragment">Introduction to React Hooks</li>
          <li className="fragment">Motivation for Formal Modeling</li>
          <li className="fragment">Theoretical Framework</li>
          <li className="fragment">Key Results</li>
          <li className="fragment">Implications and Future Work</li>
        </ul>
      </Slide>

      <TitleSlide title="Introduction" />

      <Slide>
        <h2>What are React Hooks?</h2>
        <p>Add your content here...</p>
      </Slide>

      <CounterDemo />

      <TitleSlide title="Thank You" subtitle="Questions?" />
    </Presentation>
  );
}
