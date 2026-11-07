import posterImage from '@/assets/musicomedy-night-poster.webp';

// Slide 33 — animated "datang besok" reminder layered over the shared MusiComedy frame.
// Scoped to slide 33 only: slides 31 and 32 keep their own looks (see AGENTS.md).

const notes = [
  { glyph: '♪', left: '9%', bottom: '34%', size: 'clamp(18px, 3.4vw, 34px)', delay: '0s', duration: '5.2s' },
  { glyph: '♫', left: '84%', bottom: '42%', size: 'clamp(15px, 2.9vw, 28px)', delay: '1.4s', duration: '5.8s' },
  { glyph: '♪', left: '6%', bottom: '58%', size: 'clamp(13px, 2.4vw, 24px)', delay: '2.6s', duration: '6.4s' },
  { glyph: '♬', left: '88%', bottom: '22%', size: 'clamp(16px, 3vw, 30px)', delay: '3.5s', duration: '5.5s' },
  { glyph: '♪', left: '14%', bottom: '18%', size: 'clamp(12px, 2.2vw, 22px)', delay: '4.3s', duration: '6.1s' },
  { glyph: '♫', left: '30%', bottom: '12%', size: 'clamp(14px, 2.6vw, 26px)', delay: '1.9s', duration: '6.8s' },
  { glyph: '♪', left: '66%', bottom: '9%', size: 'clamp(13px, 2.4vw, 24px)', delay: '3.1s', duration: '7.2s' },
  { glyph: '♬', left: '47%', bottom: '4%', size: 'clamp(15px, 2.8vw, 28px)', delay: '4.9s', duration: '6.5s' },
];

const sparks = [
  { left: '18%', top: '52%', delay: '0s' },
  { left: '78%', top: '30%', delay: '0.7s' },
  { left: '10%', top: '26%', delay: '1.5s' },
  { left: '86%', top: '60%', delay: '2.2s' },
  { left: '50%', top: '34%', delay: '2.9s' },
  { left: '26%', top: '20%', delay: '3.6s' },
  { left: '38%', top: '64%', delay: '1.1s' },
  { left: '63%', top: '72%', delay: '2.5s' },
  { left: '48%', top: '56%', delay: '4.1s' },
];

export function SlideThirtyThreeReminder() {
  return (
    <section
      role="group"
      aria-label="Pengingat datang besok ke MusiComedy Night"
      className="musicomedy-s33 absolute inset-0 z-[4] overflow-hidden pointer-events-none"
    >
      {/* Warm glow pulse behind the logo */}
      <div
        aria-hidden="true"
        className="musicomedy-s33-glow absolute left-1/2 top-[13%] h-[26%] w-[62%] -translate-x-1/2"
      />

      {/* Soft stage light filling the lower half of the poster */}
      <div
        aria-hidden="true"
        className="musicomedy-s33-glow musicomedy-s33-glow--low absolute left-1/2 top-[46%] h-[32%] w-[74%] -translate-x-1/2"
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

      {/* Short reminder headline under the MusiComedy Night title. */}
      <div className="musicomedy-s33-ribbon absolute left-1/2 top-[71.5%] w-fit -translate-x-1/2">
        <p className="musicomedy-s33-ribbon-text" style={{ whiteSpace: "nowrap", fontSize: "2.4cqw" }}>
          <span className="musicomedy-s33-stamp-inner">BESOK!</span>
          Cek detail eventnya di web
        </p>
      </div>

      {/* Phone mockup showing the event page on nempogarut.com. */}
      <div className="s33-phone absolute top-[31%]" style={{ left: "calc(50% - 12.5cqw)" }}>
        <div className="s33-phone-notch" />
        <div className="s33-phone-screen">
          <div className="s33-web-url">🔒 nempogarut.com/event/musicomedy-night</div>
          <div className="s33-web-header">
            <span className="s33-web-logo">N</span>
            <span>
              <b>NEMPO GARUT</b>
              <small>ORGANIZER</small>
            </span>
          </div>
          <img className="s33-web-poster" src={posterImage} alt="" />
          <div className="s33-web-body">
            <div className="s33-web-tags">
              <span>RABU, 4 NOV 2026</span>
              <span className="s33-web-free">GRATIS</span>
            </div>
            <div className="s33-web-title">MusiComedy Night</div>
            <div className="s33-web-row">📍 Good Story Cafe, Garut</div>
            <div className="s33-web-row">🎤 bersama Saduli Ragap</div>
            <div className="s33-web-btn">Reservasi &amp; pilih kursi</div>
          </div>
        </div>
      </div>

      {/* Side callouts pointing at the phone. */}
      <div className="s33-callout s33-callout--left absolute left-[14%] top-[39%]">
        <b>GRATIS!</b>
        <span>Cukup order &amp; nongkrong ☕</span>
      </div>
      <div className="s33-callout s33-callout--right absolute right-[14%] top-[53%]">
        <b>Reservasi</b>
        <span>WA 0857-2498-1356</span>
      </div>
    </section>
  );
}
