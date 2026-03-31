import test from 'node:test';
import assert from 'node:assert/strict';
import { canCreateResume, deriveResumeTitle, isTemplateAllowedForPlan } from './resume';

test('deriveResumeTitle prefers explicit title', () => {
  assert.equal(
    deriveResumeTitle({
      title: 'Senior Engineer Resume',
      data: {
        personalInfo: {
          fullName: 'Jane Doe',
          jobTitle: 'Engineer',
        },
      },
    }),
    'Senior Engineer Resume',
  );
});

test('deriveResumeTitle falls back to profile details', () => {
  assert.equal(
    deriveResumeTitle({
      data: {
        personalInfo: {
          fullName: 'Jane Doe',
          jobTitle: 'Engineer',
        },
      },
    }),
    'Jane Doe - Engineer',
  );
});

test('free plan only allows the core templates', () => {
  assert.equal(isTemplateAllowedForPlan('modern-pro', 'FREE'), true);
  assert.equal(isTemplateAllowedForPlan('ai-engineer', 'FREE'), false);
  assert.equal(isTemplateAllowedForPlan('ai-engineer', 'PRO'), true);
});

test('free plan limits users to one active resume', () => {
  assert.equal(canCreateResume('FREE', 0), true);
  assert.equal(canCreateResume('FREE', 1), false);
  assert.equal(canCreateResume('PRO', 10), true);
});
