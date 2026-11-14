import { useState } from 'react';
import type { PageId, PanelId } from '../types/navigation';

interface CustomizePageProps {
  onNavigate: (page: PageId) => void;
  onOpenPanel: (panel: PanelId) => void;
}

const SILHOUETTE_OPTIONS = ['Silhouette A', 'Silhouette B', 'Silhouette C', 'Silhouette D'] as const;

const FINISH_SWATCHES = [
  { id: 'navy', label: 'Charcoal Navy', hex: '#17232B' },
  { id: 'slate', label: 'Deep Slate', hex: '#35434B' },
  { id: 'blue-grey', label: 'Muted Blue-Grey', hex: '#8997A0' },
  { id: 'cream', label: 'Warm Cream', hex: '#F4E8C5' },
] as const;

export function CustomizePage({ onNavigate, onOpenPanel }: CustomizePageProps) {
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>(SILHOUETTE_OPTIONS[0]);
  const [selectedSwatch, setSelectedSwatch] = useState<(typeof FINISH_SWATCHES)[number]>(
    FINISH_SWATCHES[0],
  );

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
              onClick={() => onNavigate('exclusives')}
              className="text-[#35434B] hover:text-[#17232B] transition-colors cursor-pointer"
            >
              Our Exclusives
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
            Mainframe® Atelier · Placeholder Workspace
          </p>
          <h1
            className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-[#17232B] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Customize Clothes
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-[1.45] text-[#35434B]">
            A dedicated studio page for garment customization. Pattern blocks, fabric options, and
            live rendering assets will be connected here.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 border border-[#17232B]/15 bg-[#F4E8C5]/15 p-6 sm:p-10 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[13px] text-[#35434B]">
              <span>Garment Viewport Placeholder</span>
              <span>{selectedSilhouette}</span>
            </div>

            <div className="my-10 flex flex-col items-center justify-center text-center py-8">
              <div
                className="w-28 h-36 border border-dashed border-[#17232B]/30 flex items-center justify-center mb-5 transition-colors duration-200"
                style={{ backgroundColor: `${selectedSwatch.hex}22` }}
              >
                <span className="text-[12px] font-medium text-[#17232B]/70 px-3">
                  Pattern Slot
                </span>
              </div>
              <p className="text-[16px] font-medium text-[#17232B] mb-1">
                Garment Preview Pending
              </p>
              <p className="text-[14px] text-[#35434B] max-w-sm">
                Selected configuration: {selectedSilhouette} · {selectedSwatch.label}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#17232B]/15 pt-4 text-[13px] text-[#35434B]">
              <span>Asset Status: Awaiting Studio Files</span>
              <span>Scale 1:1</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 border-t lg:border-t-0 border-[#17232B]/15 pt-6 lg:pt-0">
            <div className="border-b border-[#17232B]/15 pb-6">
              <h2 className="text-[15px] font-semibold text-[#17232B] mb-3">
                01. Base Silhouette Placeholder
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {SILHOUETTE_OPTIONS.map((option) => {
                  const active = selectedSilhouette === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedSilhouette(option)}
                      className={`px-4 py-2.5 text-[13px] font-medium border rounded-full transition-colors duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#17232B] text-[#F4E8C5] border-[#17232B]'
                          : 'bg-[#F4E8C5]/50 text-[#17232B] border-[#17232B]/15 hover:bg-[#F4E8C5]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-b border-[#17232B]/15 pb-6">
              <h2 className="text-[15px] font-semibold text-[#17232B] mb-3">
                02. Finish Tone Placeholder
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {FINISH_SWATCHES.map((swatch) => {
                  const active = selectedSwatch.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium border rounded-full transition-colors duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#17232B] text-[#F4E8C5] border-[#17232B]'
                          : 'bg-[#F4E8C5]/50 text-[#17232B] border-[#17232B]/15 hover:bg-[#F4E8C5]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-[#17232B]/25 shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{swatch.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-[15px] font-semibold text-[#17232B] mb-2">
                03. Bespoke Requests
              </h2>
              <p className="text-[14px] leading-[1.5] text-[#35434B] mb-5">
                While the interactive customizer is being finalized, reach out directly with custom
                sizing or studio inquiries.
              </p>
              <button
                type="button"
                onClick={() => onOpenPanel('contact')}
                className="inline-flex items-center justify-center bg-[#F4E8C5] text-[#17232B] border border-[#17232B]/15 rounded-full text-[14px] font-medium px-6 py-2.5 hover:bg-[#17232B] hover:text-[#F4E8C5] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
              >
                Request Custom Inquiry
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
