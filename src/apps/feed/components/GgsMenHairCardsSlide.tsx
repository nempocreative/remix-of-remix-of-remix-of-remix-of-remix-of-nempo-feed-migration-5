import type { RefObject } from 'react';
import crop from '@/assets/ggs-men-textured-crop.jpg';
import pompadour from '@/assets/ggs-men-pompadour.jpg';
import twoBlock from '@/assets/ggs-men-two-block.jpg';
import mullet from '@/assets/ggs-men-modern-mullet.jpg';
import buzz from '@/assets/ggs-men-buzz-cut.jpg';
import overlay from '@/assets/ggs-men-header-footer.png.asset.json';
import { GgsNailCardsSlide, type DesignCard } from './GgsNailCardsSlide';

const MEN_CARDS: DesignCard[] = [
  { name: 'Textured Crop', note: 'Tekstur natural dengan low taper yang rapi.', photo: crop },
  { name: 'Pompadour Fade', note: 'Volume klasik, sisi bersih dan modern.', photo: pompadour },
  { name: 'Two Block', note: 'Poni belah tengah untuk tampilan effortless.', photo: twoBlock },
  { name: 'Modern Mullet', note: 'Karakter tegas dengan burst fade.', photo: mullet },
  { name: 'Buzz Cut', note: 'Pendek, bersih, dan praktis setiap hari.', photo: buzz },
];

export function GgsMenHairCardsSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return <GgsNailCardsSlide exportRef={exportRef} cards={MEN_CARDS}
    title={<>Pilih Model Rambut <em>Cowok</em></>}
    finalNote="Tunjukkan pilihanmu ke barber saat booking."
    label="Pilihan rambut cowok" slideNumber={1} overlay={overlay.url} theme="men" />;
}