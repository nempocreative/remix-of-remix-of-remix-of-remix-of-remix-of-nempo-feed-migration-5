import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Download, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import nempoLogo from '@/assets/nempo-bumper-logo-white.png';
import saduliLogo from '@/assets/saduli-ragap-logo.png';
import kalaMudaLogo from '@/assets/kala-muda-logo.png';
import eventLogo from '@/assets/musicomedy-night-logo.png';
import stayText from '@/assets/nempo-opening-stay.png';
import tonightText from '@/assets/nempo-opening-tonight.png';
import danceText from '@/assets/nempo-opening-dance.png';
const music = '/audio/nempo-opening-gamelan.m4a';
import videoAsset from '@/assets/nempo-opening-logo.mp4.asset.json';

const video = videoAsset.url;
const fileName = 'NEMPO-Opening-Logo-1440x1080.mp4';

async function downloadVideo(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  try {
    const res = await fetch(video);
    if (!res.ok || !(res.headers.get('content-type') || '').includes('video')) throw new Error('bad response');
    const url = URL.createObjectURL(new Blob([await res.arrayBuffer()], { type: 'video/mp4' }));
    const a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  } catch {
    window.location.href = video;
  }
}

/** 12-second logo-only opening; animation and gamelan track share one timeline. */
export function NempoLogoOpening() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [version, setVersion] = useState(0);

  const restart = (withSound: boolean) => {
    const audio = audioRef.current;
    setVersion((v) => v + 1);
    setPlaying(true);
    setMuted(!withSound);
    if (audio) {
      audio.currentTime = 0;
      audio.muted = !withSound;
      if (withSound) void audio.play().catch(() => setMuted(true));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || muted) return;
    if (playing) void audio.play().catch(() => setMuted(true));
    else audio.pause();
  }, [playing, muted]);

  useEffect(() => () => audioRef.current?.pause(), []);

  return (
    <section className="mc-bumper-tool" aria-label="Bumper 2: opening logo NEMPO">
      <audio ref={audioRef} src={music} preload="auto" onEnded={() => restart(true)} />
      <div className="mc-bumper-controls">
        <Button variant="outline" size="icon" title={playing ? 'Jeda' : 'Putar'} aria-label={playing ? 'Jeda opening' : 'Putar opening'} onClick={() => setPlaying(!playing)}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="outline" size="icon" title="Putar ulang" aria-label="Putar ulang opening" onClick={() => restart(!muted)}><RotateCcw /></Button>
        <Button variant="outline" onClick={() => (muted ? restart(true) : (setMuted(true), audioRef.current?.pause()))}>
          {muted ? <Volume2 /> : <VolumeX />}{muted ? 'Putar dengan musik' : 'Matikan musik'}
        </Button>
        <Button asChild><a href={video} download={fileName} onClick={downloadVideo}><Download />Download MP4</a></Button>
      </div>
      <div key={version} className={`nlo-stage${playing ? '' : ' is-paused'}`} aria-label="Opening logo NEMPO 4:3">
        <div className="nlo-glow" aria-hidden="true" />
        <div className="nlo-rays" aria-hidden="true" />
        <svg className="nlo-ring nlo-ring-outer" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="88" className="nlo-dash" />
        </svg>
        <svg className="nlo-ring nlo-ring-inner" viewBox="0 0 200 200" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <path key={i} d="M100 14 L106 30 L100 46 L94 30 Z" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="62" className="nlo-dash" />
        </svg>
        <div className="nlo-sparks" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</div>
        <div className="nlo-flash" aria-hidden="true" />
        <img className="nlo-sr" src={saduliLogo} alt="Saduli Ragap Entertainment" />
        <img className="nlo-km" src={kalaMudaLogo} alt="Kala Muda" />
        <img className="nlo-logo" src={nempoLogo} alt="NEMPO" />
        <img className="nlo-event" src={eventLogo} alt="MusiComedy Night" />
        <img className="nlo-tagline nlo-tagline-stay" src={stayText} alt="Tetap disini" />
        <img className="nlo-tagline nlo-tagline-tonight" src={tonightText} alt="Malam ini" />
        <img className="nlo-tagline nlo-tagline-dance" src={danceText} alt="Kita Joged Bareng" />
        <div className="nlo-fade" aria-hidden="true" />
      </div>
    </section>
  );
}
