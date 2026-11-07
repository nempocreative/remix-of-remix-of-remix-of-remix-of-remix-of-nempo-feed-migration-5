import { describe, expect, it } from 'vitest';
import { GGS_SERVICES_SLIDES } from './GgsServicesSlide';

const PRICE_PATTERN = /\d{2,3}\.\d{3}|Rp\s?\d/i;

describe('GGS Feed service slides 13–18', () => {
  it('covers slides 13 through 18 in order', () => {
    expect(GGS_SERVICES_SLIDES.map((s) => s.slide)).toEqual([13, 14, 15, 16, 17, 18]);
  });

  it('lists every service name from the price list without any price', () => {
    const names = GGS_SERVICES_SLIDES.flatMap((s) => s.groups.flatMap((g) => g.items));
    expect(names).toHaveLength(61);
    for (const name of names) {
      expect(name, `"${name}" must not contain a price`).not.toMatch(PRICE_PATTERN);
    }
  });

  it('keeps the six categories from the price list', () => {
    expect(GGS_SERVICES_SLIDES.map((s) => s.category)).toEqual([
      'Nail Art',
      'Haircuts & Styling',
      'Colouring & Creambath',
      'Hair Treatment & Keratin',
      'Massage, Body & Face',
      'Bundling Package',
    ]);
  });
});
