import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import type { HeroButtonConfig } from '../types/navigation';

interface HeroSectionProps {
  buttons: HeroButtonConfig[];
}

const CONTACT_EMAIL = 'rahim2best0noob07@gmail.com';

const SUBTITLE_TEXT = 'Your hub to perfection.';

export function HeroSection({ buttons }: HeroSectionProps) {
  const { displayed, done } = useTypewriter(SUBTITLE_TEXT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  return (
    <main className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl relative z-10">
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6 pl-[3px] text-[clamp(18px,3.2vw,24px)] leading-[1.35] font-normal tracking-[-0.01em] text-[#35434B] blur-[4px]"
          aria-hidden="true"
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        <div className="mb-5 sm:mb-6 pl-[3px]">
          <h1
            className="text-[clamp(44px,8vw,76px)] leading-[0.95] font-extrabold tracking-[-0.03em] text-[#17232B] mb-2 sm:mb-3"
            style={{ fontFamily: "'Syne', var(--font-heading)" }}
          >
            SKIRT
          </h1>
          <p className="text-[#17232B] text-[clamp(18px,3vw,24px)] leading-[1.35] font-normal tracking-[-0.01em] min-h-[32px]">
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-[#17232B] align-middle ml-[2px] animate-[blink_1s_step-end_infinite]"
                aria-hidden="true"
              />
            )}
          </p>
        </div>

        <div
          className={`flex flex-wrap gap-y-1 transition-[opacity,transform] duration-[400ms] ease-out ${
            pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {buttons.map((button) => (
            <button
              key={button.id}
              type="button"
              onClick={button.onClick}
              className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[13px] sm:text-[15px] font-medium tracking-[-0.005em] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-[#17232B] hover:text-[#F4E8C5] hover:border-[#17232B] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
            >
              {button.label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={`Copy email address ${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center text-[#F4E8C5] bg-transparent border border-[#F4E8C5] rounded-full text-[13px] sm:text-[15px] font-medium tracking-[-0.005em] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-[#F4E8C5] hover:text-[#17232B] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4E8C5]"
          >
            <span>
              {copied ? (
                `Copied: ${CONTACT_EMAIL}`
              ) : (
                <>
                  Reach us: <span className="underline underline-offset-2">{CONTACT_EMAIL}</span>
                </>
              )}
            </span>
            {copied ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2.5 6.2L4.9 8.6L9.5 3.4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="4"
                  width="6.5"
                  height="6.5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M8 4V2.5C8 1.94772 7.55228 1.5 7 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V7C1.5 7.55228 1.94772 8 2.5 8H4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
