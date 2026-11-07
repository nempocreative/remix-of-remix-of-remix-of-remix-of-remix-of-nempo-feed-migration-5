import type { RefObject } from 'react';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsServicesSlide.css';

type ServiceGroup = {
  heading?: string;
  items: string[];
};

export type ServicesSlideData = {
  slide: number;
  category: string;
  tagline: string;
  groups: ServiceGroup[];
  /** Tighter rows for the fullest slide so every name fits. */
  dense?: boolean;
};

/**
 * GGS Feed slides 13–18 — daftar nama layanan tanpa harga, diambil dari
 * Price_cetak.pdf. Satu kategori per slide; bila tidak muat, lanjut ke slide
 * berikutnya. Statis seperti slide 9/11, memakai header/footer overlay asli.
 */
export const GGS_SERVICES_SLIDES: ServicesSlideData[] = [
  {
    slide: 13,
    category: 'Nail Art',
    tagline: 'Kuku cantik, percaya diri',
    groups: [
      {
        items: [
          'Press On Nail',
          'Kuku Asli Polos / Glitter',
          'Kuku Asli Motif',
          'Kuku Asli Cat Eye',
          'Kuku Asli Full Cat Eye + Chrome',
          'Fake Nail',
          'Motif',
          'Kuku Palsu Full Cat Eye + Chrome',
          'Motif Sulit',
          'Kuku Asli Kaki',
          'Tambah Aksesoris',
          'Tambah Nail 1 Jari',
          'Remover Nail',
        ],
      },
    ],
  },
  {
    slide: 14,
    category: 'Haircuts & Styling',
    tagline: 'Rambut rapi setiap hari',
    dense: true,
    groups: [
      {
        items: [
          'Cuci Rambut',
          'Cuci Blow',
          'Cuci Catok',
          'Cuci Catok / Curly Rambut Sambung',
          'Cuci Curly',
          'Curly Rambut',
          'Catok Rambut Pendek',
          'Catok Rambut Panjang',
          'Catok Rambut Sambung',
          'Potong Cuci Catok',
          'Potong Cuci Curly',
          'Potong Cuci Blow',
          'Potong Rambut',
          'Potong Poni',
        ],
      },
    ],
  },
  {
    slide: 15,
    category: 'Colouring & Creambath',
    tagline: 'Warna baru, rambut sehat',
    groups: [
      {
        heading: 'Colouring Full Warna',
        items: ['No Bleaching — Pendek · Sedang · Panjang', 'Bleaching — Pendek · Sedang · Panjang'],
      },
      {
        heading: 'Creambath',
        items: ['Creambath Cultusia', 'Creambath CBD', 'Creambath Makarizo', "Creambath L'Oréal", "Creambath L'Oréal Warna"],
      },
    ],
  },
  {
    slide: 16,
    category: 'Hair Treatment & Keratin',
    tagline: 'Perawatan sampai ke akar',
    groups: [
      {
        heading: 'Hair Treatment',
        items: ['Treatment Ketombe', 'Treatment Kutu Anak (1–5 th)', 'Treatment Kutu Dewasa', 'Treatment Rambut Bercabang', 'Masker'],
      },
      {
        heading: 'Keratin & Highlight',
        items: [
          'Keratin Treatment — Pendek · Sedang · Panjang',
          'Keratin Smoothing — Pendek · Sedang · Panjang',
          'Colouring Highlight — Pendek · Sedang · Panjang',
        ],
      },
    ],
  },
  {
    slide: 17,
    category: 'Massage, Body & Face',
    tagline: 'Rileks dari ujung kepala sampai kaki',
    dense: true,
    groups: [
      {
        heading: 'Massage',
        items: ['Full Body Massage 60 Menit', 'Full Body Massage 90 Menit', 'Reflexion 60 Menit', 'Pijat Urut Tradisional Khusus Pria'],
      },
      {
        heading: 'Body & Face',
        items: ['Ratus', 'Waxing Ketiak', 'Masker Ketiak', 'Lulur + Masker Badan', 'Totok Wajah + Masker 45 Menit'],
      },
      {
        heading: 'MeniPedi',
        items: ['MeniPedi', 'Menicure', 'Pedicure'],
      },
    ],
  },
  {
    slide: 18,
    category: 'Bundling Package',
    tagline: 'Lebih lengkap, lebih hemat',
    dense: true,
    groups: [
      {
        items: [
          'Body Massage + Reflexy · 90 menit',
          'Body Massage + Kerok · 90 menit',
          'Body Massage + Scrub + Masker Badan · 120 menit',
          'Body Massage + Totok Wajah · 90 menit',
          'Body Massage + Reflexy + Scrub · 120 menit',
          'Body Massage + Reflexy + Totok Wajah · 120 menit',
          'Body Massage + Reflexy + Kerok · 120 menit',
        ],
      },
    ],
  },
];

export function GgsServicesSlide({ exportRef, data }: { exportRef?: RefObject<HTMLElement | null>; data: ServicesSlideData }) {
  let index = 0;
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className={data.dense ? 'ggsv-root ggsv-root--dense' : 'ggsv-root'}
      role="img"
      aria-label={`GGS Beauty layanan ${data.category}: ${data.groups.flatMap((g) => g.items).join(', ')}.`}
    >
      <div className="ggsv-bg" aria-hidden="true">
        <i className="ggsv-blob ggsv-blob--1" />
        <i className="ggsv-blob ggsv-blob--2" />
        <i className="ggsv-blob ggsv-blob--3" />
      </div>

      <header className="ggsv-head" aria-hidden="true">
        <h2 className="ggsv-title">
          Layanan <em>Kami</em>
        </h2>
        <p className="ggsv-category">
          <span className="ggsv-category-name">{data.category}</span>
          <span className="ggsv-category-tagline">{data.tagline}</span>
        </p>
      </header>

      <section className="ggsv-card" aria-hidden="true">
        {data.groups.map((group) => (
          <div key={group.heading ?? 'main'} className="ggsv-group">
            {group.heading && <h3 className="ggsv-group-heading">{group.heading}</h3>}
            <ul className="ggsv-list">
              {group.items.map((item) => {
                index += 1;
                return (
                  <li key={item} className="ggsv-item">
                    <span className="ggsv-index">{String(index).padStart(2, '0')}</span>
                    <span className="ggsv-name">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <img className="ggsv-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" draggable={false} />
    </div>
  );
}
