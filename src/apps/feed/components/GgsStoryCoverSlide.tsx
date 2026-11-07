import type { RefObject } from 'react';
import kidPhoto from '@/assets/ggs-story-kid-nails.jpg';
import storyOverlay from '@/assets/ggs-story-header-footer.png.asset.json';
import './GgsStoryCoverSlide.css';

/**
 * GGS Story slides 04 and 05: reels-size (9:16) cover with the owner's story
 * header/footer overlay. `centered` (slide 05) keeps the photo and headline
 * inside the middle 1080×1440 band so it still works as an Instagram feed
 * cover crop.
 */
export function GgsStoryCoverSlide({
  exportRef,
  centered = false,
}: {
  exportRef?: RefObject<HTMLElement | null>;
  centered?: boolean;
}) {
  return (
    <main
      ref={exportRef as RefObject<HTMLElement | null>}
      aria-label={`GGS Beauty — Story slide ${centered ? '05' : '04'}, peduli penampilan dari kecil`}
      className={centered ? 'ggc-root ggc-centered' : 'ggc-root'}
    >
      <img
        className="ggc-photo"
        src={kidPhoto}
        alt="Anak memamerkan nail art bunga sambil memegang coaster GGS Studio Beauty"
      />
      <div className="ggc-shade" />
      <section className="ggc-copy">
        <span className="ggc-rule" aria-hidden="true" />
        <h2 className="ggc-title">
          <span>Peduli Penampilan</span>
          <em>dari Kecil</em>
        </h2>
        <span className="ggc-rule" aria-hidden="true" />
      </section>
      <img className="ggc-overlay" src={storyOverlay.url} alt="" aria-hidden="true" />
    </main>
  );
}
