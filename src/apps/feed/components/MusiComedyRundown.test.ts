import { describe, expect, it } from 'vitest';
import { musicomedyRundown, rundownDuration, rundownSocial } from './MusiComedyRundown';
import { rundownGreeting, rundownGreetingAnchor, rundownGreetingRules } from './MusiComedySapaan';
import { rundownDoc, rundownDocGroups, rundownDocRules } from './MusiComedyDokumentasi';

// "17.00 – 17.40" / "17.47" -> minutes after midnight.
function minutes(value: string): number {
  const [h, m] = value.trim().split('.');
  return Number(h) * 60 + Number(m);
}

function span(time: string): { start: number; end: number } {
  const [from, to] = time.split('–');
  return { start: minutes(from), end: minutes(to ?? from) };
}

describe('MusiComedy Night rundown times', () => {
  it('gives every row a concrete clock time', () => {
    expect(musicomedyRundown.every((row) => /^\d{2}\.\d{2}( – \d{2}\.\d{2})?$/.test(row.time))).toBe(true);
  });

  it('shows a length in minutes for every row, adzan gaps included', () => {
    expect(musicomedyRundown.map((_, i) => rundownDuration(i))).toEqual([
      115, 40, 23, 40, 24, 10, 25, 15, 25, 20, 45, 30, 50,
    ]);
  });

  it('points readers to NEMPO and Kala Muda channels, website and event WhatsApp', () => {
    expect(rundownSocial.map((s) => s.href)).toEqual([
      'https://instagram.com/nempo.id',
      'https://tiktok.com/@nempo.id',
      'https://www.nempogarut.com',
      'https://wa.me/6285724981356',
      'https://www.instagram.com/kalamudacom/',
    ]);
    expect(rundownSocial.map((s) => s.brand)).toEqual([
      'nempo', 'nempo', 'nempo', 'nempo', 'kalamuda',
    ]);
  });

  it('uses the adzan times the owner gave as the prayer-break anchors', () => {
    const breaks = musicomedyRundown.filter((row) => row.kind === 'pray').map((row) => row.time);
    expect(breaks).toEqual(['17.47', '18.56']);
  });

  it('keeps every item inside the 15.00–23.00 event window and in order', () => {
    const spans = musicomedyRundown.map((row) => span(row.time));
    expect(spans[0].start).toBe(15 * 60);
    expect(spans[spans.length - 1].end).toBe(23 * 60);
    spans.forEach((s) => {
      expect(s.start).toBeGreaterThanOrEqual(15 * 60);
      expect(s.end).toBeLessThanOrEqual(23 * 60);
      expect(s.end).toBeGreaterThanOrEqual(s.start);
    });
    for (let i = 1; i < spans.length; i += 1) {
      expect(spans[i].start).toBeGreaterThanOrEqual(spans[i - 1].start);
    }
  });

  it('sits the Maghrib set after the 17.47 adzan and the main show after Isya', () => {
    const at = (title: string) => span(musicomedyRundown.find((r) => r.title === title)!.time).start;
    expect(at('Solo Vokal (Sesi 1)')).toBeLessThan(minutes('17.47'));
    expect(at('Solo Vokal (Sesi 2)')).toBeGreaterThan(minutes('17.47'));
    expect(at('Solo Vokal (Sesi 2)')).toBeLessThan(minutes('18.56'));
    expect(at('Opening Bumper')).toBeGreaterThan(minutes('18.56'));
  });
});

describe('MusiComedy Night greeting reference (page 2)', () => {
  const allText = [...rundownGreeting.flatMap((c) => [...c.lines, c.note]), ...rundownGreetingRules].join(' ');

  it('routes every booking question to the event WhatsApp number used on page 1', () => {
    expect(allText).toContain('0857-2498-1356');
    expect(rundownGreetingRules.join(' ')).toContain('0857-2498-1356');
  });

  it('quotes the same prayer-break times the rundown is anchored to', () => {
    expect(rundownGreetingAnchor).toContain('Maghrib 17.47');
    expect(rundownGreetingAnchor).toContain('Isya 18.56');
  });

  it('keeps the greeting free of channels the site does not have', () => {
    expect(allText).not.toContain('kalamuda.com');
    expect(allText).toContain('@kalamudacom');
  });
});

describe('MusiComedy Night cashier step (page 2)', () => {
  it('sends guests to the cashier for a menu order and a table number', () => {
    const lines = rundownGreeting[0].lines.join(' ');
    expect(lines).toContain('kasir');
    expect(lines).toContain('order');
    expect(lines).toContain('nomor meja');
  });
});

describe('MusiComedy Night greeting wording', () => {
  it('addresses guests as Kak, never Bapak/Ibu', () => {
    const text = rundownGreeting.flatMap((c) => [...c.lines, c.note]).join(' ');
    expect(text).not.toContain('Bapak');
    expect(text).toContain('Kak');
  });
});

describe('MusiComedy Night documentation reference (page 3)', () => {
  const docText = [...rundownDoc.flatMap((c) => [...c.lines, c.note ?? '']), ...rundownDocRules].join(' ');

  it('names every act the rundown lists so nothing is missed on camera', () => {
    for (const act of ['Berlin', 'Melodi', 'Saduli Ragap', 'Pencungan', 'Mojang']) {
      expect(docText).toContain(act);
    }
  });

  it('routes the hand-off to the same event WhatsApp number', () => {
    expect(docText).toContain('0857-2498-1356');
    expect(rundownDocRules.join(' ')).toContain('0857-2498-1356');
  });

  it('keeps the reference free of channels the site does not have', () => {
    expect(docText).not.toContain('kalamuda.com');
    expect(docText).toContain('@kalamudacom');
  });

  it('keeps photo notes and video notes in their own columns', () => {
    const [photo, video] = rundownDocGroups;
    expect(photo.medium).toBe('Foto');
    expect(video.medium).toBe('Video');
    const photoText = photo.cards.flatMap((c) => [...c.lines, c.note ?? '']).join(' ');
    const videoText = video.cards.flatMap((c) => [...c.lines, c.note ?? '']).join(' ');
    expect(photoText).not.toMatch(/rekam|video/i);
    expect(videoText).not.toMatch(/foto/i);
  });
});
