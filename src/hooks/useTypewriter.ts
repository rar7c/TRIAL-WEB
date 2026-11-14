import { useEffect, useState } from 'react';

interface TypewriterResult {
  displayed: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600,
): TypewriterResult {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);

    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((prev) => {
          if (prev >= text.length) {
            if (intervalId !== undefined) {
              window.clearInterval(intervalId);
            }
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return {
    displayed: text.slice(0, index),
    done: index >= text.length,
  };
}
