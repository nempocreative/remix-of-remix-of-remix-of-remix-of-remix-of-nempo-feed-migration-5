import { useEffect, useRef, useState, type RefObject } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import welcomeVideo from '@/assets/ggs-open-welcome-motion.mp4';
import welcomePhoto from '@/assets/ggs-we-are-open-pink.jpg';
import watermark from '@/assets/ggs-header-footer-v2.png.asset.json';
import './GgsWeAreOpenSlide.css';

export function GgsWeAreOpenSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReducedMotion(preference.matches); setPaused(preference.matches); };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || reducedMotion) video.pause();
    else void video.play().catch(() => setPaused(true));
  }, [paused, reducedMotion, replayKey]);
  return (
    <div className="w-full max-w-[430px]">
      <div className="ggo-controls">
        <Button size="icon" variant="outline" aria-label={paused ? 'Putar slide 12' : 'Jeda slide 12'} title={paused ? 'Putar' : 'Jeda'} onClick={() => { setReducedMotion(false); setPaused(!paused); }}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </Button>
        <Button size="icon" variant="outline" aria-label="Ulangi slide 12" title="Ulangi" onClick={() => { const video = videoRef.current; if (video) video.currentTime = 0; setReplayKey(key => key + 1); setReducedMotion(false); setPaused(false); }}><RotateCcw size={16} /></Button>
      </div>
      <div key={replayKey} ref={exportRef as RefObject<HTMLDivElement | null>} className={`ggo-root${paused ? ' is-paused' : ''}`} data-duration="8" role="img" aria-label="GGS Beauty — We are open. Yuk, perawatan di GGS Beauty! Saatnya me-time, tampil fresh dan percaya diri.">
        <video ref={videoRef} className="ggo-scene" src={welcomeVideo} poster={welcomePhoto} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="ggo-shade" />
        <section className="ggo-heading" aria-hidden="true">
          <p className="ggo-kicker">GGS Beauty · Salon &amp; Spa</p>
          <h2 className="ggo-title"><span>We are</span><em>open.</em></h2>
        </section>
        <section className="ggo-invite" aria-hidden="true">
          <h2>Yuk, perawatan<br />di GGS Beauty!</h2>
          <p>Saatnya me-time, tampil fresh<br />dan percaya diri.</p>
          <span className="ggo-invite-line" />
        </section>
        <img className="ggo-watermark" src={watermark.url} alt="" draggable={false} />
      </div>
    </div>
  );
}