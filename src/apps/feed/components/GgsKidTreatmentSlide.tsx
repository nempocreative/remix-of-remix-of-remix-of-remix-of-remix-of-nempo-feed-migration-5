import type { RefObject } from 'react';
import frontPhoto from '@/assets/ggs-kid-treatment-front.jpg';
import sidePhoto from '@/assets/ggs-kid-treatment-side.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsKidTreatmentSlide.css';

/** GGS Feed slide 26: kids hair treatment — two retouched photos of the owner's young client with headline copy. */
export function GgsKidTreatmentSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggkt-root"
      aria-label="GGS Beauty — Feed slide 26, hair treatment anak"
    >
      <div className="ggkt-glow" aria-hidden="true" />

      <section className="ggkt-copy">
        <p className="ggkt-kicker">Kids Hair Treatment</p>
        <h2 className="ggkt-title">
          <span>Rambut Halus,</span>
          <em>Si Kecil Makin Pede</em>
        </h2>
      </section>

      <p className="ggkt-note">
        Perawatan lembut untuk rambut anak
        <span className="ggkt-note-rule" aria-hidden="true" />
      </p>
      <ul className="ggkt-points">
        <li>Lembut</li>
        <li>Berkilau</li>
        <li>Mudah diatur</li>
      </ul>

      <figure className="ggkt-arch">
        <img src={frontPhoto} alt="Anak perempuan tersenyum dengan rambut halus berkilau setelah treatment di GGS Beauty" />
      </figure>

      <figure className="ggkt-card">
        <img src={sidePhoto} alt="Tampak samping rambut anak yang lembut dan rapi setelah treatment" />
        <figcaption>after treatment ✨</figcaption>
      </figure>

      <div className="ggkt-badge" aria-hidden="true">
        <span>Ramah</span>
        <strong>Anak</strong>
      </div>

      <img className="ggkt-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
