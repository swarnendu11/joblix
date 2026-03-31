"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FREE_TEMPLATE_IDS = void 0;
exports.deriveResumeTitle = deriveResumeTitle;
exports.isTemplateAllowedForPlan = isTemplateAllowedForPlan;
exports.canCreateResume = canCreateResume;
const client_1 = require("@prisma/client");
exports.FREE_TEMPLATE_IDS = new Set([
    'professional',
    'simple-ats',
    'corporate',
    'modern-pro',
    'startup-tech',
    'product-manager',
    'classic-exec',
    'legal-counsel',
    'medical-pro',
    'minimal-focus',
    'indie-hacker',
    'freelancer',
    'entry-level',
    'account-executive',
    'tech-lead',
    'engineering-manager',
    'recruiter-pro',
    'hr-generalist',
    'project-coordinator',
    'customer-success',
    'office-admin',
    'retail-manager',
    'hospitality-lead',
    'education-specialist',
    'public-sector',
]);
function deriveResumeTitle(input) {
    const explicitTitle = input.title?.trim();
    if (explicitTitle) {
        return explicitTitle;
    }
    const fullName = input.data?.personalInfo?.fullName?.trim();
    const jobTitle = input.data?.personalInfo?.jobTitle?.trim();
    if (fullName && jobTitle) {
        return `${fullName} - ${jobTitle}`;
    }
    if (fullName) {
        return `${fullName} Resume`;
    }
    if (jobTitle) {
        return `${jobTitle} Resume`;
    }
    return 'Untitled Resume';
}
function isTemplateAllowedForPlan(templateId, plan) {
    return plan === client_1.Plan.PRO || exports.FREE_TEMPLATE_IDS.has(templateId);
}
function canCreateResume(plan, activeResumeCount) {
    return plan === client_1.Plan.PRO || activeResumeCount < 1;
}
