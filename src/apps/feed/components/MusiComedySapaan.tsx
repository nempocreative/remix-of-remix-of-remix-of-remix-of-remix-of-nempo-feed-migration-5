import logoAsset from '@/assets/musicomedy-night-logo.png.asset.json';

// Rundown page 2 — greeting reference for the reception team (penerima tamu).
// The wording is a draft for the owner to adjust; every fact inside it (times, venue,
// WhatsApp, handles) is the same one used on page 1 and on the site.

export type GreetingCard = { label: string; lines: string[]; note: string; accent?: boolean };

export const rundownGreeting: GreetingCard[] = [
  {
    label: 'Tamu datang · gerbang 15.00',
    lines: [
      'Halo Kak, sebelumnya sudah reservasi? Untuk berapa orang, ya?',
      'Baik, untuk mengambil nomor meja nanti Kakak bisa langsung order dulu di kasir ya, Kak.',
      'Terima kasih, selamat menikmati acara hari ini ya.',
    ],
    note: 'Senyum, sapa, lalu arahkan ke kasir.',
  },
  {
    label: 'Kalau sudah reservasi',
    lines: [
      'Baik, kami cek dulu ya.',
      'Sudah tercatat atas nama … — boleh masuk Kak, dan nanti akan diarahkan tim kami di dalam ya.',
      'Terima kasih, selamat menikmati acara hari ini ya.',
    ],
    note: 'Sebut nama tamu saat mengantar, jangan ditinggal.',
  },
  {
    label: 'Tamu pulang',
    lines: [
      'Terima kasih sudah hadir ya, Kak.',
      'Jangan lupa follow @nempo.id dan @kalamudacom untuk info event selanjutnya.',
    ],
    note: 'Antar sampai pintu, jangan hanya dari jauh.',
  },
];

export const rundownGreetingAnchor = 'Patokan adzan: Ashar 14.49 · Maghrib 17.47 · Isya 18.56';

export const rundownGreetingRules: string[] = [
  'Selalu sebut nama acara: MusiComedy Night.',
  'Jangan menjanjikan kursi, makanan, atau jam yang belum pasti.',
  'Jam acara bisa maju/mundur ±10 menit.',
  'Ragu? Hubungi PIC: WhatsApp 0857-2498-1356.',
];

export function MusiComedySapaan() {
  return (
    <main
      className="mc-a5 mc-sapaan relative w-[min(96vw,1100px)] overflow-hidden"
      style={{ aspectRatio: '210 / 148', fontFamily: "'DM Sans', 'Inter', sans-serif" }}
      aria-label="Acuan sapaan penerima tamu MusiComedy Night"
    >
      <header className="mc-a5-head">
        <img src={logoAsset.url} alt="MusiComedy Night" className="mc-a5-logo" />
        <div className="mc-a5-title">
          <span className="mc-a5-kicker">Halaman 2</span>
          <b>ACUAN SAPAAN</b>
          <span>Penerima Tamu · MusiComedy Night</span>
        </div>
        <div className="mc-a5-info">
          <b>Rabu, 4 November 2026</b>
          <span>Good Story Cafe, Jl. Sudirman Copong No. 11</span>
          <span>Gerbang 15.00 · acara 19.20 · selesai 23.00 WIB</span>
          <span className="mc-a5-anchor">{rundownGreetingAnchor}</span>
        </div>
      </header>

      <div className="mc-sapaan-grid">
        {rundownGreeting.map((card) => (
          <section key={card.label} className={'mc-sapaan-card' + (card.accent ? ' is-key' : '')}>
            <h2>{card.label}</h2>
            <ul>
              {card.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mc-sapaan-note">{card.note}</p>
          </section>
        ))}
      </div>

      <div className="mc-sapaan-rules">
        {rundownGreetingRules.map((rule) => (
          <span key={rule}>{rule}</span>
        ))}
      </div>

      <footer className="mc-a5-foot">
        <span>NEMPO GARUT × Kala Muda × Good Story Cafe</span>
        <span>Halaman 2 dari 3 · acuan sapaan penerima tamu</span>
      </footer>
    </main>
  );
}
