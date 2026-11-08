import { useEffect, useState, type RefObject } from 'react';
import { Camera, Laptop, Palette, Pause, Play, RotateCcw } from 'lucide-react';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import kalaMudaLogo from '@/assets/kala-muda-logo.png';
import teamMember01 from '@/assets/team/team-member-01.jpg';
import teamMember02 from '@/assets/team/team-member-02.jpg';
import teamMember03 from '@/assets/team/team-member-03.jpg';
import teamMember04 from '@/assets/team/team-member-04.jpg';
import teamMember05 from '@/assets/team/team-member-05.jpg';
import teamMember06 from '@/assets/team/team-member-06.jpg';
import teamMember07 from '@/assets/team/team-member-07.jpg';
import teamMember08 from '@/assets/team/team-member-08.jpg';
import teamMember09 from '@/assets/team/team-member-09.jpg';
import teamMember10 from '@/assets/team/team-member-10.jpg';
import teamMember11 from '@/assets/team/team-member-11.jpg';
import teamMember12 from '@/assets/team/team-member-12.jpg';
import teamMember13 from '@/assets/team/team-member-13.jpg';
import teamMember14 from '@/assets/team/team-member-14.jpg';
import teamMember15 from '@/assets/team/team-member-15.jpg';
import teamMember16 from '@/assets/team/team-member-16.jpg';
import teamMember17 from '@/assets/team/team-member-17.jpg';
import {
  buildKmrInfoCss,
  buildKmrTeamCss,
  INFO_DIVISIONS,
  INFO_STEPS,
  INFO_WHO,
  KMR_DURATION,
} from './kala-muda-recruit-timeline';
import './KalaMudaRecruitSlide.css';

export type KalaMudaRecruitMode = 'team' | 'info';



/** Every team member on the NEMPO Garut website, in the same order. */
const ALL_TEAM: { field: string; photo: string }[] = [
  { field: 'Creative Lead', photo: teamMember01 },
  { field: 'Videographer', photo: teamMember02 },
  { field: 'Social Media', photo: teamMember03 },
  { field: 'Content Creator', photo: teamMember04 },
  { field: 'Designer', photo: teamMember05 },
  { field: 'Photographer', photo: teamMember06 },
  { field: 'Video Editor', photo: teamMember07 },
  { field: 'Social Media', photo: teamMember08 },
  { field: 'Videographer', photo: teamMember09 },
  { field: 'Creative Lead', photo: teamMember10 },
  { field: 'Content Creator', photo: teamMember11 },
  { field: 'Event Creator', photo: teamMember12 },
  { field: 'Wedding Creator', photo: teamMember13 },
  { field: 'Photographer', photo: teamMember14 },
  { field: 'Event Creator', photo: teamMember15 },
  { field: 'Content Creator', photo: teamMember16 },
  { field: 'Designer', photo: teamMember17 },
];

const TEAM_CSS = buildKmrTeamCss();
const INFO_CSS = buildKmrInfoCss();

function useMotionControls(slideNumber: number) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const controls = (
    <div className="kmr-controls">
      <Button size="icon" variant="outline" aria-label={paused ? `Putar slide ${slideNumber}` : `Jeda slide ${slideNumber}`} title={paused ? 'Putar' : 'Jeda'} onClick={() => { setReduced(false); setPaused(!paused); }}>
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </Button>
      <Button size="icon" variant="outline" aria-label={`Ulangi slide ${slideNumber}`} title="Ulangi" onClick={() => { setReplayKey((key) => key + 1); setReduced(false); setPaused(false); }}>
        <RotateCcw size={16} />
      </Button>
    </div>
  );
  return { paused, reduced, replayKey, controls };
}

function KmrHeader() {
  return (
    <header className="kmr-header">
      <span className="kmr-logo">
        <img src={kalaMudaLogo} alt="Logo Kala Muda" draggable={false} />
      </span>
      <span className="kmr-brand">
        <strong>NEMPO.ID</strong>
        <span>× Kala Muda</span>
      </span>
    </header>
  );
}

/** Slide 35 header/footer, matching the Nempo Feed story slides (e.g. slide 20). */
export function NempoHeader({ badge }: { badge: string }) {
  return (
    <header className="kmt-header">
      <span className="kmt-brand">
        <span className="kmt-logo">
          <img src="/nempo-feed/assets/nempo-new.webp" alt="Logo N resmi Nempo" draggable={false} />
        </span>
        <span className="kmt-name">
          <strong>NEMPO.ID</strong>
          <span><b>×</b> Kala Muda</span>
        </span>
      </span>
      <span className="kmt-badge">{badge}</span>
    </header>
  );
}

export function NempoFooter() {
  return (
    <footer className="kmt-footer">
      <span className="kmt-pill kmt-pill-wa"><FaWhatsapp aria-hidden="true" />0857 2498 1356</span>
      <span className="kmt-pill"><FaInstagram aria-hidden="true" /><FaTiktok aria-hidden="true" /><strong>@nempo.id</strong></span>
    </footer>
  );
}

