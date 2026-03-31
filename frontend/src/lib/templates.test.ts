import test from 'node:test';
import assert from 'node:assert/strict';
import { getBaseTemplate, getTemplateById, isProTemplate, normalizeTemplateId } from './templates';

test('getBaseTemplate falls back to the professional template for unknown ids', () => {
  assert.equal(getBaseTemplate('missing-template'), 'professional');
});

test('template metadata exposes plan tiers for the new gallery', () => {
  assert.equal(getTemplateById('professional')?.tier, 'FREE');
  assert.equal(isProTemplate('analyst'), true);
  assert.equal(isProTemplate('corporate'), false);
});

test('legacy template ids normalize to supported live templates', () => {
  assert.equal(normalizeTemplateId('modern-pro'), 'professional');
  assert.equal(normalizeTemplateId('classic-exec'), 'corporate');
  assert.equal(normalizeTemplateId('entry-level'), 'simple-ats');
});
