import test from 'node:test';
import assert from 'node:assert/strict';
import { getOpeningStatus, parseTimeToMinutes } from './hours';

test('parseTimeToMinutes converts HH:MM accurately', () => {
  assert.equal(parseTimeToMinutes('18:00'), 1080);
  assert.equal(parseTimeToMinutes('23:30'), 1410);
});

test('getOpeningStatus returns Aberto agora during Monday dinner service in Sao Paulo (-03:00)', () => {
  // Monday 2026-11-16 at 20:00 America/Sao_Paulo == 23:00 UTC
  const mondayNight = new Date('2026-11-16T23:00:00Z');
  const status = getOpeningStatus(mondayNight);
  assert.equal(status.dayKey, 'mon');
  assert.equal(status.isOpen, true);
  assert.equal(status.label, 'Aberto agora');
  assert.equal(status.detail, 'Até 23:00');
});

test('getOpeningStatus respects extended Friday 23:30 closing hour in Sao Paulo', () => {
  // Friday 2026-11-20 at 23:15 America/Sao_Paulo == Saturday 02:15 UTC
  const fridayLate = new Date('2026-11-21T02:15:00Z');
  const status = getOpeningStatus(fridayLate);
  assert.equal(status.dayKey, 'fri');
  assert.equal(status.isOpen, true);
  assert.equal(status.label, 'Aberto agora');
  assert.equal(status.detail, 'Até 23:30');
});

test('getOpeningStatus returns Fechado before 18:00 and after closing', () => {
  // Wednesday 2026-11-18 at 15:00 America/Sao_Paulo == 18:00 UTC
  const wednesdayAfternoon = new Date('2026-11-18T18:00:00Z');
  const beforeOpen = getOpeningStatus(wednesdayAfternoon);
  assert.equal(beforeOpen.dayKey, 'wed');
  assert.equal(beforeOpen.isOpen, false);
  assert.equal(beforeOpen.label, 'Fechado');
  assert.equal(beforeOpen.detail, 'Abre às 18:00');

  // Thursday 2026-11-19 at 23:05 America/Sao_Paulo == Friday 02:05 UTC
  const thursdayAfterClose = new Date('2026-11-20T02:05:00Z');
  const afterClose = getOpeningStatus(thursdayAfterClose);
  assert.equal(afterClose.dayKey, 'thu');
  assert.equal(afterClose.isOpen, false);
  assert.equal(afterClose.label, 'Fechado');
});
