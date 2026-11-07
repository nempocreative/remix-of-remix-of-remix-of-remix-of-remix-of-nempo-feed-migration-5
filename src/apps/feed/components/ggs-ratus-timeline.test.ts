import { describe, expect, it } from 'vitest';
import { GGS_SLIDE_7_DURATION_SECONDS, GGS_SLIDE_7_PHASES } from './ggs-ratus-timeline';

describe('GGS slide 7 video', () => {
  it('changes text throughout the full 20 seconds', () => {
    expect(GGS_SLIDE_7_DURATION_SECONDS).toBe(20);
    expect(GGS_SLIDE_7_PHASES.map(phase => [phase.start, phase.end])).toEqual([
      [0, 4], [4, 8], [8, 12], [12, 16], [16, 20],
    ]);
  });
});