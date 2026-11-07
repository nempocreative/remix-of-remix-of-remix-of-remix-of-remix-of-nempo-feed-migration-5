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
  TEAM_ENTER,
  TEAM_EXIT,
  TEAM_EXIT_LEN,
  TEAM_RISE,
  TEAM_STAGGER,
  teamFanPose,
} from './kala-muda-recruit-timeline';

describe('kala-muda-recruit-timeline', () => {
  it('matches the shared 15 s carousel schedule with 5 team cards', () => {
    expect(KMR_DURATION).toBe(15);
    expect(KMR_TEAM_CARDS).toBe(5);
  });

  it('brings all five team cards in together instead of one by one', () => {
    const css = buildKmrTeamCss();
    for (let card = 0; card < KMR_TEAM_CARDS; card++) {
      expect(css).toContain(`@keyframes kmr-card-${card}`);
    }
    // every card is on screen within ~1.7 s and stays until the shared exit
    expect(TEAM_ENTER + (KMR_TEAM_CARDS - 1) * TEAM_STAGGER + TEAM_RISE).toBeLessThan(2);
    expect(TEAM_EXIT + TEAM_EXIT_LEN).toBeLessThanOrEqual(KMR_DURATION);
    expect(css).not.toContain('ggn-');
  });

  it('fans the cards symmetrically with the middle card on top', () => {
    expect(teamFanPose(2)).toMatchObject({ tx: 0, rot: 0, scale: 1.06 });
    expect(teamFanPose(0).tx).toBe(-teamFanPose(4).tx);
    expect(buildKmrTeamCss()).toContain('.kmr-card[data-i="2"]{animation-name:kmr-card-2;z-index:5}');
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
