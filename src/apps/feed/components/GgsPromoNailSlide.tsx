import type { RefObject } from 'react';
import nailPhoto from '@/assets/ggs-promo-nail-art-photo.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsPromoNailSlide.css';

/** GGS Feed slide 25: nail art promo price card over the retouched studio nail photo. */
export function GgsPromoNailSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggpn-root"
      aria-label="GGS Beauty — promo nail art mulai Rp 35.000"
    >
      <img className="ggpn-photo" src={nailPhoto} alt="" aria-hidden="true" />
      <div className="ggpn-shade" />
      <section className="ggpn-card">
        <p className="ggpn-kicker">Promo</p>
        <h2 className="ggpn-title">
          Nail <em>Art</em>
        </h2>
        <div className="ggpn-rule" aria-hidden="true" />
        <p className="ggpn-start">Start</p>
        <p className="ggpn-price">
          <small>Rp</small>
          <strong>35.000</strong>
        </p>
      </section>
      <img className="ggpn-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
