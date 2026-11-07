import type { RefObject } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import salonPhoto from '@/assets/ggs-open-hours-hair-sweep.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsContactSlide.css';

const CHANNELS = [
  { icon: FaWhatsapp, label: 'WhatsApp', value: '0823-4277-7723', note: 'Booking & tanya layanan' },
  { icon: FaInstagram, label: 'Instagram', value: '@ggsbeauty.hair.co', note: 'DM, promo & hasil karya' },
];

/** GGS Feed slide 24: customer service channels (WhatsApp + social media). */
export function GgsContactSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggx-root"
      aria-label="GGS Beauty — layanan pelanggan lewat WhatsApp dan Instagram"
    >
      <img className="ggx-photo" src={salonPhoto} alt="" aria-hidden="true" />
      <div className="ggx-shade" />
      <section className="ggx-copy">
        <p className="ggx-kicker">Layanan pelanggan</p>
        <h2 className="ggx-title">Ada pertanyaan?<br />Chat kami aja</h2>
        <ul className="ggx-list">
          {CHANNELS.map(({ icon: Icon, label, value, note }) => (
            <li key={label} className="ggx-card">
              <span className="ggx-icon"><Icon aria-hidden="true" /></span>
              <span className="ggx-text">
                <strong>{value}</strong>
                <small>{label} · {note}</small>
              </span>
            </li>
          ))}
        </ul>
        <p className="ggx-hours">Fast response · 09.00 – 21.00 setiap hari</p>
      </section>
      <img className="ggx-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
