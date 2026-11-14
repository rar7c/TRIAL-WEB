import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActionSheet } from './components/ActionSheet';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ScrubVideoBackground } from './components/ScrubVideoBackground';
import { CustomizePage } from './pages/CustomizePage';
import { DropPreviewPage } from './pages/DropPreviewPage';
import { ExclusivesPage } from './pages/ExclusivesPage';
import type { HeroButtonConfig, PageId, PanelId } from './types/navigation';

function getPageFromHash(): PageId {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'customize') return 'customize';
  if (hash === 'exclusives') return 'exclusives';
  if (hash === 'drop-preview') return 'drop-preview';
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromHash());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    setMenuOpen(false);
    setActivePanel(null);
    const nextHash = page === 'home' ? '#top' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      setMenuOpen(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const heroButtons: HeroButtonConfig[] = useMemo(
    () => [
      {
        id: 'customize-clothes',
        label: 'CLOTHING',
        onClick: () => navigateTo('customize'),
      },
      {
        id: 'our-exclusives',
        label: 'GAMING',
        onClick: () => navigateTo('exclusives'),
      },
      {
        id: 'drop-preview',
        label: 'COMING SOON',
        onClick: () => navigateTo('drop-preview'),
      },
    ],
    [navigateTo],
  );

  return (
    <div id="top" className="relative min-h-screen w-full overflow-x-hidden bg-[#8997A0]">
      {currentPage === 'home' && <ScrubVideoBackground />}

      <Navbar
        currentPage={currentPage}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onNavigate={navigateTo}
        onSelectPanel={(id) => setActivePanel(id)}
      />

      {currentPage === 'home' && <HeroSection buttons={heroButtons} />}
      {currentPage === 'customize' && (
        <CustomizePage
          onNavigate={navigateTo}
          onOpenPanel={(panel) => setActivePanel(panel)}
        />
      )}
      {currentPage === 'exclusives' && (
        <ExclusivesPage
          onNavigate={navigateTo}
          onOpenPanel={(panel) => setActivePanel(panel)}
        />
      )}
      {currentPage === 'drop-preview' && (
        <DropPreviewPage
          onNavigate={navigateTo}
          onOpenPanel={(panel) => setActivePanel(panel)}
        />
      )}

      <ActionSheet
        activePanel={activePanel}
        onClose={() => setActivePanel(null)}
        onNavigate={navigateTo}
        onSelectPanel={(id) => setActivePanel(id)}
      />
    </div>
  );
}
