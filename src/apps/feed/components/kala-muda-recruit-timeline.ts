/**
 * Nempo Feed slides 35–36 — Kala Muda recruitment timelines.
 * Slide 35 ("team") is a card-deck animation: the five team-member
 * cards sit in a stacked deck, the front card holds, then flings off
 * to the side while the deck steps forward; at the end all five fan
 * out together before the loop resets. Slide 36 ("info") reveals
 * requirements, divisions and the sign-up steps in sequence, holds,
 * then fades out for a seamless loop. The CSS keyframes are generated
 * from this schedule so preview and MP4 match.
 */

export const KMR_DURATION = 15;
export const KMR_TEAM_CARDS = 5;

/* ---- Slide 35 deck schedule (seconds) ---- */
const SLOT = 2.4; // waktu per kartu
const HOLD = 1.8; // kartu depan diam
const FLING = SLOT - HOLD; // 0.6 detik kartu terlempar keluar
const FAN_START = 12.4;
const FAN_IN = 13.1;
const FAN_OUT = 14.0;
const FAN_BACK = 14.6;

const pct = (t: number) => `${Math.round((t / KMR_DURATION) * 100000) / 1000}%`;
const EASE = 'cubic-bezier(.45,0,.2,1)';
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';

type DeckPose = { tx: number; ty: number; rot: number; scale: number; opacity: number };

/** Pose kartu pada kedalaman `depth` di tumpukan (0 = paling depan). */
function stackPose(depth: number): DeckPose {
  if (depth <= 0) return { tx: 0, ty: 0, rot: 0, scale: 1, opacity: 1 };
  const capped = Math.min(depth, 4);
  return {
    tx: 0,
    ty: -2.4 * capped,
    rot: (capped % 2 === 0 ? -1 : 1) * (1.4 + capped * 0.5),
    scale: 1 - capped * 0.06,
    opacity: capped >= 4 ? 0 : capped === 3 ? 0.55 : 1,
  };
}

const FLING_POSE: DeckPose = { tx: 82, ty: -8, rot: 24, scale: 1.03, opacity: 0 };
const fanPose = (card: number): DeckPose => ({
  tx: (card - 2) * 13,
  ty: 3,
  rot: (card - 2) * 7,
  scale: 0.74,
  opacity: 1,
});

const poseCss = (pose: DeckPose) =>
  `transform:translate3d(${pose.tx}cqw,${pose.ty}cqw,0) rotate(${pose.rot}deg) scale(${pose.scale});opacity:${pose.opacity}`;

function opacityWindow(name: string, from: number, to: number, fade: number, rise = 0): string {
  const hidden = `opacity:0;transform:translateY(${rise}cqw)`;
  const shown = 'opacity:1;transform:translateY(0)';
  const start = from <= 0 ? `0%{${shown}}` : `0%{${hidden}}${pct(from)}{${hidden}}${pct(from + fade)}{${shown}}`;
  return `@keyframes ${name}{${start}${pct(to - fade)}{${shown}}${pct(to)}{${hidden}}100%{${hidden}}}`;
}

/** Full CSS for the slide 35 team deck; the root's `kmr-` styles do the rest. */
export function buildKmrTeamCss(): string {
  const rules: string[] = [];
  for (let card = 0; card < KMR_TEAM_CARDS; card++) {
    const frames: string[] = [];
    const push = (t: number, pose: DeckPose, ease = EASE) =>
      frames.push(`${pct(t)}{${poseCss(pose)};animation-timing-function:${ease}}`);

    // Awal loop: kartu berada di tumpukan pada kedalaman = indeksnya.
    push(0, stackPose(card));
    // Setiap kartu di depannya terlempar, tumpukan maju satu langkah.
    for (let front = 0; front < card; front++) {
      const exitStart = front * SLOT + HOLD;
      push(exitStart, stackPose(card - front));
      push(exitStart + FLING, stackPose(card - front - 1), EASE_OUT);
    }
    // Kartu ini jadi yang terdepan: pop kecil lalu menetap.
    const focusStart = card * SLOT;
    if (card > 0) {
      push(focusStart, { ...stackPose(0), scale: 1.05 }, EASE_OUT);
      push(focusStart + 0.3, stackPose(0));
    }
    // Diam di depan, lalu terlempar keluar.
    push(focusStart + HOLD, stackPose(0));
    push(focusStart + HOLD + FLING, FLING_POSE, 'cubic-bezier(.5,0,.9,.4)');
    // Sembunyi sampai fan-out, lalu semua kartu mengembang bareng.
    push(FAN_START, FLING_POSE);
    push(FAN_IN, fanPose(card), EASE_OUT);
    push(FAN_OUT, fanPose(card));
    // Kembali ke pose awal loop supaya putarannya mulus.
    push(FAN_BACK, stackPose(card), EASE);
    push(KMR_DURATION, stackPose(card));

    rules.push(`@keyframes kmr-card-${card}{${frames.join('')}}`);
    rules.push(`.kmr-card[data-i="${card}"]{animation-name:kmr-card-${card};z-index:${KMR_TEAM_CARDS - card}}`);

    const sheenStart = focusStart + 0.15;
    rules.push(
      `@keyframes kmr-sheen-${card}{0%,${pct(sheenStart)}{transform:translateX(-130%)}${pct(sheenStart + 0.9)},100%{transform:translateX(130%)}}`,
      `.kmr-card[data-i="${card}"] .kmr-sheen{animation-name:kmr-sheen-${card}}`,
    );
    rules.push(opacityWindow(`kmr-note-${card}`, Math.max(focusStart - 0.2, 0), focusStart + HOLD + 0.3, 0.35, 1));
    rules.push(`.kmr-note[data-i="${card}"]{animation-name:kmr-note-${card}}`);

    const dotOn = Math.max(focusStart - FLING, 0);
    const dotOff = focusStart + HOLD;
    const dotStart = card === 0 ? '0%' : `0%,${pct(dotOn)}{opacity:.35;transform:scaleX(1)}${pct(focusStart)}`;
    rules.push(
      `@keyframes kmr-dot-${card}{${dotStart},${pct(dotOff)}{opacity:1;transform:scaleX(2.6)}${pct(dotOff + FLING)},${pct(FAN_START)}{opacity:.35;transform:scaleX(1)}${pct(FAN_IN)},${pct(FAN_OUT)}{opacity:1;transform:scaleX(1)}100%{opacity:${card === 0 ? '1;transform:scaleX(2.6)' : '.35;transform:scaleX(1)'}}}`,
      `.kmr-dot[data-i="${card}"]{animation-name:kmr-dot-${card}}`,
    );
  }
  rules.push(opacityWindow('kmr-final', FAN_IN - 0.5, FAN_OUT + 0.4, 0.4, 1));
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
