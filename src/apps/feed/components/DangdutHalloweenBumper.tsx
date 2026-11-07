import { useState, type MouseEvent } from 'react';
import { Download, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stage from '@/assets/dangdut-halloween-stage.jpg';
import srLogo from '@/assets/saduli-ragap-entertainment-logo-keyed.png';
import pumpkin from '@/assets/ddh-pumpkin.png';
import bat from '@/assets/ddh-bat.png';
import kendang from '@/assets/ddh-kendang.png';
import wideVideo from '@/assets/dangdut-halloween-bumper-1620x1080.mp4.asset.json';
import portraitVideo from '@/assets/dangdut-halloween-bumper-1080x1440.mp4.asset.json';

type Ratio = 'wide' | 'portrait';

const VIDEO: Record<'wide' | 'portrait', { url: string; name: string }> = {
  wide: { url: wideVideo.url, name: 'Dangdut-Halloween-Bumper-1620x1080.mp4' },
  portrait: { url: portraitVideo.url, name: 'Dangdut-Halloween-Bumper-1080x1440.mp4' },
};

async function downloadVideo(e: MouseEvent<HTMLAnchorElement>, url: string, name: string) {
  e.preventDefault();
  try {
    const res = await fetch(url);
    if (!res.ok || !(res.headers.get('content-type') || '').includes('video')) throw new Error('bad response');
    const href = URL.createObjectURL(new Blob([await res.arrayBuffer()], { type: 'video/mp4' }));
    const a = document.createElement('a');
    a.href = href; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 30000);
  } catch {
    window.location.href = url;
  }
}

const RATIO_LABEL: Record<Ratio, string> = { wide: '3:2', portrait: '3:4' };

/** Bumper 3: 14-second Halloween dangdut opener for the videotron, in 3:2 landscape or 3:4 portrait. */
export function DangdutHalloweenBumper() {
  const [ratio, setRatio] = useState<Ratio>('wide');
  const [playing, setPlaying] = useState(true);
  const [version, setVersion] = useState(0);

  return (
    <section className="mc-bumper-tool" aria-label="Bumper 3: Dangdut Halloween Saduli Ragap">
      <div className="mc-bumper-controls">
        <Button variant={ratio === 'wide' ? 'default' : 'outline'} onClick={() => setRatio('wide')}>Landscape 3:2</Button>
        <Button variant={ratio === 'portrait' ? 'default' : 'outline'} onClick={() => setRatio('portrait')}>Portrait 3:4</Button>
        <Button variant="outline" size="icon" aria-label={playing ? 'Jeda' : 'Putar'} onClick={() => setPlaying(!playing)}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="outline" size="icon" aria-label="Putar ulang" onClick={() => { setVersion((v) => v + 1); setPlaying(true); }}><RotateCcw /></Button>
        <Button asChild><a href={VIDEO[ratio].url} download={VIDEO[ratio].name} onClick={(e) => downloadVideo(e, VIDEO[ratio].url, VIDEO[ratio].name)}><Download />Download MP4</a></Button>
      </div>
      <div
        key={`${ratio}-${version}`}
        className={`ddh-stage ddh-${ratio}${playing ? '' : ' is-paused'}`}
        aria-label={`Bumper dangdut Halloween ${RATIO_LABEL[ratio]}`}
      >
        <img className="ddh-bg" src={stage} alt="" aria-hidden="true" />
        <div className="ddh-tint" aria-hidden="true" />
        <div className="ddh-beams" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="ddh-bats" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} viewBox="0 0 64 28" style={{ ['--i' as string]: i }}>
              <path d="M32 9c-1.6-3-3.6-4-3.6-4l.6 4.4c-4-3.8-12-6-19-3.4 3.2 1.4 5 3.6 5.4 6.4C10.8 11 5 11.8 0 16c5.4-.4 9.6 1 12 3.6 3-2.4 7.6-3 11.2-1.2 3 1.4 5.6 4.6 8.8 9.6 3.2-5 5.8-8.2 8.8-9.6 3.6-1.8 8.2-1.2 11.2 1.2 2.4-2.6 6.6-4 12-3.6-5-4.2-10.8-5-15.4-3.6.4-2.8 2.2-5 5.4-6.4-7-2.6-15-.4-19 3.4l.6-4.4S33.6 6 32 9Z" />
            </svg>
          ))}
        </div>
        <div className="ddh-flash" aria-hidden="true" />
        <div className="ddh-presents">
          <img src={srLogo} alt="Saduli Ragap Entertainment" />
        </div>
        <div className="ddh-stack">
          <div className="ddh-mark" role="img" aria-label="Saduli Ragap — Dangdut Halloween Night">
            <img className="ddh-prop ddh-prop-pumpkin" src={pumpkin} alt="" aria-hidden="true" />
            <img className="ddh-prop ddh-prop-bat" src={bat} alt="" aria-hidden="true" />
            <img className="ddh-prop ddh-prop-kendang" src={kendang} alt="" aria-hidden="true" />
            {['SADULI', 'RAGAP'].map((word) => (
              <span key={word} className="ddh-word" aria-hidden="true">
                <span className="ddh-word-line">{word}</span>
                <span className="ddh-word-face">{word}</span>
              </span>
            ))}
            <span className="ddh-sub" aria-hidden="true">Dangdut Halloween Night</span>
          </div>
        </div>
        <div className="ddh-fog" aria-hidden="true" />
        <div className="ddh-fade" aria-hidden="true" />
      </div>
    </section>
  );
}
