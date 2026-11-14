import { useState } from 'react';
import type { PageId, PanelId } from '../types/navigation';

interface DropPreviewPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPanel: (panel: PanelId) => void;
}

const UPCOMING_DROPS = [
  {
    id: 'drop-01',
    number: 'Drop 01',
    title: 'Upcoming Capsule — Placeholder',
    window: 'Release window pending',
    note: 'Garment lookbook and release specifications will appear prior to launch.',
  },
  {
    id: 'drop-02',
    number: 'Drop 02',
    title: 'Upcoming Capsule — Placeholder',
    window: 'Release window pending',
    note: 'Garment lookbook and release specifications will appear prior to launch.',
  },
  {
    id: 'drop-03',
    number: 'Drop 03',
    title: 'Upcoming Capsule — Placeholder',
    window: 'Release window pending',
    note: 'Garment lookbook and release specifications will appear prior to launch.',
  },
];

export function DropPreviewPage({ onNavigate, onOpenPanel }: DropPreviewPageProps) {
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);

  const toggleNotify = (id: string) => {
    setNotifiedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <main className="relative z-[1] min-h-screen bg-[#8997A0] text-[#17232B] pt-24 sm:pt-28 pb-16 px-5 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#17232B]/15 pb-5 mb-10">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[13px] sm:text-[14px] font-medium px-4 py-1.5 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-5 text-[14px] font-medium">
            <button
              type="button"
              onClick={() => onNavigate('customize')}
              className="text-[#35434B] hover:text-[#17232B] transition-colors cursor-pointer"
            >
              Customize Clothes
            </button>
            <button
              type="button"
              onClick={() => onNavigate('exclusives')}
              className="text-[#35434B] hover:text-[#17232B] transition-colors cursor-pointer"
            >
              Our Exclusives
            </button>
          </div>
        </div>

        <header className="max-w-2xl mb-12">
          <p className="text-[13px] font-medium tracking-[0.02em] text-[#35434B] mb-2">
            Mainframe® Schedule · Placeholder Queue
          </p>
          <h1
            className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-[#17232B] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Drop Preview
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-[1.45] text-[#35434B]">
            Upcoming Mainframe® clothing drops queued for release. Visual previews and sizing charts
            are held in reserve until announcement.
          </p>
        </header>

        <section className="space-y-6 mb-12">
          {UPCOMING_DROPS.map((drop) => {
            const isNotified = notifiedIds.includes(drop.id);
            return (
              <div
                key={drop.id}
                className="border-t border-[#17232B]/15 pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-3">
                  <div className="aspect-[16/10] border border-[#17232B]/15 bg-[#F4E8C5]/15 flex items-center justify-center p-4 text-center">
                    <span className="text-[13px] font-medium text-[#35434B]">
                      Preview Frame Pending
                    </span>
                  </div>
                </div>

                <div className="md:col-span-6">
                  <p className="text-[13px] font-medium tabular-nums text-[#35434B] mb-1">
                    {drop.number} · {drop.window}
                  </p>
                  <h2 className="text-[18px] sm:text-[20px] font-semibold tracking-[-0.015em] text-[#17232B] mb-1.5">
                    {drop.title}
                  </h2>
                  <p className="text-[14px] leading-[1.5] text-[#35434B]">{drop.note}</p>
                </div>

                <div className="md:col-span-3 flex md:justify-end">
                  <button
                    type="button"
                    onClick={() => toggleNotify(drop.id)}
                    className={`inline-flex items-center justify-center rounded-full text-[13px] font-medium px-5 py-2 border transition-colors duration-200 cursor-pointer ${
                      isNotified
                        ? 'bg-[#17232B] text-[#F4E8C5] border-[#17232B]'
                        : 'bg-[#F4E8C5] text-[#17232B] border-[#17232B]/15 hover:bg-[#17232B] hover:text-[#F4E8C5]'
                    }`}
                  >
                    {isNotified ? 'Reminder Queued' : 'Request Drop Notice'}
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <div className="border-t border-[#17232B]/15 pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-[#35434B]">
            Want direct email updates for upcoming releases?
          </p>
          <button
            type="button"
            onClick={() => onOpenPanel('contact')}
            className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[14px] font-medium px-5 py-2 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer"
          >
            Join Release List
          </button>
        </div>
      </div>
    </main>
  );
}
