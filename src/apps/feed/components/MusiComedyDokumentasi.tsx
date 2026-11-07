import logoAsset from '@/assets/musicomedy-night-logo.png.asset.json';

// Rundown page 3 — photo & video reference for the documentation team.
// The wording is a draft for the owner to adjust; every fact inside it (times, venue,
// performers, WhatsApp, handles) is the same one used on pages 1–2 and on the site.
// Photo notes and video notes are kept in separate columns so each crew reads its own.

export type DocCard = { label: string; lines: string[]; note?: string };
export type DocGroup = { medium: string; cards: DocCard[] };

export const rundownDocGroups: DocGroup[] = [
  {
    medium: 'Foto',
    cards: [
      {
        label: 'Sebelum acara · 15.00 – 19.00',
        lines: [
          'Foto venue, banner, dan meja kasir saat masih kosong.',
          'Foto kursi, dekor, dan papan nama acara.',
        ],
      },
      {
        label: 'Saat pertunjukan · 19.20 – 23.00',
        lines: [
          'Foto dari sisi panggung, jangan dari tengah penonton.',
          'Ambil reaksi penonton saat tepuk tangan.',
        ],
      },
      {
        label: 'Detail & momen lucu',
        lines: [
          'Ambil wajah dari jarak dekat: ekspresi, tangan, dan kaki.',
          'Ambil pandangan jauh: panggung dan ruangan sekaligus.',
          'Kejar momen lucu saat pemain dan penonton tertawa spontan.',
        ],
      },
      {
        label: 'Wajib kepotret',
        lines: [
          'Solo Vokal · Berlin, Musik Etnik, dan Opening Tari Mojang.',
          'Tari Jaipong · Melodi dan Guest Star · Saduli Ragap.',
          'Pencungan serta suasana ruangan saat penuh.',
        ],
      },
    ],
  },
  {
    medium: 'Video',
    cards: [
      {
        label: 'Sebelum acara · 15.00 – 19.00',
        lines: ['Rekam suasana gerbang dibuka dan tamu pertama datang.'],
      },
      {
        label: 'Saat pertunjukan · 19.20 – 23.00',
        lines: [
          'Rekam satu video utuh untuk tiap sesi, jangan dipotong-potong.',
          'Rekam suara suasana ±30 detik untuk latar video.',
        ],
      },
      {
        label: 'Detail & momen lucu',
        lines: [
          'Rekam wajah dari jarak dekat: ekspresi dan tangan pemain.',
          'Rekam pandangan jauh: panggung dan ruangan sekaligus.',
          'Rekam momen lucu saat pemain dan penonton tertawa spontan.',
        ],
      },
      {
        label: 'Video pendek · reels & story',
        lines: [
          'Tiap sesi ambil 10–15 detik: wajah, tangan, suasana.',
          'Tutup dengan papan nama acara dan handle @nempo.id.',
        ],
      },
    ],
  },
];

export const rundownDocShared: DocCard = {
  label: 'Serah terima & unggah',
  lines: [
    'File foto dan video dikumpulkan ke PIC lewat WhatsApp 0857-2498-1356.',
    'Jangan unggah sebelum boleh dari PIC.',
    'Caption menyebut NEMPO GARUT × Kala Muda × Good Story Cafe, @nempo.id, @kalamudacom.',
  ],
};

export const rundownDoc: DocCard[] = [...rundownDocGroups.flatMap((g) => g.cards), rundownDocShared];

export const rundownDocRules: string[] = [
  'Tanpa flash saat pertunjukan berlangsung.',
  'Jangan menghalangi pandangan penonton.',
  'Ragu? Hubungi PIC: WhatsApp 0857-2498-1356.',
];

export function MusiComedyDokumentasi() {
  return (
    <main
      className="mc-a5 mc-doc relative w-[min(96vw,1100px)] overflow-hidden"
      style={{ aspectRatio: '210 / 148', fontFamily: "'DM Sans', 'Inter', sans-serif" }}
      aria-label="Acuan dokumentasi foto dan video MusiComedy Night"
    >
      <header className="mc-a5-head">
        <img src={logoAsset.url} alt="MusiComedy Night" className="mc-a5-logo" />
        <div className="mc-a5-title">
          <b>ACUAN DOKUMENTASI</b>
          <span>Tim Foto &amp; Video · MusiComedy Night</span>
        </div>
        <div className="mc-a5-info">
          <b>Rabu, 4 November 2026</b>
          <span>Good Story Cafe, Jl. Sudirman Copong No. 11</span>
          <span>Gerbang 15.00 · acara 19.20 · selesai 23.00 WIB</span>
        </div>
      </header>

      <div className="mc-doc-cols">
        {rundownDocGroups.map((group) => (
          <section key={group.medium} className="mc-doc-col" aria-label={`Acuan ${group.medium}`}>
            <h2 className="mc-doc-medium">{group.medium}</h2>
            <div className="mc-doc-stack">
              {group.cards.map((card) => (
                <section key={card.label} className="mc-doc-card">
                  <h3>{card.label}</h3>
                  <ul>
                    {card.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {card.note && <p className="mc-doc-note">{card.note}</p>}
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mc-doc-card mc-doc-shared">
        <h3>{rundownDocShared.label}</h3>
        <ul>
          {rundownDocShared.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {rundownDocShared.note && <p className="mc-doc-note">{rundownDocShared.note}</p>}
      </section>

      <div className="mc-doc-rules">
        {rundownDocRules.map((rule) => (
          <span key={rule}>{rule}</span>
        ))}
      </div>

      <footer className="mc-a5-foot">
        <span>NEMPO GARUT × Kala Muda × Good Story Cafe</span>
      </footer>
    </main>
  );
}
