import type { RefObject } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import pedicurePhoto from '@/assets/ggs-contact-pedicure.jpg';
import ggsWatermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsContactSlide.css';

const CHANNELS = [
  { icon: FaWhatsapp, label: 'WhatsApp', value: '0823-4277-7723' },
  { icon: FaInstagram, label: 'Instagram', value: '@ggsbeauty.hair.co' },
];

/** GGS Feed slide 24: customer service channels (WhatsApp + social media) over pedicure photo. */
export function GgsContactSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div
      ref={exportRef as RefObject<HTMLDivElement | null>}
      className="ggx-root"
      aria-label="GGS Beauty — layanan pelanggan lewat WhatsApp dan Instagram"
    >
      <img className="ggx-photo" src={pedicurePhoto} alt="" aria-hidden="true" />
      <div className="ggx-shade" />
      <section className="ggx-copy">
        <p className="ggx-kicker">Customer Service</p>
        <h2 className="ggx-title">
          Butuh bantuan? <em>Kami siap balas</em>
        </h2>
        <ul className="ggx-list">
          {CHANNELS.map(({ icon: Icon, label, value }) => (
            <li key={label} className="ggx-card">
              <span className="ggx-icon"><Icon aria-hidden="true" /></span>
              <span className="ggx-text">
                <small>{label}</small>
                <strong>{value}</strong>
              </span>
            </li>
          ))}
        </ul>
        <p className="ggx-hours">Setiap hari · 09.00 – 21.00</p>
      </section>
      <img className="ggx-watermark" src={ggsWatermark.url} alt="" aria-hidden="true" />
    </div>
  );
}
