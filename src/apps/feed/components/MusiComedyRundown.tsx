import { Fragment, type RefObject } from 'react';
import { Globe, Instagram } from 'lucide-react';
import logoAsset from '@/assets/musicomedy-night-logo.png.asset.json';
import { MusiComedyDokumentasi } from './MusiComedyDokumentasi';
import { MusiComedySapaan } from './MusiComedySapaan';

// MusiComedy Night rundown — A5 landscape paper sheet (210×148 mm) in the slide 31–33 palette.
// Times are anchored to the adzan schedule the owner gave for 4 Nov 2026:
// Ashar 14.49 · Maghrib 17.47 · Isya 18.56 WIB.
export type RundownKind = 'show' | 'pray';

export const musicomedyRundown: {
  time: string;
  title: string;
  note?: string;
  kind?: RundownKind;
}[] = [
  { time: '15.00 – 16.55', title: 'Gerbang dibuka · tamu datang', note: 'setelah Ashar (14.49)' },
  { time: '17.00 – 17.40', title: 'Solo Vokal (Sesi 1)', note: 'Berlin' },
  { time: '17.47', title: 'Maghrib · jeda salat', note: 'adzan 17.47', kind: 'pray' },
  { time: '18.10 – 18.50', title: 'Solo Vokal (Sesi 2)', note: 'Berlin' },
  { time: '18.56', title: 'Isya · jeda salat', note: 'adzan 18.56', kind: 'pray' },
  { time: '19.20 – 19.30', title: 'Opening Bumper', note: 'penanda acara utama' },
  { time: '19.30 – 19.55', title: 'Musik Etnik Pembuka', note: '3–5 lagu' },
  { time: '19.55 – 20.10', title: 'Opening Tari Mojang', note: 'selamat datang tamu' },
  { time: '20.10 – 20.35', title: 'Tari Jaipong', note: 'Melodi' },
  { time: '20.35 – 20.55', title: 'Musik Etnik', note: '2 lagu' },
  { time: '20.55 – 21.40', title: 'Guest Star', note: 'Saduli Ragap' },
  { time: '21.40 – 22.10', title: 'Pencungan' },
  { time: '22.10 – 23.00', title: 'Musik Bebas', note: 'penutup' },
];

// NEMPO's own channels (site footer + src/lib/contact.ts) and Kala Muda — Nempo membawa Kala Muda.
export type SocialIcon = 'instagram' | 'tiktok' | 'web' | 'whatsapp';
export type SocialBrand = 'nempo' | 'kalamuda';

export const rundownSocial: {
  brand: SocialBrand;
  label: string;
  value: string;
  href: string;
  icon: SocialIcon;
}[] = [
  { brand: 'nempo', label: 'Instagram', value: '@nempo.id', href: 'https://instagram.com/nempo.id', icon: 'instagram' },
  { brand: 'nempo', label: 'TikTok', value: '@nempo.id', href: 'https://tiktok.com/@nempo.id', icon: 'tiktok' },
  { brand: 'nempo', label: 'Website', value: 'www.nempogarut.com', href: 'https://www.nempogarut.com', icon: 'web' },
  { brand: 'nempo', label: 'WhatsApp', value: '0857-2498-1356', href: 'https://wa.me/6285724981356', icon: 'whatsapp' },
  { brand: 'kalamuda', label: 'Instagram', value: '@kalamudacom', href: 'https://www.instagram.com/kalamudacom/', icon: 'instagram' },
];

export const rundownBrands: { brand: SocialBrand; name: string }[] = [
  { brand: 'nempo', name: 'NEMPO' },
  { brand: 'kalamuda', name: 'KALA MUDA' },
];

// Brand marks only — no platform names printed on the paper.
function SocialGlyph({ icon }: { icon: SocialIcon }) {
  if (icon === 'instagram') return <Instagram strokeWidth={2.2} />;
  if (icon === 'web') return <Globe strokeWidth={2.2} />;
  if (icon === 'tiktok') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.21 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}



function toMinutes(value: string): number {
  const [h, m] = value.trim().split('.');
  return Number(h) * 60 + Number(m);
}

// Length of a row: its own range, or — for a single adzan time — the gap to the next row.
export function rundownDuration(index: number): number {
  const row = musicomedyRundown[index];
  if (!row) return 0;
  const [from, to] = row.time.split('–');
  const start = toMinutes(from);
  if (to) return toMinutes(to) - start;
  const next = musicomedyRundown[index + 1];
  return next ? toMinutes(next.time.split('–')[0]) - start : 0;
}

export function MusiComedyRundown({ exportRef }: { exportRef: RefObject<HTMLElement | null> }) {
  let no = 0;
  return (
    <div className="mc-pages">
      <span className="mc-page-tag">Halaman 1 · Rundown acara</span>
      <main
        ref={exportRef}
        className="mc-a5 relative w-[min(96vw,1100px)] overflow-hidden"
        style={{ aspectRatio: '210 / 148', fontFamily: "'DM Sans', 'Inter', sans-serif" }}
        aria-label="Rundown MusiComedy Night"
      >
      <header className="mc-a5-head">
        <img src={logoAsset.url} alt="MusiComedy Night" className="mc-a5-logo" />
        <div className="mc-a5-title">
          <b>RUNDOWN ACARA</b>
          <span>MusiComedy Night</span>
        </div>
        <div className="mc-a5-info">
          <b>Rabu, 4 November 2026</b>
          <span>Good Story Cafe, Jl. Sudirman Copong No. 11</span>
          <span>15.00 – 23.00 WIB</span>
          <span className="mc-a5-anchor">Patokan adzan: Ashar 14.49 · Maghrib 17.47 · Isya 18.56</span>
        </div>
      </header>
      <table className="mc-a5-table">
        <thead>
          <tr><th>No</th><th>Waktu</th><th>Acara</th><th>Menit</th><th>Keterangan</th></tr>
        </thead>
        <tbody>
          {musicomedyRundown.map((item, i) => {
            const pray = item.kind === 'pray';
            if (!pray) no += 1;
            return (
              <tr
                key={i}
                className={pray ? 'is-pray' : item.title === 'Guest Star' ? 'is-star' : undefined}
              >
                <td>{pray ? '•' : String(no).padStart(2, '0')}</td>
                <td>{item.time}</td>
                <td>{item.title}</td>
                <td>{rundownDuration(i)} menit</td>
                <td>{item.note ?? ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mc-a5-social">
        {rundownBrands.map((b, i) => (
          <Fragment key={b.brand}>
            {i > 0 && <span className="mc-a5-social-sep" aria-hidden="true" />}
            <div className="mc-a5-social-group">
              <b className="mc-a5-social-brand">{b.name}</b>
              <div className="mc-a5-social-pills">
                {rundownSocial
                  .filter((s) => s.brand === b.brand)
                  .map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mc-a5-pill"
                      title={`${s.label} ${s.value}`}
                      aria-label={`${s.label} ${s.value}`}
                    >
                      <SocialGlyph icon={s.icon} />
                      <span>{s.value}</span>
                    </a>
                  ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <footer className="mc-a5-foot">
        <span>NEMPO GARUT × Kala Muda × Good Story Cafe</span>
        <span>Jam dapat maju/mundur ±10 menit</span>
      </footer>
      </main>
      <span className="mc-page-tag">Halaman 2 · Acuan sapaan penerima tamu</span>
      <MusiComedySapaan />
      <span className="mc-page-tag">Halaman 3 · Acuan dokumentasi foto &amp; video</span>
      <MusiComedyDokumentasi />
    </div>
  );
}
