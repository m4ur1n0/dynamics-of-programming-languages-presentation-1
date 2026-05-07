import Slide from './Slide';

interface ContentSlideProps {
  title: string;
  children: React.ReactNode;
  background?: string;
}

export default function ContentSlide({ title, children, background }: ContentSlideProps) {
  return (
    <Slide background={background}>
      <div className="h-full flex flex-col px-16 py-12">
        <h2 className="text-5xl font-bold text-cyan-400 mb-8 font-mono">{title}</h2>
        <div className="flex-1 flex items-center">
          {children}
        </div>
      </div>
    </Slide>
  );
}
