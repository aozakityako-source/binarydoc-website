import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFirmware } from './gen-firmware.mjs';

test('parses families with donors + per-file snapshot', () => {
  const root = mkdtempSync(join(tmpdir(), 'fw-'));
  // Bacall-59: two donors, one with a nested DiskConfig subdir
  mkdirSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor1', 'DiskConfig'), { recursive: true });
  mkdirSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor2'), { recursive: true });
  mkdirSync(join(root, 'Seagate F3 Arch', 'Bogart-4F', 'donor1'), { recursive: true });
  // Apollo: family folder only, no donors (empty-family edge case)
  mkdirSync(join(root, 'WDC Marvell', 'Apollo'), { recursive: true });

  writeFileSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor1', 'ROM.bin'), '0123456789'); // 10 bytes
  writeFileSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor1', 'DiskConfig', 'dc.bin'), 'abc'); // 3 bytes
  writeFileSync(join(root, 'Seagate F3 Arch', 'Bacall-59', 'donor2', 'Volume.bin'), 'xx'); // 2 bytes

  const fams = parseFirmware(root);

  assert.equal(fams.length, 3);
  // sorted by manufacturer then familyCode
  assert.equal(fams[0].manufacturer, 'Seagate');

  const bacall = fams.find((f) => f.familyCode === 'Bacall-59');
  assert.equal(bacall.manufacturer, 'Seagate');
  assert.equal(bacall.arch, 'F3 Arch');
  assert.equal(bacall.donorCount, 2);
  assert.equal(bacall.donors.length, 2);
  assert.equal(bacall.totalBytes, 15); // 10 + 3 + 2

  const donor1 = bacall.donors.find((d) => d.name === 'donor1');
  assert.equal(donor1.fileCount, 2);
  assert.equal(donor1.totalBytes, 13); // 10 + 3
  assert.equal(donor1.files.find((f) => f.path === 'ROM.bin').size, 10);
  assert.equal(donor1.files.find((f) => f.path === 'DiskConfig/dc.bin').size, 3);

  const donor2 = bacall.donors.find((d) => d.name === 'donor2');
  assert.equal(donor2.fileCount, 1);
  assert.equal(donor2.totalBytes, 2);

  // empty family: no donors, zero totals
  const apollo = fams.find((f) => f.familyCode === 'Apollo');
  assert.equal(apollo.manufacturer, 'Western Digital');
  assert.equal(apollo.arch, 'Marvell');
  assert.equal(apollo.donors.length, 0);
  assert.equal(apollo.donorCount, 0);
  assert.equal(apollo.totalBytes, 0);

  rmSync(root, { recursive: true, force: true });
});
