import { useEffect, useRef, useState, type RefObject } from 'react';
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import videoAsset from '@/assets/nempo-feed-slide-37.mp4.asset.json';
import posterAsset from '@/assets/nempo-feed-slide-37.png.asset.json';
import './KalaMudaActivitiesSlide.css';

export function KalaMudaActivitiesSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (preference.matches) { video.pause(); video.currentTime = 0; }
      else void video.play().catch(() => setPlaying(false));
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return (
    <div className="w-full max-w-[430px]">
      <div className="mb-3 flex justify-center gap-2">
        <Button size="icon" variant="outline" title={playing ? 'Jeda' : 'Putar'} aria-label={playing ? 'Jeda slide 37' : 'Putar slide 37'} onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          if (video.paused) void video.play().catch(() => setPlaying(false)); else video.pause();
        }}>{playing ? <Pause size={16} /> : <Play size={16} />}</Button>
        <Button size="icon" variant="outline" title="Ulangi" aria-label="Ulangi slide 37" onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          video.currentTime = 0;
          void video.play().catch(() => setPlaying(false));
        }}><RotateCcw size={16} /></Button>
        <Button size="icon" variant="outline" title={muted ? 'Nyalakan suara' : 'Matikan suara'} aria-label={muted ? 'Nyalakan suara slide 37' : 'Matikan suara slide 37'} onClick={() => setMuted(!muted)}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</Button>
      </div>
      <div ref={exportRef as RefObject<HTMLDivElement | null>} className="kma-root">
        <video ref={videoRef} src={videoAsset.url} poster={posterAsset.url} muted={muted} loop playsInline preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Kegiatan Kala Muda: tari MusiComedy Night, jamming akustik, podcast malam, Review Makanan, makan bersama, kumpul di basecamp, Band Kala Muda, Meeting Client, foto bareng satu tim" />
      </div>
    </div>
  );
}
