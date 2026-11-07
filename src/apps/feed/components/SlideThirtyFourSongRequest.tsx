import type { CSSProperties } from 'react';

// Slide 34 — "Request lagu" over the shared MusiComedy frame.
// Own content: a rentetan list lagu plus a WhatsApp call to action (owner-supplied songs).
// Slide 33 keeps SlideThirtyThreeReminder untouched (see AGENTS.md).

const songs = ['Jayanti', 'Oncom Gondrong', 'Midua Cinta', 'Emut Bae', 'Gerong Deui'];

// Ambient floaters shared with the slide 33 look (same palette, own layout).
const notes = [
  { glyph: '♪', left: '9%', bottom: '36%', size: 'clamp(18px, 3.4vw, 34px)', delay: '0s', duration: '5.2s' },
  { glyph: '♫', left: '85%', bottom: '44%', size: 'clamp(15px, 2.9vw, 28px)', delay: '1.4s', duration: '5.8s' },
  { glyph: '♪', left: '6%', bottom: '60%', size: 'clamp(13px, 2.4vw, 24px)', delay: '2.6s', duration: '6.4s' },
  { glyph: '♬', left: '89%', bottom: '24%', size: 'clamp(16px, 3vw, 30px)', delay: '3.5s', duration: '5.5s' },
  { glyph: '♪', left: '13%', bottom: '20%', size: 'clamp(12px, 2.2vw, 22px)', delay: '4.3s', duration: '6.1s' },
  { glyph: '♫', left: '30%', bottom: '10%', size: 'clamp(14px, 2.6vw, 26px)', delay: '1.9s', duration: '6.8s' },
  { glyph: '♪', left: '68%', bottom: '8%', size: 'clamp(13px, 2.4vw, 24px)', delay: '3.1s', duration: '7.2s' },
  { glyph: '♬', left: '48%', bottom: '4%', size: 'clamp(15px, 2.8vw, 28px)', delay: '4.9s', duration: '6.5s' },
];

const sparks = [
  { left: '18%', top: '50%', delay: '0s' },
  { left: '80%', top: '28%', delay: '0.7s' },
  { left: '10%', top: '24%', delay: '1.5s' },
  { left: '86%', top: '62%', delay: '2.2s' },
  { left: '50%', top: '26%', delay: '2.9s' },
  { left: '26%', top: '18%', delay: '3.6s' },
  { left: '38%', top: '66%', delay: '1.1s' },
  { left: '64%', top: '74%', delay: '2.5s' },
];

export function SlideThirtyFourSongRequest() {
  return (
    <section
      role="group"
      aria-label="Request lagu di MusiComedy Night"
      className="musicomedy-s34 absolute inset-0 z-[4] overflow-hidden pointer-events-none"
    >
      {/* Warm glow pulse behind the headline */}
      <div
        aria-hidden="true"
        className="musicomedy-s33-glow absolute left-1/2 top-[24%] h-[24%] w-[64%] -translate-x-1/2"
      />

      {/* Floating music notes */}
      <div aria-hidden="true">
        {notes.map((note) => (
          <span
            key={`${note.glyph}-${note.delay}`}
            className="musicomedy-s33-note absolute"
            style={{
              left: note.left,
              bottom: note.bottom,
              fontSize: note.size,
              animationDelay: note.delay,
              animationDuration: note.duration,
            }}
          >
            {note.glyph}
          </span>
        ))}
      </div>

      {/* Twinkling sparks */}
      <div aria-hidden="true">
        {sparks.map((spark, index) => (
          <span
            key={index}
            className="musicomedy-s33-spark absolute"
            style={{ left: spark.left, top: spark.top, animationDelay: spark.delay }}
          />
        ))}
      </div>

      {/* Kicker, song list and WhatsApp CTA stack vertically so the shapes
          never overlap — each card sizes itself to its text. */}
      <div className="s34-stack absolute left-1/2 top-[30.5%] bottom-[21.5%] w-[70%] -translate-x-1/2">
        <div className="musicomedy-s33-ribbon s34-ribbon w-fit">
          <p className="musicomedy-s33-ribbon-text" style={{ whiteSpace: 'nowrap', fontSize: '2.6cqw' }}>
            <span className="musicomedy-s33-stamp-inner">REQUEST</span>
            Lagu favoritmu!
          </p>
        </div>

        {/* Rentetan list lagu */}
        <ul className="s34-list">
          {songs.map((song, i) => (
            <li className="s34-row" key={song} style={{ '--i': i } as CSSProperties}>
              <span className="s34-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="s34-title">{song}</span>
              <span className="s34-note-glyph" aria-hidden="true">
                ♪
              </span>
            </li>
          ))}
        </ul>

        {/* WhatsApp call to action under the list */}
        <div className="s34-cta">
          <p className="s34-cta-line">Bisa request lagu!</p>
          <p className="s34-cta-sub">Kirim judul lagu yang kamu mau lewat WhatsApp</p>
          <span className="s34-wa">WA 0857-2498-1356</span>
        </div>
      </div>
    </section>
  );
}
