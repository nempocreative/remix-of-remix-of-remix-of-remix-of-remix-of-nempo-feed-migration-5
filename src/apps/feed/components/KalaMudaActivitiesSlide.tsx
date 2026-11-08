import type { RefObject } from 'react';
import dancePhoto from '@/assets/nempo-kalamuda-tari.webp.asset.json';
import musicPhoto from '@/assets/nempo-kalamuda-akustik.webp.asset.json';
import podcastPhoto from '@/assets/nempo-kalamuda-podcast.webp.asset.json';
import { NempoFooter, NempoHeader } from './KalaMudaRecruitSlide';
import './KalaMudaRecruitSlide.css';
import './KalaMudaActivitiesSlide.css';

export function KalaMudaActivitiesSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div className="w-full max-w-[430px]">
      <div ref={exportRef as RefObject<HTMLDivElement | null>} className="kmr-root kmt-root kma-root">
        <NempoHeader badge="KEGIATAN KALA MUDA" />
        <h2 className="kma-title">Bukan cuma gabung, <span>ikut berkarya.</span></h2>
        <div className="kma-photo"><img src={dancePhoto.url} alt="Penampilan tari di MusiComedy Night" crossOrigin="anonymous" /></div>
        <div className="kma-strip">
          <div className="kma-detail"><img src={podcastPhoto.url} alt="Rekaman podcast malam Kala Muda" crossOrigin="anonymous" /></div>
          <div className="kma-detail"><img src={musicPhoto.url} alt="Jamming akustik Kala Muda" crossOrigin="anonymous" /></div>
        </div>
        <p className="kma-caption">Tari di MusiComedy Night · Podcast malam · Jamming akustik</p>
        <NempoFooter />
      </div>
    </div>
  );
}
