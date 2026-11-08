import type { RefObject } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import barberPhoto from '@/assets/ggs-men-contact-barber.jpg';
import overlay from '@/assets/ggs-men-header-footer.png.asset.json';
import './GgsMenContactSlide.css';

const CHANNELS = [
  { icon: FaWhatsapp, label: 'WhatsApp', value: '0813-3335-9200' },
  { icon: FaInstagram, label: 'Instagram', value: '@hairstudio.ggs.grt' },
];

/** GGS Cowok slide 2: customer service channels (WhatsApp + Instagram) over a barbershop photo. */
export function GgsMenContactSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  return (
    <div className="w-full max-w-[430px]">
      <div
        ref={exportRef as RefObject<HTMLDivElement | null>}
        className="ggmx-root"
        role="img"
        aria-label="GGS Barber Hairstudio — layanan pelanggan lewat WhatsApp 0813-3335-9200 dan Instagram @hairstudio.ggs.grt"
      >
        <img className="ggmx-photo" src={barberPhoto} alt="" width={1440} height={1920} />
        <div className="ggmx-shade" />
        <section className="ggmx-copy" aria-hidden="true">
          <p className="ggmx-kicker">Customer Service</p>
          <h2 className="ggmx-title">
            Butuh bantuan? <em>Kami siap balas</em>
          </h2>
          <ul className="ggmx-list">
            {CHANNELS.map(({ icon: Icon, label, value }) => (
              <li key={label} className="ggmx-card">
                <span className="ggmx-icon"><Icon aria-hidden="true" /></span>
                <span className="ggmx-text">
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
              </li>
            ))}
          </ul>
          <div className="ggmx-hours">
            <p><span>Senin – Kamis</span> 10.00 – 22.00</p>
            <p><span>Jumat – Minggu</span> 08.00 – 22.00</p>
          </div>
        </section>
        <img className="ggmx-watermark" src={overlay.url} alt="" draggable={false} />
      </div>
    </div>
  );
}
