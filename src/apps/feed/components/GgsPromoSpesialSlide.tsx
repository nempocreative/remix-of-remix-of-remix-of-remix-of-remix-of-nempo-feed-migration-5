import type { CSSProperties, RefObject } from 'react';
import promoPhoto from '@/assets/ggs-promo-spesial.jpg';
import stillPhoto from '@/assets/ggs-promo-spesial-still.jpg';
import ggsWatermark from '@/assets/ggs-header-footer.png.asset.json';
import './GgsPromoSpesialSlide.css';

/** Length of one full loop; every phase lasts a quarter of it. */
export const GGS_SLIDE_10_DURATION_SECONDS = 16;

type Promo = {
  tag: string;
  lead: [string, string];
  value: string;
  unit: 'percent' | 'rupiah';
};

/** The four promos, in the order they appear on the card. */
export const GGS_SLIDE_10_PROMOS: Promo[] = [
  { tag: 'Warna · Smoothing · Massage', lead: ['Diskon', 'up to'], value: '30', unit: 'percent' },
  { tag: 'Creambath', lead: ['Diskon', 'all item'], value: '15', unit: 'percent' },
  { tag: 'Nail Art', lead: ['Harga', 'promo'], value: '35.000', unit: 'rupiah' },
  { tag: 'Ratus', lead: ['Harga', 'promo'], value: '45.000', unit: 'rupiah' },
];

const PHASE_SECONDS = GGS_SLIDE_10_DURATION_SECONDS / GGS_SLIDE_10_PROMOS.length;

/** Negative delays keep every phase periodic from t = 0, so the loop (and MP4) has no seam. */
const phaseDelay = (index: number) => (index === 0 ? 0 : index * PHASE_SECONDS - GGS_SLIDE_10_DURATION_SECONDS);

/**
 * GGS Feed slide 10 — Promo Spesial. Same header/footer overlay as slide 9,
 * the owner's photo with a slow zoom, a spinning "up to 30%" badge and a
 * promo card that pushes through the four offers on a 16 s CSS timeline (`ggp-`).
 */
export function GgsPromoSpesialSlide({ exportRef, still = false }: { exportRef?: RefObject<HTMLElement | null>; still?: boolean }) {
  if (still) return <GgsPromoSpesialStill exportRef={exportRef} />;
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggp-root"
      data-duration={GGS_SLIDE_10_DURATION_SECONDS}
      role="img"
      aria-label="GGS Beauty Promo Spesial: Warna, Smoothing, Massage diskon up to 30%. Creambath all item diskon 15%. Nail art Rp35.000. Ratus Rp45.000."
    >
      <div className="ggp-scene" aria-hidden="true">
        <img src={promoPhoto} alt="" draggable={false} />
      </div>
      <div className="ggp-shade" aria-hidden="true" />
      <div className="ggp-glitter" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ '--i': i } as CSSProperties} />
        ))}
      </div>

      <section className="ggp-head" aria-hidden="true">
        <p className="ggp-kicker">
          <span className="ggp-kicker-line" />
          GGS Beauty · Salon &amp; Spa
        </p>
        <h2 className="ggp-title">
          <span className="ggp-title-word ggp-title-word--1">Promo</span>
          <em className="ggp-title-word ggp-title-word--2">Spesial</em>
        </h2>
      </section>

      <div className="ggp-badge" aria-hidden="true">
        <svg className="ggp-badge-ring" viewBox="0 0 200 200">
          <defs>
            <path id="ggp-ring-path" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
          </defs>
          <text>
            <textPath href="#ggp-ring-path" startOffset="0" textLength="486" lengthAdjust="spacing">
              PROMO SPESIAL • GGS BEAUTY • PROMO SPESIAL • GGS BEAUTY •
            </textPath>
          </text>
        </svg>
        <div className="ggp-badge-core">
          <span>up to</span>
          <strong>
            30<small>%</small>
          </strong>
        </div>
      </div>

      <section className="ggp-card" aria-hidden="true">
        <span className="ggp-card-shine" />
        <div className="ggp-phases">
          {GGS_SLIDE_10_PROMOS.map((promo, index) => (
            <div
              key={promo.tag}
              className="ggp-phase"
              style={{ '--d': `${phaseDelay(index)}s` } as CSSProperties}
            >
              <p className="ggp-tag">
                <span className="ggp-index">0{index + 1}</span>
                {promo.tag}
              </p>
              <div className="ggp-row">
                <p className="ggp-lead">
                  {promo.lead[0]}
                  <br />
                  {promo.lead[1]}
                </p>
                <p className="ggp-value">
                  {promo.unit === 'rupiah' && <small className="ggp-rp">Rp</small>}
                  {promo.value}
                  {promo.unit === 'percent' && <small className="ggp-pct">%</small>}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="ggp-progress">
          {GGS_SLIDE_10_PROMOS.map((promo, index) => (
            <span key={promo.tag} style={{ '--d': `${phaseDelay(index)}s` } as CSSProperties}>
              <i />
            </span>
          ))}
        </div>
      </section>

      <img className="ggp-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" draggable={false} />
    </div>
  );
}


/** GGS Feed slide 11 — static version of slide 10 with another photo; all four promos listed at once. */
function GgsPromoSpesialStill({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggp-root ggp-root--still"
      role="img"
      aria-label="GGS Beauty Promo Spesial: Warna, Smoothing, Massage diskon up to 30%. Creambath all item diskon 15%. Nail art Rp35.000. Ratus Rp45.000."
    >
      <div className="ggp-scene" aria-hidden="true">
        <img src={stillPhoto} alt="" draggable={false} />
      </div>
      <div className="ggp-shade" aria-hidden="true" />
      <section className="ggp-head" aria-hidden="true">
        <p className="ggp-kicker">
          <span className="ggp-kicker-line" />
          GGS Beauty · Salon &amp; Spa
        </p>
        <h2 className="ggp-title">
          <span className="ggp-title-word">Promo</span> <em className="ggp-title-word ggp-title-word--2">Spesial</em>
        </h2>
      </section>
      <div className="ggp-badge" aria-hidden="true">
        <svg className="ggp-badge-ring" viewBox="0 0 200 200">
          <defs>
            <path id="ggp-ring-path-still" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
          </defs>
          <text>
            <textPath href="#ggp-ring-path-still" startOffset="0" textLength="486" lengthAdjust="spacing">
              PROMO SPESIAL • GGS BEAUTY • PROMO SPESIAL • GGS BEAUTY •
            </textPath>
          </text>
        </svg>
        <div className="ggp-badge-core">
          <span>up to</span>
          <strong>30<small>%</small></strong>
        </div>
      </div>
      <section className="ggp-card ggp-list" aria-hidden="true">
        {GGS_SLIDE_10_PROMOS.map((promo, index) => (
          <div key={promo.tag} className="ggp-item">
            <p className="ggp-tag">
              <span className="ggp-index">0{index + 1}</span>
              <span className="ggp-item-name">{promo.tag}<small>{promo.lead.join(' ')}</small></span>
            </p>
            <p className="ggp-value">
              {promo.unit === 'rupiah' && <small className="ggp-rp">Rp</small>}
              {promo.value}
              {promo.unit === 'percent' && <small className="ggp-pct">%</small>}
            </p>
          </div>
        ))}
      </section>
      <img className="ggp-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" draggable={false} />
    </div>
  );
}
