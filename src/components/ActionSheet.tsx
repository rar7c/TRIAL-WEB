import { FormEvent, useEffect, useState } from 'react';
import type { PageId, PanelId } from '../types/navigation';

interface ActionSheetProps {
  activePanel: PanelId | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onSelectPanel: (id: PanelId) => void;
}

interface PanelItem {
  heading: string;
  detail: string;
}

interface PanelInfo {
  title: string;
  lead: string;
  items?: PanelItem[];
  pageLinks?: { page: PageId; label: string }[];
  hasForm?: boolean;
  formPlaceholder?: string;
}

const CONTACT_EMAIL = 'rahim2best0noob07@gmail.com';

const PANEL_CONTENT: Record<PanelId, PanelInfo> = {
  collections: {
    title: 'Collections',
    lead: 'Explore Mainframe® releases and curated studio spaces.',
    pageLinks: [
      { page: 'exclusives', label: 'OUR EXCLUSIVES' },
      { page: 'drop-preview', label: 'DROP PREVIEW' },
      { page: 'customize', label: 'CUSTOMIZE CLOTHES' },
    ],
  },
  about: {
    title: 'About',
    lead: 'Mainframe® is an independent clothing label focused on proportion, restraint, and pieces worth wearing.',
    items: [
      {
        heading: '01. Design Philosophy',
        detail: 'Built around quiet structure, balanced silhouettes, and long-term wearability.',
      },
      {
        heading: '02. Customization & Exclusives',
        detail: 'Dedicated studio tools for bespoke configuration alongside limited seasonal allocations.',
      },
    ],
    pageLinks: [
      { page: 'customize', label: 'CUSTOMIZE CLOTHES' },
      { page: 'exclusives', label: 'OUR EXCLUSIVES' },
    ],
  },
  'new-arrivals': {
    title: 'New Arrivals',
    lead: 'Upcoming seasonal releases and preview schedules.',
    pageLinks: [
      { page: 'drop-preview', label: 'DROP PREVIEW' },
      { page: 'exclusives', label: 'OUR EXCLUSIVES' },
    ],
  },
  'shop-all': {
    title: 'Shop All',
    lead: 'Navigate directly to Mainframe® dedicated apparel pages.',
    pageLinks: [
      { page: 'customize', label: 'CUSTOMIZE CLOTHES' },
      { page: 'exclusives', label: 'OUR EXCLUSIVES' },
      { page: 'drop-preview', label: 'DROP PREVIEW' },
    ],
  },
  contact: {
    title: 'Get in Touch',
    lead: `Questions, custom requests, or collaborations — reach us directly at ${CONTACT_EMAIL} or send a note below.`,
    hasForm: true,
    formPlaceholder: 'How can we help?',
  },
};

export function ActionSheet({
  activePanel,
  onClose,
  onNavigate,
  onSelectPanel,
}: ActionSheetProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSubmitted(false);
    setError('');
  }, [activePanel]);

  useEffect(() => {
    if (!activePanel) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel, onClose]);

  if (!activePanel) return null;

  const panel = PANEL_CONTENT[activePanel];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please include a brief note.');
      return;
    }

    setError('');
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-end bg-[#17232B]/40 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      <div
        className="relative h-full w-full max-w-lg bg-[#8997A0] text-[#17232B] p-6 sm:p-10 overflow-y-auto flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between border-b border-[#17232B]/15 pb-5 mb-8">
            <h2
              id="panel-title"
              className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] text-[#17232B]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {panel.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="text-[13px] font-medium text-[#17232B] bg-[#F4E8C5] border border-[#17232B]/15 rounded-full px-4 py-1.5 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
            >
              Close
            </button>
          </div>

          <p className="text-[17px] sm:text-[19px] leading-[1.45] font-normal tracking-[-0.01em] text-[#17232B] mb-8">
            {panel.lead}
          </p>

          {panel.items && (
            <div className="space-y-6 mb-8">
              {panel.items.map((item) => (
                <div key={item.heading} className="border-t border-[#17232B]/15 pt-4">
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#17232B] mb-1">
                    {item.heading}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[#35434B]">{item.detail}</p>
                </div>
              ))}
            </div>
          )}

          {panel.pageLinks && (
            <div className="flex flex-wrap gap-2.5 pt-2">
              {panel.pageLinks.map((link) => (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate(link.page);
                  }}
                  className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[13px] font-medium px-5 py-2 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => onSelectPanel('contact')}
                className="inline-flex items-center justify-center text-[#F4E8C5] bg-transparent border border-[#F4E8C5] rounded-full text-[13px] font-medium px-5 py-2 hover:bg-[#F4E8C5] hover:text-[#17232B] transition-colors duration-200 cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          )}

          {panel.hasForm && (
            <div>
              {submitted ? (
                <div className="border border-[#17232B]/15 bg-[#F4E8C5]/35 p-6">
                  <p className="text-[18px] font-medium text-[#17232B] mb-2">Note received.</p>
                  <p className="text-[15px] leading-[1.5] text-[#35434B] mb-5">
                    Thanks for reaching out. Our studio team will reply to your email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[13px] font-medium px-4 py-1.5 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="mf-name"
                      className="block text-[13px] font-medium text-[#17232B] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="mf-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[#F4E8C5]/35 border border-[#17232B]/20 px-3.5 py-2.5 text-[15px] text-[#17232B] placeholder:text-[#35434B] focus:outline-none focus:border-[#17232B] focus:bg-[#F4E8C5]/55 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mf-email"
                      className="block text-[13px] font-medium text-[#17232B] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="mf-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-[#F4E8C5]/35 border border-[#17232B]/20 px-3.5 py-2.5 text-[15px] text-[#17232B] placeholder:text-[#35434B] focus:outline-none focus:border-[#17232B] focus:bg-[#F4E8C5]/55 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mf-message"
                      className="block text-[13px] font-medium text-[#17232B] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="mf-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={panel.formPlaceholder}
                      className="w-full bg-[#F4E8C5]/35 border border-[#17232B]/20 px-3.5 py-2.5 text-[15px] text-[#17232B] placeholder:text-[#35434B] focus:outline-none focus:border-[#17232B] focus:bg-[#F4E8C5]/55 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p
                      className="text-[13px] font-medium text-[#5E2323] bg-[#F4E8C5]/75 border border-[#17232B]/15 px-3 py-2"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[14px] font-medium px-6 py-2.5 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
                  >
                    Send note
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="pt-8 mt-8 border-t border-[#17232B]/15 flex items-center justify-between text-[13px] text-[#35434B]">
          <span className="font-medium text-[#17232B]">Mainframe®</span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#17232B] underline underline-offset-2 hover:text-[#35434B] transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
