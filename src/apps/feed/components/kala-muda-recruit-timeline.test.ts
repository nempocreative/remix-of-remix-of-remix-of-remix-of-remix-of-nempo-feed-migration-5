import { describe, expect, it } from 'vitest';
import {
  buildKmrInfoCss,
  buildKmrTeamCss,
  INFO_CTA_IN,
  INFO_DIVISIONS,
  INFO_DIVISIONS_IN,
  INFO_FADE_OUT,
  INFO_STEPS,
  INFO_STEPS_IN,
  INFO_WHO,
  INFO_WHO_IN,
  KMR_DURATION,
  KMR_TEAM_CARDS,
} from './kala-muda-recruit-timeline';

describe('kala-muda-recruit-timeline', () => {
  it('matches the shared 15 s carousel schedule with 5 team cards', () => {
    expect(KMR_DURATION).toBe(15);
    expect(KMR_TEAM_CARDS).toBe(5);
  });

  it('generates kmr-prefixed team keyframes for every card, note and dot', () => {
    const css = buildKmrTeamCss();
    for (let card = 0; card < KMR_TEAM_CARDS; card++) {
      expect(css).toContain(`@keyframes kmr-card-${card}`);
      expect(css).toContain(`.kmr-card[data-i="${card}"]{animation-name:kmr-card-${card};z-index:${KMR_TEAM_CARDS - card}}`);
      expect(css).toContain(`@keyframes kmr-note-${card}`);
      expect(css).toContain(`@keyframes kmr-dot-${card}`);
    }
    expect(css).toContain('@keyframes kmr-final');
    expect(css).not.toContain('ggn-');
  });

  it('reveals info sections in order and fades out before the loop ends', () => {
    expect(INFO_WHO_IN).toBeLessThan(INFO_DIVISIONS_IN);
    expect(INFO_DIVISIONS_IN).toBeLessThan(INFO_STEPS_IN);
    expect(INFO_STEPS_IN).toBeLessThan(INFO_CTA_IN);
    expect(INFO_CTA_IN).toBeLessThan(INFO_FADE_OUT);
    expect(INFO_FADE_OUT).toBeLessThan(KMR_DURATION);
  });

  it('lists the six Kala Muda divisions and three sign-up steps', () => {
    expect(INFO_DIVISIONS).toHaveLength(6);
    expect(INFO_DIVISIONS).toContain('Web Developer');
    expect(INFO_DIVISIONS).toContain('Event Management');
    expect(INFO_WHO).toHaveLength(3);
    expect(INFO_STEPS).toHaveLength(3);
  });

  it('generates kmi-prefixed info keyframes for every chip and step', () => {
    const css = buildKmrInfoCss();
    expect(css).toContain('@keyframes kmi-title');
    INFO_WHO.forEach((_, i) => expect(css).toContain(`.kmi-who[data-i="${i}"]{animation-name:kmi-who-${i}}`));
    INFO_DIVISIONS.forEach((_, i) => expect(css).toContain(`.kmi-div[data-i="${i}"]{animation-name:kmi-div-${i}}`));
    INFO_STEPS.forEach((_, i) => expect(css).toContain(`.kmi-step[data-i="${i}"]{animation-name:kmi-step-${i}}`));
    expect(css).toContain('@keyframes kmi-cta');
  });
});
