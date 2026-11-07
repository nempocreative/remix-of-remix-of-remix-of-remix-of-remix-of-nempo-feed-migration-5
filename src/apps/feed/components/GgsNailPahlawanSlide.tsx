import type { RefObject } from 'react';
import nailPhoto from '@/assets/ggs-nail-pahlawan.jpg';
import ggsWatermark from '@/assets/ggs-header-footer.png.asset.json';
import './GgsNailPahlawanSlide.css';

/** GGS Feed slide 9: static photo slide (same header/footer as slide 8) — Hari Pahlawan nail art promo; exports as PNG. */
export function GgsNailPahlawanSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div ref={exportRef as RefObject<HTMLDivElement | null>} className="ggn-root">
      <img className="ggn-photo" src={nailPhoto} alt="Kuku nail art merah putih" />
      <div className="ggn-shade" />
      <section className="ggn-copy">
        <p className="ggn-kicker">
          <span className="ggn-flag" aria-hidden="true" />
          Sebentar lagi · 10 November
        </p>
        <h2 className="ggn-title">
          Nail Art <em>Hari Pahlawan</em>
        </h2>
        <p className="ggn-sub">Merah putih di ujung jari.</p>
      </section>
      <section className="ggn-price">
        <p className="ggn-price-label">Promo Nail Art Polos</p>
        <p className="ggn-price-value">
          <small>Rp</small>35.000
        </p>
      </section>
      <img className="ggn-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
