import type { RefObject } from 'react';
import wolfPhoto from '@/assets/ggs-hair-card-wolfcut.jpg';
import balayagePhoto from '@/assets/ggs-hair-card-balayage.jpg';
import bobPhoto from '@/assets/ggs-hair-card-bob.jpg';
import butterflyPhoto from '@/assets/ggs-hair-card-butterfly.jpg';
import hushPhoto from '@/assets/ggs-hair-card-hushcut.jpg';
import { GgsNailCardsSlide, type DesignCard } from './GgsNailCardsSlide';

const HAIR_CARDS: DesignCard[] = [
  { name: 'Layered Wolf Cut', note: 'Berlapis dengan poni tirai yang edgy', photo: wolfPhoto },
  { name: 'Soft Balayage', note: 'Gelombang panjang dengan gradasi cokelat', photo: balayagePhoto },
  { name: 'Sleek Bob', note: 'Pendek rapi dan berkilau', photo: bobPhoto },
  { name: 'Butterfly Cut', note: 'Layer bervolume yang membingkai wajah', photo: butterflyPhoto },
  { name: 'Hush Cut', note: 'Shaggy pendek dengan poni tipis', photo: hushPhoto },
];

/** GGS Feed slide 22 (3:4 video): women's hairstyle cards in the same carousel as slide 21. */
export function GgsHairCardsSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <GgsNailCardsSlide
      exportRef={exportRef}
      cards={HAIR_CARDS}
      title={<>Pilih Model Rambut <em>Kerenmu</em></>}
      finalNote="Tunjukkan pilihanmu ke stylist saat booking."
      label="Pilih model rambut kerenmu"
      slideNumber={22}
    />
  );
}
