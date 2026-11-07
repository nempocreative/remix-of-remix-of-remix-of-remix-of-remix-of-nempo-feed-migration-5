/**
 * GGS Feed slide 21 — "Pilih Nail Art Favoritmu" card carousel timeline.
 * One shared clock drives every card: the cards glide sideways like a
 * carousel (active design centred, neighbours peeking behind in 3D depth),
 * and at the end all cards fan out together, then glide back for the loop.
 * Depth uses translateZ (no z-index swaps) so cards never pop in front of
 * each other mid-move. The CSS keyframes are generated from this schedule
 * so preview and MP4 match.
 */
export const NAIL_CARDS_DURATION = 15;
export const NAIL_CARDS_COUNT = 5;
const TURN = 2.6;
const MOVE = 0.9;
export const FAN_START = 12.0;
export const FAN_IN = 12.9;
export const FAN_OUT = 14.1;
const EPS = 1e-6;

export type CardPose = { tx: number; ty: number; tz: number; rot: number; ry: number; scale: number; opacity: number };
export type CardPhase = 'side' | 'front' | 'fan';

/** Time the card has fully arrived in the centre. */
export const turnStart = (card: number) => card * TURN;
const holdEnd = (card: number) => (card === NAIL_CARDS_COUNT - 1 ? FAN_START : turnStart(card + 1) - MOVE);

/** Active (centred) card index at a keyframe time, or null during the fan. */
function activeAt(t: number): number | null {
  if (t >= NAIL_CARDS_DURATION - EPS) return 0;
  if (t >= FAN_IN - EPS) return null;
  for (let card = NAIL_CARDS_COUNT - 1; card >= 0; card--) if (t >= turnStart(card) - EPS) return card;
  return 0;
}

const carouselPose = (offset: number): CardPose => {
  const side = Math.sign(offset);
  const d = Math.min(Math.abs(offset), 3);
  const tx = [0, 27, 43, 50][d] * side;
  const tz = [0, -18, -36, -50][d];
  const ry = [0, -30, -40, -45][d] * side;
  const scale = [1, 0.84, 0.72, 0.64][d];
  const opacity = [1, 0.92, 0, 0][d];
  return { tx, ty: d * 1.2, tz, rot: 0, ry, scale, opacity };
};
const fanPose = (card: number): CardPose => {
  const offset = card - (NAIL_CARDS_COUNT - 1) / 2;
  return { tx: offset * 15, ty: Math.abs(offset) * 3.2 + 4, tz: card * 1.5, rot: offset * 9, ry: 0, scale: 0.58, opacity: 1 };
};

export function cardPhase(card: number, t: number): CardPhase {
  const active = activeAt(t);
  if (active === null) return 'fan';
  return active === card && t <= holdEnd(card) + EPS ? 'front' : 'side';
}

/** Pose of a card at one of its keyframe times. */
export function cardPose(card: number, t: number): CardPose {
  const active = activeAt(t);
  if (active === null) return fanPose(card);
  return carouselPose(card - active);
}

/** Keyframe times shared by every card (moves start/end together). */
export function keyTimes(): number[] {
  const times = [0, FAN_START, FAN_IN, FAN_OUT, NAIL_CARDS_DURATION];
  for (let card = 0; card < NAIL_CARDS_COUNT; card++) times.push(turnStart(card), holdEnd(card));
  return [...new Set(times.map((time) => Math.round(time * 1000) / 1000))].sort((a, b) => a - b);
}

const pct = (t: number) => `${Math.round((t / NAIL_CARDS_DURATION) * 100000) / 1000}%`;
const EASE = 'cubic-bezier(.45,0,.2,1)';
const transform = (pose: CardPose) =>
  `translate3d(${pose.tx}cqw,${pose.ty}cqw,${pose.tz}cqw) rotate(${pose.rot}deg) rotateY(${pose.ry}deg) scale(${pose.scale})`;

function opacityWindow(name: string, from: number, to: number, fade: number, rise = 0): string {
  const hidden = `opacity:0;transform:translateY(${rise}cqw)`;
  const shown = 'opacity:1;transform:translateY(0)';
  const start = from <= 0 ? `0%{${shown}}` : `0%{${hidden}}${pct(from)}{${hidden}}${pct(from + fade)}{${shown}}`;
  return `@keyframes ${name}{${start}${pct(to - fade)}{${shown}}${pct(to)}{${hidden}}100%{${hidden}}}`;
}

/** Full CSS for the carousel animation; the root's `ggn-` styles do the rest. */
export function buildNailCardsCss(): string {
  const rules: string[] = [];
  const times = keyTimes();
  for (let card = 0; card < NAIL_CARDS_COUNT; card++) {
    const frames = times
      .map((t) => {
        const pose = cardPose(card, t);
        return `${pct(t)}{transform:${transform(pose)};opacity:${pose.opacity};animation-timing-function:${EASE}}`;
      })
      .join('');
    rules.push(`@keyframes ggn-card-${card}{${frames}}`);
    rules.push(`.ggn-card[data-i="${card}"]{animation-name:ggn-card-${card}}`);
    const start = turnStart(card) + 0.15;
    const sheen = `@keyframes ggn-sheen-${card}{0%,${pct(start)}{transform:translateX(-130%)}${pct(start + 0.9)},100%{transform:translateX(130%)}}`;
    rules.push(sheen, `.ggn-card[data-i="${card}"] .ggn-sheen{animation-name:ggn-sheen-${card}}`);
    rules.push(opacityWindow(`ggn-note-${card}`, turnStart(card) - 0.2, holdEnd(card) + 0.3, 0.35, 1));
    rules.push(`.ggn-note[data-i="${card}"]{animation-name:ggn-note-${card}}`);
    const dotOn = Math.max(turnStart(card) - MOVE, 0);
    const dotOff = holdEnd(card);
    const dotStart = card === 0 ? '0%' : `0%,${pct(dotOn)}{opacity:.35;transform:scaleX(1)}${pct(turnStart(card))}`;
    rules.push(
      `@keyframes ggn-dot-${card}{${dotStart},${pct(dotOff)}{opacity:1;transform:scaleX(2.6)}${pct(dotOff + MOVE)},${pct(FAN_START)}{opacity:.35;transform:scaleX(1)}${pct(FAN_IN)},${pct(FAN_OUT)}{opacity:1;transform:scaleX(1)}100%{opacity:${card === 0 ? '1;transform:scaleX(2.6)' : '.35;transform:scaleX(1)'}}}`,
      `.ggn-dot[data-i="${card}"]{animation-name:ggn-dot-${card}}`,
    );
  }
  rules.push(opacityWindow('ggn-final', FAN_IN - 0.5, FAN_OUT + 0.4, 0.4, 1));
  return rules.join('\n');
}
