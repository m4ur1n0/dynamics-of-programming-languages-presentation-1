'use client';

import { useEffect, useRef } from 'react';

interface PresentationProps {
  children: React.ReactNode;
}

export default function Presentation({ children }: PresentationProps) {
  const deckRef = useRef<any>(null);
  const revealDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initReveal = async () => {
      if (revealDivRef.current && !deckRef.current) {
        const Reveal = (await import('reveal.js')).default;
        const RevealHighlight = (
            await import('reveal.js/plugin/highlight')
        ).default;

        deckRef.current = new Reveal(revealDivRef.current, {
          hash: true,
          controls: true,
          progress: true,
          center: true,
          transition: 'slide',
          width: 1280,
          height: 720,
          margin: 0.1,
          plugins: [RevealHighlight],
        });

        await deckRef.current.initialize();
      }
    };

    initReveal();

    return () => {
      if (deckRef.current) {
        deckRef.current.destroy();
        deckRef.current = null;
      }
    };
  }, []);

  return (
    <div className="reveal" ref={revealDivRef}>
      <div className="slides">
        {children}
      </div>
    </div>
  );
}
