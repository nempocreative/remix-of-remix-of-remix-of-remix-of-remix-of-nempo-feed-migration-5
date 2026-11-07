import { GGS_SLIDE_10_DURATION_SECONDS, GGS_SLIDE_10_PROMOS } from './GgsPromoSpesialSlide';

const byTag = (tag: string) => GGS_SLIDE_10_PROMOS.find((promo) => promo.tag === tag);

describe('GGS Feed slide 10 promos', () => {
  it('gives Warna, Smoothing and Massage a discount of up to 30%', () => {
    expect(byTag('Warna · Smoothing · Massage')).toMatchObject({ value: '30', unit: 'percent', lead: ['Diskon', 'up to'] });
  });

  it('gives every Creambath item 15% off', () => {
    expect(byTag('Creambath')).toMatchObject({ value: '15', unit: 'percent', lead: ['Diskon', 'all item'] });
  });

  it('prices Nail Art at Rp35.000', () => {
    expect(byTag('Nail Art')).toMatchObject({ value: '35.000', unit: 'rupiah' });
  });

  it('prices Ratus at Rp45.000', () => {
    expect(byTag('Ratus')).toMatchObject({ value: '45.000', unit: 'rupiah' });
  });

  it('loops all four promos in 16 seconds', () => {
    expect(GGS_SLIDE_10_PROMOS).toHaveLength(4);
    expect(GGS_SLIDE_10_DURATION_SECONDS).toBe(16);
  });
});
