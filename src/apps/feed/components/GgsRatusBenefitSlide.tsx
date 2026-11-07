import type { RefObject } from 'react';
import ratusScene from '@/assets/ggs-ratus-scene.jpg';
import ggsWatermark from '@/assets/ggs-header-footer.png.asset.json';
import './GgsRatusBenefitSlide.css';

const BENEFITS = [
  ['Mengurangi bau tak sedap', 'Area kewanitaan terasa segar & wangi alami.'],
  ['Menghangatkan & merilekskan', 'Uap rempah bikin badan lebih santai.'],
  ['Melancarkan peredaran darah', 'Bantu kurangi pegal setelah haid.'],
  ['Merawat setelah melahirkan', 'Perawatan tradisional turun-temurun.'],
];

/** GGS Feed slide 8: static photo slide (no animation) about ratus benefits; exports as PNG. */
export function GgsRatusBenefitSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div ref={exportRef as RefObject<HTMLDivElement | null>} className="ggb-root">
      <img className="ggb-photo" src={ratusScene} alt="Bangku ratus dengan tungku tanah liat" />
      <div className="ggb-shade" />
      <section className="ggb-copy">
        <p className="ggb-kicker">Kenapa harus ratus?</p>
        <h2 className="ggb-title">Manfaat <em>Ratus</em></h2>
        <ol className="ggb-list">
          {BENEFITS.map(([t, d], i) => (
            <li key={t}>
              <span className="ggb-num">{i + 1}</span>
              <div><strong>{t}</strong><span>{d}</span></div>
            </li>
          ))}
        </ol>
        <p className="ggb-price">Promo <s>50.000</s> <b>45.000</b></p>
      </section>
      <img className="ggb-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
