import type { RefObject } from 'react';
import frontPhoto from '@/assets/ggs-kid-treatment-front.jpg';
import sidePhoto from '@/assets/ggs-kid-treatment-side.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsKidTreatmentSlide.css';

/** GGS Feed slide 26: kids hair treatment — two retouched photos of the owner's young client in a clean editorial layout. */
export function GgsKidTreatmentSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggkt-root"
      aria-label="GGS Beauty — Feed slide 26, hair treatment anak"
    >
      <section className="ggkt-copy">
        <p className="ggkt-kicker">Kids Hair Treatment</p>
        <h2 className="ggkt-title">
          <span>Rambut Halus,</span>
          <em>Si Kecil Makin Pede</em>
        </h2>
      </section>

      <div className="ggkt-side">
        <p className="ggkt-note">Perawatan lembut untuk rambut anak.</p>
        <ul className="ggkt-points">
          <li>Lembut</li>
          <li>Berkilau</li>
          <li>Mudah diatur</li>
        </ul>
        <img
          className="ggkt-photo-small"
          src={sidePhoto}
          alt="Tampak samping rambut anak yang lembut dan rapi setelah treatment"
        />
      </div>

      <img
        className="ggkt-photo-main"
        src={frontPhoto}
        alt="Anak perempuan tersenyum dengan rambut halus berkilau setelah treatment di GGS Beauty"
      />

      <img className="ggkt-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
