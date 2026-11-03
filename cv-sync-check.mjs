#!/usr/bin/env node

/**
 * cv-sync-check.mjs — Validates that the career-ops setup is consistent.
 *
 * Checks:
 * 1. cv.md exists (user layer)
 * 2. config/profile.yml exists and has required fields
 * 3. No hardcoded metrics in _shared.md or batch/batch-prompt.md (system layer)
 * 4. article-digest.md freshness (if exists)
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { resolveUserRoot } from './user-root.mjs';

const systemRoot = dirname(fileURLToPath(import.meta.url));
const userRoot = resolveUserRoot(systemRoot);

const warnings = [];
const errors = [];

// 1. Check cv.md exists (user layer)
const cvPath = process.env.CAREER_OPS_CV?.trim() || join(userRoot, 'cv.md');
if (!existsSync(cvPath)) {
  errors.push(`cv.md not found at ${cvPath}. Create it with your CV in markdown format.`);
} else {
  const cvContent = readFileSync(cvPath, 'utf-8');
  if (cvContent.trim().length < 100) {
    warnings.push('cv.md seems too short. Make sure it contains your full CV.');
  }
}

// 2. Check profile.yml exists (user layer)
const profilePath = process.env.CAREER_OPS_PROFILE?.trim() || join(userRoot, 'config', 'profile.yml');
if (!existsSync(profilePath)) {
  errors.push(`config/profile.yml not found at ${profilePath}. Copy from config/profile.example.yml and fill in your details.`);
} else {
  const profileContent = readFileSync(profilePath, 'utf-8');
  const requiredFields = ['full_name', 'email', 'location'];
  for (const field of requiredFields) {
    if (!profileContent.includes(field) || profileContent.includes(`"Jane Smith"`)) {
      warnings.push(`config/profile.yml may still have example data. Check field: ${field}`);
      break;
    }
  }
}

// 3. Check for hardcoded metrics in prompt files (system layer)
const filesToCheck = [
  { path: join(systemRoot, 'modes', '_shared.md'), name: '_shared.md' },
  { path: join(systemRoot, 'batch', 'batch-prompt.md'), name: 'batch-prompt.md' },
];

const metricPattern = /\b\d{2,4}\+?\s*(hours?|%|evals?|layers?|tests?|fields?|bases?)\b/gi;

for (const { path, name } of filesToCheck) {
  if (!existsSync(path)) continue;
  const content = readFileSync(path, 'utf-8');

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('NEVER hardcode') || line.includes('NUNCA hardcode') || line.startsWith('#') || line.startsWith('<!--')) continue;
    const matches = line.match(metricPattern);
    if (matches) {
      warnings.push(`${name}:${i + 1} — Possible hardcoded metric: "${matches[0]}". Should this be read from cv.md/article-digest.md?`);
    }
  }
}

// 4. Check article-digest.md freshness (user layer)
const digestPath = process.env.CAREER_OPS_DIGEST?.trim() || join(userRoot, 'article-digest.md');
if (existsSync(digestPath)) {
  const stats = statSync(digestPath);
  const daysSinceModified = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60 * 24);
  if (daysSinceModified > 30) {
    warnings.push(`article-digest.md is ${Math.round(daysSinceModified)} days old. Consider updating if your projects have new metrics.`);
  }
} else {
  warnings.push('article-digest.md not found (optional). Portfolio proof points will be thinner without it.');
}

console.log(`cv-sync-check: userRoot=${userRoot}`);
console.log(`cv-sync-check: systemRoot=${systemRoot}`);

if (errors.length === 0 && warnings.length === 0) {
  console.log('✓ cv-sync-check passed — setup looks consistent.');
  process.exit(0);
}

for (const e of errors) console.error(`ERROR: ${e}`);
for (const w of warnings) console.warn(`WARN: ${w}`);

if (errors.length > 0) {
  console.error(`\ncv-sync-check failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}

console.log(`\ncv-sync-check passed with ${warnings.length} warning(s).`);
process.exit(0);
