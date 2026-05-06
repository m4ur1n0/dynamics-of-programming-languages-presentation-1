interface SlideProps {
  children: React.ReactNode;
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  background?: string;
  className?: string;
}

export default function Slide({
  children,
  transition,
  background,
  className = ''
}: SlideProps) {
  return (
    <section
      data-transition={transition}
      data-background={background}
      className={className}
    >
      {children}
    </section>
  );
}
