import type { PageId, PanelId } from '../types/navigation';

interface ExclusivesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPanel: (panel: PanelId) => void;
}

const EXCLUSIVE_SLOTS = [
  { id: '01', label: 'Exclusive Slot 01', status: 'Reserved for upcoming release' },
  { id: '02', label: 'Exclusive Slot 02', status: 'Reserved for upcoming release' },
  { id: '03', label: 'Exclusive Slot 03', status: 'Reserved for upcoming release' },
];

export function ExclusivesPage({ onNavigate, onOpenPanel }: ExclusivesPageProps) {
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
              onClick={() => onNavigate('drop-preview')}
              className="text-[#35434B] hover:text-[#17232B] transition-colors cursor-pointer"
            >
              Drop Preview
            </button>
          </div>
        </div>

        <header className="max-w-2xl mb-12">
          <p className="text-[13px] font-medium tracking-[0.02em] text-[#35434B] mb-2">
            Mainframe® Collection · Placeholder Archive
          </p>
          <h1
            className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-[#17232B] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Exclusives
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-[1.45] text-[#35434B]">
            A dedicated collection page for numbered Mainframe® exclusives. Piece photography and
            allocation details will be published here.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {EXCLUSIVE_SLOTS.map((slot) => (
            <article key={slot.id} className="flex flex-col">
              <div className="aspect-[3/4] border border-[#17232B]/15 bg-[#F4E8C5]/15 flex flex-col items-center justify-center p-6 text-center mb-4">
                <span className="text-[12px] font-medium text-[#35434B] mb-2 tabular-nums">
                  {slot.id}
                </span>
                <div className="w-12 h-[1px] bg-[#17232B]/20 mb-2" aria-hidden="true" />
                <span className="text-[14px] font-medium text-[#17232B]">
                  Visual Placeholder
                </span>
              </div>

              <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#17232B] mb-1">
                {slot.label}
              </h2>
              <p className="text-[14px] text-[#35434B]">{slot.status}</p>
            </article>
          ))}
        </section>

        <div className="border-t border-[#17232B]/15 pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-[#35434B]">
            Interested in studio-exclusive allocations?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenPanel('contact')}
              className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[14px] font-medium px-5 py-2 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer"
            >
              Inquire for Access
            </button>
            <button
              type="button"
              onClick={() => onNavigate('drop-preview')}
              className="inline-flex items-center justify-center text-[#F4E8C5] bg-transparent border border-[#F4E8C5] rounded-full text-[14px] font-medium px-5 py-2 hover:bg-[#F4E8C5] hover:text-[#17232B] transition-colors duration-200 cursor-pointer"
            >
              View Drop Preview
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
