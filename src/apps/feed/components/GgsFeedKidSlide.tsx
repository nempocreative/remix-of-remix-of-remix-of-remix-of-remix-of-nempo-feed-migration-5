import type { RefObject } from 'react';
import kidPhoto from '@/assets/ggs-story-kid-nails.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsFeedKidSlide.css';

/** GGS Feed slide 20: feed (3:4) version of GGS Story slide 04 — "Peduli Penampilan dari Kecil" with the v2 header/footer; exports as PNG. */
export function GgsFeedKidSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggk-root"
      aria-label="GGS Beauty — Feed slide 20, peduli penampilan dari kecil"
    >
      <img
        className="ggk-photo"
        src={kidPhoto}
        alt="Anak memamerkan nail art bunga sambil memegang coaster GGS Studio Beauty"
      />
      <div className="ggk-shade" />
      <section className="ggk-copy">
        <span className="ggk-rule" aria-hidden="true" />
        <h2 className="ggk-title">
          <span>Peduli Penampilan</span>
          <em>dari Kecil</em>
        </h2>
        <span className="ggk-rule" aria-hidden="true" />
      </section>
      <img className="ggk-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
