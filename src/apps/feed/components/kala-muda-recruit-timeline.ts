/**
 * Nempo Feed slides 35–36 — Kala Muda recruitment timelines.
 * Slide 35 ("team") shows all five team-member cards together as a
 * fanned group that rises in, floats, and drops out before the loop. Slide 36 ("info") reveals
 * requirements, divisions and the sign-up steps in sequence, holds,
 * then fades out for a seamless loop. The CSS keyframes are generated
 * from this schedule so preview and MP4 match.
 */

export const KMR_DURATION = 15;
export const KMR_TEAM_CARDS = 5;

/* ---- Slide 35 team schedule (seconds) ----
 * All five cards rise in together as one fanned group (tiny stagger),
 * float gently while they hold, share a sheen sweep, then drop out
 * together just before the loop resets. */
export const TEAM_ENTER = 0.3;
export const TEAM_STAGGER = 0.1;
export const TEAM_RISE = 1.0;
export const TEAM_EXIT = 13.8;
export const TEAM_EXIT_LEN = 0.8;

const pct = (t: number) => `${Math.round((t / KMR_DURATION) * 100000) / 1000}%`;
const EASE = 'cubic-bezier(.45,0,.2,1)';
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';

type Pose = { tx: number; ty: number; rot: number; scale: number; opacity: number };

/** Fanned resting pose: center card on top, outer cards tilted outward. */
export function teamFanPose(card: number): Pose {
  const off = card - (KMR_TEAM_CARDS - 1) / 2;
  return { tx: off * 15.5, ty: Math.abs(off) * 3.6, rot: off * 7.5, scale: off === 0 ? 1 : 0.92, opacity: 1 };
}

const poseCss = (pose: Pose) =>
  `transform:translate3d(${pose.tx}cqw,${pose.ty}cqw,0) rotate(${pose.rot}deg) scale(${pose.scale});opacity:${pose.opacity}`;

function opacityWindow(name: string, from: number, to: number, fade: number, rise = 0): string {
  const hidden = `opacity:0;transform:translateY(${rise}cqw)`;
  const shown = 'opacity:1;transform:translateY(0)';
  const start = from <= 0 ? `0%{${shown}}` : `0%{${hidden}}${pct(from)}{${hidden}}${pct(from + fade)}{${shown}}`;
  return `@keyframes ${name}{${start}${pct(to - fade)}{${shown}}${pct(to)}{${hidden}}100%{${hidden}}}`;
}

/** Full CSS for the slide 35 team group; the root's `kmr-` styles do the rest. */
export function buildKmrTeamCss(): string {
  const rules: string[] = [];
  for (let card = 0; card < KMR_TEAM_CARDS; card++) {
    const fan = teamFanPose(card);
    const hidden: Pose = { tx: fan.tx * 0.4, ty: fan.ty + 40, rot: 0, scale: 0.8, opacity: 0 };
    const start = TEAM_ENTER + card * TEAM_STAGGER;
    const f = (t: number, pose: Pose, ease = EASE) => `${pct(t)}{${poseCss(pose)};animation-timing-function:${ease}}`;
    rules.push(
      `@keyframes kmr-card-${card}{${f(0, hidden)}${f(start, hidden, EASE_OUT)}${f(start + TEAM_RISE, fan)}${f(TEAM_EXIT, fan)}${f(TEAM_EXIT + TEAM_EXIT_LEN, { ...hidden, ty: fan.ty + 30 })}${f(KMR_DURATION, hidden)}}`,
      `.kmr-card[data-i="${card}"]{animation-name:kmr-card-${card};z-index:${KMR_TEAM_CARDS - Math.abs(card - 2)}}`,
      `.kmr-card[data-i="${card}"] .kmr-float{animation-delay:${-card * 0.6}s}`,
    );
  }
  rules.push(
    `@keyframes kmr-sheen{0%,${pct(2)}{transform:translateX(-130%)}${pct(3)},${pct(8)}{transform:translateX(130%)}${pct(8.001)}{transform:translateX(-130%)}${pct(9)},100%{transform:translateX(130%)}}`,
    '.kmr-sheen{animation-name:kmr-sheen}',
  );
  rules.push(opacityWindow('kmr-tagline', 1.6, TEAM_EXIT + 0.6, 0.5, 1));
  return rules.join('\n');
}

/**
 * Slide 36 info schedule (seconds): title, "siapa yang bisa daftar",
 * division chips, sign-up steps, then the WhatsApp CTA. Everything
 * holds from INFO_HOLD until INFO_FADE_OUT, then fades for the loop.
 */
export const INFO_TITLE_IN = 0;
export const INFO_WHO_IN = 1.0;
export const INFO_DIVISIONS_IN = 3.2;
export const INFO_STEPS_IN = 6.6;
export const INFO_CTA_IN = 9.4;
export const INFO_FADE_OUT = 14.2;

export const INFO_DIVISIONS = [
  'Designer',
  'Web Developer',
  'Content Creator',
  'Videografer & Fotografer',
  'Marketing',
  'Event Management',
] as const;
export const INFO_WHO = ['Pelajar SMP/SMA/SMK', 'Mahasiswa', 'Umum / pekerja'] as const;
export const INFO_STEPS = [
  'Isi formulir di nempo.id/komunitas',
  'Formulir terkirim ke WhatsApp kami',
  'Tim Kala Muda menghubungi kamu',
] as const;

/** Full CSS for the slide 36 info reveal; the root's `kmi-` styles do the rest. */
export function buildKmrInfoCss(): string {
  const rules: string[] = [];
  const out = INFO_FADE_OUT;
  rules.push(opacityWindow('kmi-title', INFO_TITLE_IN, out, 0.7, 2));
  rules.push(opacityWindow('kmi-who-head', INFO_WHO_IN, out, 0.5, 1.4));
  INFO_WHO.forEach((_, i) => {
    rules.push(opacityWindow(`kmi-who-${i}`, INFO_WHO_IN + 0.35 + i * 0.3, out, 0.4, 1.2));
    rules.push(`.kmi-who[data-i="${i}"]{animation-name:kmi-who-${i}}`);
  });
  rules.push(opacityWindow('kmi-free', INFO_WHO_IN + 1.4, out, 0.45, 1));
  rules.push(opacityWindow('kmi-div-head', INFO_DIVISIONS_IN, out, 0.5, 1.4));
  INFO_DIVISIONS.forEach((_, i) => {
    rules.push(opacityWindow(`kmi-div-${i}`, INFO_DIVISIONS_IN + 0.3 + i * 0.32, out, 0.4, 1.2));
    rules.push(`.kmi-div[data-i="${i}"]{animation-name:kmi-div-${i}}`);
  });
  rules.push(opacityWindow('kmi-steps-head', INFO_STEPS_IN, out, 0.5, 1.4));
  INFO_STEPS.forEach((_, i) => {
    rules.push(opacityWindow(`kmi-step-${i}`, INFO_STEPS_IN + 0.3 + i * 0.45, out, 0.45, 1.2));
    rules.push(`.kmi-step[data-i="${i}"]{animation-name:kmi-step-${i}}`);
  });
  rules.push(opacityWindow('kmi-cta', INFO_CTA_IN, KMR_DURATION, 0.6, 1.6));
  return rules.join('\n');
}
