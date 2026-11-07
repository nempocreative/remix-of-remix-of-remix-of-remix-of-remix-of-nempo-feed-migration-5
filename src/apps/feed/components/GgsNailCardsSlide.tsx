import { useEffect, useState, type ReactNode, type RefObject } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import frenchPhoto from '@/assets/ggs-nail-card-french.jpg';
import floralPhoto from '@/assets/ggs-nail-card-floral.jpg';
import chromePhoto from '@/assets/ggs-nail-card-chrome.jpg';
import catEyePhoto from '@/assets/ggs-nail-card-cateye.jpg';
import ombrePhoto from '@/assets/ggs-nail-card-ombre.jpg';
import watermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import { buildNailCardsCss, NAIL_CARDS_DURATION } from './ggs-nail-cards-timeline';
import './GgsNailCardsSlide.css';

export type DesignCard = { name: string; note: string; photo: string };

const NAIL_CARDS: DesignCard[] = [
  { name: 'French Tip', note: 'Klasik dan rapi untuk setiap hari', photo: frenchPhoto },
  { name: 'Floral Pastel', note: 'Lukisan bunga mungil yang manis', photo: floralPhoto },
  { name: 'Pearl Chrome', note: 'Kilau mutiara yang lembut', photo: chromePhoto },
  { name: 'Cat Eye Burgundy', note: 'Kilau magnetik untuk tampil elegan', photo: catEyePhoto },
  { name: 'Ombre Crystal', note: 'Gradasi lembut dengan aksen kristal', photo: ombrePhoto },
];
const DECK_CSS = buildNailCardsCss();

type Props = {
  exportRef?: RefObject<HTMLElement | null>;
  cards?: DesignCard[];
  title?: ReactNode;
  finalNote?: string;
  label?: string;
  slideNumber?: number;
  overlay?: string;
  theme?: 'beauty' | 'men';
};

/** GGS Feed 3:4 video: design cards glide through a carousel, then fan out. Defaults = slide 21 (nail art). */
export function GgsNailCardsSlide({
  exportRef,
  cards = NAIL_CARDS,
  title = <>Pilih Nail Art <em>Favoritmu</em></>,
  finalNote = 'Tinggal pilih, sebut namanya saat booking.',
  label = 'Pilih nail art favoritmu',
  slideNumber = 21,
  overlay = watermark.url,
  theme = 'beauty',
}: Props) {
  const CARDS = cards;
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return (
    <div className="w-full max-w-[430px]">
      <style>{DECK_CSS}</style>
      <div className="ggn-controls">
        <Button size="icon" variant="outline" aria-label={paused ? `Putar slide ${slideNumber}` : `Jeda slide ${slideNumber}`} title={paused ? 'Putar' : 'Jeda'} onClick={() => { setReduced(false); setPaused(!paused); }}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </Button>
        <Button size="icon" variant="outline" aria-label={`Ulangi slide ${slideNumber}`} title="Ulangi" onClick={() => { setReplayKey((key) => key + 1); setReduced(false); setPaused(false); }}>
          <RotateCcw size={16} />
        </Button>
      </div>
      <div
        key={replayKey}
        ref={exportRef as RefObject<HTMLDivElement | null>}
        className={`ggn-root${theme === 'men' ? ' ggn-men' : ''}${paused ? ' is-paused' : ''}${reduced ? ' is-reduced' : ''}`}
        data-duration={NAIL_CARDS_DURATION}
        role="img"
        aria-label={`GGS Beauty — ${label}: ${CARDS.map((card) => card.name).join(', ')}.`}
      >
        <div className="ggn-glow" aria-hidden="true" />
        <h2 className="ggn-title" aria-hidden="true">{title}</h2>
        <div className="ggn-stage" aria-hidden="true">
          {CARDS.map((card, i) => (
            <figure key={card.name} className="ggn-card" data-i={i}>
              <div className="ggn-photo">
                <img src={card.photo} alt="" width={768} height={1024} draggable={false} />
                <span className="ggn-sheen" />
              </div>
              <figcaption>
                <span className="ggn-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ggn-name">{card.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="ggn-notes" aria-hidden="true">
          {CARDS.map((card, i) => (
            <p key={card.name} className="ggn-note" data-i={i}>{card.note}</p>
          ))}
          <p className="ggn-note ggn-final">{finalNote}</p>
        </div>
        <div className="ggn-dots" aria-hidden="true">
          {CARDS.map((card, i) => <span key={card.name} className="ggn-dot" data-i={i} />)}
        </div>
        <img className="ggn-watermark" src={overlay} alt="" draggable={false} />
      </div>
    </div>
  );
}