function TeamBackdrop({ icons = true }: { icons?: boolean }) {
  return (
    <div className="kmt-bg" aria-hidden="true">
      <span className="kmt-grid" />
      <span className="kmt-ring kmt-ring-a" />
      <span className="kmt-ring kmt-ring-b" />
      <span className="kmt-band" />
      <span className="kmt-word">KALA MUDA</span>
      {icons && <>
        <span className="kmt-spark kmt-spark-a"><Camera strokeWidth={2.2} /></span>
        <span className="kmt-spark kmt-spark-b"><Laptop strokeWidth={2.2} /></span>
        <span className="kmt-spark kmt-spark-c"><Palette strokeWidth={2.2} /></span>
      </>}
      <span className="kmt-dots" />
    </div>
  );
}

function TeamSlide({ exportRef, slideNumber }: { exportRef?: RefObject<HTMLElement | null>; slideNumber: number }) {
  const { paused, reduced, replayKey, controls } = useMotionControls(slideNumber);
  return (
    <div className="w-full max-w-[430px]">
      <style>{TEAM_CSS}</style>
      {controls}
      <div
        key={replayKey}
        ref={exportRef as RefObject<HTMLDivElement | null>}
        className={`kmr-root kmt-root${paused ? ' is-paused' : ''}${reduced ? ' is-reduced' : ''}`}
        data-duration={KMR_DURATION}
        role="img"
        aria-label={`Kala Muda Community — Are you ready jadi next creative team: seluruh ${ALL_TEAM.length} anggota tim NEMPO Garut, lima-lima bergantian.`}
      >
        <TeamBackdrop />
        <NempoHeader badge="OPEN RECRUITMENT" />
        <h2 className="kmr-title" aria-hidden="true">
          Are You Ready Jadi <em>Next Creative Team?</em>
        </h2>
        <div className="kmr-stage" aria-hidden="true">
          {ALL_TEAM.map((card, i) => (
            <figure key={i} className="kmr-card" data-i={i}>
              <div className="kmr-float">
                <div className="kmr-photo">
                  <img src={card.photo} alt="" width={768} height={1024} draggable={false} />
                  <span className="kmr-sheen" />
                </div>
                <figcaption>
                  <span className="kmr-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="kmr-name">{card.field}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
        <NempoFooter />
      </div>
    </div>
  );
}

function InfoSlide({ exportRef, slideNumber }: { exportRef?: RefObject<HTMLElement | null>; slideNumber: number }) {
  const { paused, reduced, replayKey, controls } = useMotionControls(slideNumber);
  return (
    <div className="w-full max-w-[430px]">
      <style>{INFO_CSS}</style>
      {controls}
      <div
        key={replayKey}
        ref={exportRef as RefObject<HTMLDivElement | null>}
        className={`kmr-root kmt-root kmi-root${paused ? ' is-paused' : ''}${reduced ? ' is-reduced' : ''}`}
        data-duration={KMR_DURATION}
        role="img"
        aria-label={`Gabung Kala Muda Creative Team. Siapa yang bisa daftar: ${INFO_WHO.join(', ')}. Pilihan divisi: ${INFO_DIVISIONS.join(', ')}. Cara daftar: ${INFO_STEPS.join('; ')}. Daftar di www.nempogarut.com.`}
      >
        <TeamBackdrop icons={false} />
        <NempoHeader badge="OPEN RECRUITMENT" />
        <h2 className="kmi-title" aria-hidden="true">
          Gabung <em>Kala Muda</em> Creative Team
        </h2>
        <section className="kmi-block kmi-block-who" aria-hidden="true">
          <h3 className="kmi-head kmi-who-head">Siapa yang bisa daftar?</h3>
          <div className="kmi-chips">
            {INFO_WHO.map((who, i) => (
              <span key={who} className="kmi-chip kmi-who" data-i={i}>{who}</span>
            ))}
          </div>
        </section>
        <section className="kmi-block kmi-block-div" aria-hidden="true">
          <h3 className="kmi-head kmi-div-head">Pilih divisimu</h3>
          <div className="kmi-chips kmi-chips-div">
            {INFO_DIVISIONS.map((division, i) => (
              <span key={division} className="kmi-chip kmi-div" data-i={i}>{division}</span>
            ))}
          </div>
        </section>
        <section className="kmi-block kmi-block-steps" aria-hidden="true">
          <h3 className="kmi-head kmi-steps-head">Cara daftar</h3>
          <ol className="kmi-step-list">
            {INFO_STEPS.map((step, i) => (
              <li key={step} className="kmi-step" data-i={i}>
                <span className="kmi-step-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
        <p className="kmi-cta" aria-hidden="true">
          Daftar di <strong>www.nempogarut.com</strong>
        </p>
        <NempoFooter />
      </div>
    </div>
  );
}

/** Nempo Feed 3:4 video slides 35–36: Kala Muda creative-team recruitment. */
export function KalaMudaRecruitSlide({
  mode,
  exportRef,
  slideNumber = mode === 'info' ? 36 : 35,
}: {
  mode: KalaMudaRecruitMode;
  exportRef?: RefObject<HTMLElement | null>;
  slideNumber?: number;
}) {
  return mode === 'info'
    ? <InfoSlide exportRef={exportRef} slideNumber={slideNumber} />
    : <TeamSlide exportRef={exportRef} slideNumber={slideNumber} />;
}
