import type { PageId, PanelId } from '../types/navigation';

interface NavLinkItem {
  id: PanelId;
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'collections', label: 'Collections', href: '#collections' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'new-arrivals', label: 'New Arrivals', href: '#new-arrivals' },
  { id: 'shop-all', label: 'Shop All', href: '#shop-all' },
];

interface NavbarProps {
  currentPage: PageId;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onNavigate: (page: PageId) => void;
  onSelectPanel: (id: PanelId) => void;
}

export function Navbar({
  currentPage,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onNavigate,
  onSelectPanel,
}: NavbarProps) {
  const handleLinkClick = (id: PanelId) => {
    onCloseMenu();
    if (id === 'collections') {
      onNavigate('exclusives');
      return;
    }
    if (id === 'new-arrivals') {
      onNavigate('drop-preview');
      return;
    }
    onSelectPanel(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 transition-colors duration-200 ${
          currentPage !== 'home' ? 'bg-[#8997A0]/90 backdrop-blur-sm' : ''
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onCloseMenu();
            onNavigate('home');
          }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17232B]"
        >
          <span
            className="text-[21px] sm:text-[25px] font-semibold tracking-[-0.025em] text-[#17232B]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[24px] sm:text-[28px] text-[#17232B] select-none tracking-[-0.02em]"
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        <nav
          className="hidden md:flex items-center text-[19px] lg:text-[21px] font-normal tracking-[-0.01em] text-[#17232B]"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link, index) => (
            <span key={link.id} className="inline-flex items-baseline whitespace-nowrap">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="text-[#17232B] hover:text-[#35434B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17232B]"
              >
                {link.label}
              </a>
              {index < NAV_LINKS.length - 1 && (
                <span className="whitespace-pre text-[#35434B]" aria-hidden="true">
                  ,{' '}
                </span>
              )}
            </span>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onCloseMenu();
            onSelectPanel('contact');
          }}
          className="hidden md:inline-block text-[19px] lg:text-[21px] font-medium tracking-[-0.01em] text-[#17232B] underline underline-offset-4 decoration-[#17232B]/50 hover:text-[#35434B] hover:decoration-[#35434B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17232B]"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232B]"
        >
          <span
            className={`w-6 h-[2px] bg-[#17232B] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#17232B] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#17232B] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[9] bg-[#8997A0]/95 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-start gap-8" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="text-[30px] font-medium tracking-[-0.02em] text-[#17232B] hover:text-[#35434B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17232B]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              onCloseMenu();
              onSelectPanel('contact');
            }}
            className="text-[30px] font-medium tracking-[-0.02em] text-[#17232B] underline underline-offset-4 decoration-[#17232B]/50 hover:text-[#35434B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17232B]"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </>
  );
}
