import Slide from './Slide';

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  background?: string;
}

export default function TitleSlide({ title, subtitle, background }: TitleSlideProps) {
  return (
    <Slide background={background}>
      <h1>{title}</h1>
      {subtitle && <h3>{subtitle}</h3>}
    </Slide>
  );
}
