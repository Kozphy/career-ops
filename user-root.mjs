#!/usr/bin/env node
/**
 * user-root.mjs — Resolve dual-layout installs (user layer outside system folder).
 *
 * Layout A (classic): cv.md lives next to *.mjs → user root === system root.
 * Layout B (this install): personal data in parent of career-ops/ → user root is parent.
 *
 * Override: CAREER_OPS_USER_ROOT=/absolute/path
 * Per-file overrides still win: CAREER_OPS_CV, CAREER_OPS_PROFILE, etc.
 */

import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

/** Directory containing career-ops system scripts (this file's folder). */
export function getSystemRoot(fromMetaUrl = import.meta.url) {
  return dirname(fileURLToPath(fromMetaUrl));
}

/**
 * Canonical user-layer root (cv.md, config/profile.yml, data/, output/, reports/).
 * @param {string} [systemRoot]
 */
export function resolveUserRoot(systemRoot = getSystemRoot()) {
  const env = process.env.CAREER_OPS_USER_ROOT?.trim();
  if (env) return resolve(env);

  const system = resolve(systemRoot);
  const parent = resolve(system, '..');
  const parentCv = join(parent, 'cv.md');
  const systemCv = join(system, 'cv.md');

  // Prefer parent only when it holds the CV and the system folder does not —
  // avoids silently preferring a stale sibling copy when both exist.
  if (existsSync(parentCv) && !existsSync(systemCv)) {
    return parent;
  }
  return system;
}

export function userPath(systemRoot, ...parts) {
  return join(resolveUserRoot(systemRoot), ...parts);
}

/** Env path override, else path under user root. */
export function envOrUserPath(envName, systemRoot, ...parts) {
  const v = process.env[envName]?.trim();
  if (v) return resolve(v);
  return userPath(systemRoot, ...parts);
}

/**
 * Paper size from profile location.
 * United States → letter; Taiwan / UK / EU / default → A4.
 */
export function paperFormatFromProfile(profile) {
  const country = String(profile?.location?.country ?? '').toLowerCase();
  const locLine = String(
    profile?.candidate?.location
      ?? (typeof profile?.location === 'string' ? profile.location : '')
      ?? ''
  ).toLowerCase();
  const blob = `${country} ${locLine}`;
  if (/\b(united states|u\.s\.a\.?\b|u\.s\.|usa|america)\b/.test(blob)) {
    return 'letter';
  }
  return 'a4';
}

/** Prefer candidate.full_name (schema), then legacy full_name / name. */
export function candidateDisplayName(profile) {
  return (
    profile?.candidate?.full_name
    || profile?.full_name
    || profile?.name
    || 'candidate'
  );
}
