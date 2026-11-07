import { useState, type MouseEvent } from 'react';
import { Download, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/musicomedy-night-logo.png';

import background from '@/assets/nempo-feed-slide-31-bg.jpg';
import group from '@/assets/musicomedy-group.webp';
import wayang from '@/assets/musicomedy-bumper-wayang.png';
import videoAsset from '@/assets/musicomedy-bumper.mp4.asset.json';

const video = videoAsset.url;
const fileName = 'MusiComedy-Night-Bumper-1440x1080.mp4';

async function downloadVideo(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  try {
    const res = await fetch(video);
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('video')) throw new Error('bad response');
    const blob = new Blob([await res.arrayBuffer()], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  } catch {
    window.location.href = video;
  }
}
import nempoLogo from '@/assets/nempo-bumper-logo-white.png';

export function MusiComedyBumper() {
  const [playing, setPlaying] = useState(true);
  const [version, setVersion] = useState(0);
  return (
    <section className="mc-bumper-tool" aria-label="Video bumper acara MusiComedy Night">
      <div className="mc-bumper-controls">
        <Button variant="outline" size="icon" title={playing ? 'Jeda' : 'Putar'} aria-label={playing ? 'Jeda bumper' : 'Putar bumper'} onClick={() => setPlaying(!playing)}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="outline" size="icon" title="Putar ulang" aria-label="Putar ulang bumper" onClick={() => { setVersion(version + 1); setPlaying(true); }}><RotateCcw /></Button>
        <Button asChild><a href={video} download={fileName} onClick={downloadVideo}><Download />Download MP4</a></Button>
      </div>
      <div key={version} className={`mc-bumper-stage${playing ? '' : ' is-paused'}`} aria-label="Bumper MusiComedy Night 4:3">
        <img className="mc-bumper-backdrop" src={background} alt="" />

        <div className="mc-bumper-curtain mc-bumper-curtain-left" aria-hidden="true" />
        <div className="mc-bumper-curtain mc-bumper-curtain-right" aria-hidden="true" />
        <div className="mc-bumper-nempo"><img src={nempoLogo} alt="NEMPO" /></div>
        <div className="mc-bumper-puppet mc-bumper-puppet-left"><img src={wayang} width={1024} height={1536} alt="Wayang membuka panggung dari kiri" /></div>
        <div className="mc-bumper-puppet mc-bumper-puppet-right"><img src={wayang} width={1024} height={1536} alt="Wayang membuka panggung dari kanan" /></div>
        <div className="mc-bumper-title-reveal"><span>NEMPO GARUT × KALA MUDA</span><img src={logo} alt="MusiComedy Night" /><strong>SELAMAT MENIKMATI ACARA</strong></div>
        <div className="mc-bumper-performers">
          <span>PENGISI ACARA</span>
          <img src={group} alt="Para pengisi acara MusiComedy Night berbusana adat Sunda" />
          <strong>SADULI RAGAP</strong>
        </div>
        <div className="mc-bumper-event"><strong>4 NOVEMBER 2026</strong><span>GOOD STORY CAFE</span><small>Jl. Sudirman Copong No. 11</small></div>
        <div className="mc-bumper-menu">
          <span>LENGKAPI HIBURAN MALAM INI</span>
          <strong>Tawa makin hangat<br />dengan menu favoritmu</strong>
          <p>Pesan kopi, camilan, dan hidangan Good Story Cafe sekarang, lalu nikmati setiap lagu dan lawakan sampai akhir.</p>
          <small>Pesan langsung ke pelayan kami</small>
        </div>
        <div className="mc-bumper-progress" aria-hidden="true" />
      </div>
    </section>
  );
}