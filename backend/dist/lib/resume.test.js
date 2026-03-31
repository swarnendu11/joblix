"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const resume_1 = require("./resume");
(0, node_test_1.default)('deriveResumeTitle prefers explicit title', () => {
    strict_1.default.equal((0, resume_1.deriveResumeTitle)({
        title: 'Senior Engineer Resume',
        data: {
            personalInfo: {
                fullName: 'Jane Doe',
                jobTitle: 'Engineer',
            },
        },
    }), 'Senior Engineer Resume');
});
(0, node_test_1.default)('deriveResumeTitle falls back to profile details', () => {
    strict_1.default.equal((0, resume_1.deriveResumeTitle)({
        data: {
            personalInfo: {
                fullName: 'Jane Doe',
                jobTitle: 'Engineer',
            },
        },
    }), 'Jane Doe - Engineer');
});
(0, node_test_1.default)('free plan only allows the core templates', () => {
    strict_1.default.equal((0, resume_1.isTemplateAllowedForPlan)('modern-pro', 'FREE'), true);
    strict_1.default.equal((0, resume_1.isTemplateAllowedForPlan)('ai-engineer', 'FREE'), false);
    strict_1.default.equal((0, resume_1.isTemplateAllowedForPlan)('ai-engineer', 'PRO'), true);
});
(0, node_test_1.default)('free plan limits users to one active resume', () => {
    strict_1.default.equal((0, resume_1.canCreateResume)('FREE', 0), true);
    strict_1.default.equal((0, resume_1.canCreateResume)('FREE', 1), false);
    strict_1.default.equal((0, resume_1.canCreateResume)('PRO', 10), true);
});
