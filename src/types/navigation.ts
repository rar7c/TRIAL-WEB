export type PageId = 'home' | 'customize' | 'exclusives' | 'drop-preview';

export type PanelId =
  | 'collections'
  | 'about'
  | 'new-arrivals'
  | 'shop-all'
  | 'contact';

export interface HeroButtonConfig {
  id: string;
  label: string;
  onClick: () => void;
}
