/**
 * Utility functions for user input normalization and sanitization.
 * Implements ADR-TS-005 (Email Sanitization & Normalization).
 */

/**
 * Normalizes an email by trimming whitespace and converting to lowercase.
 *
 * @param email Raw email input from user form
 * @returns Sanitized and normalized email
 */
export function normalizeEmail(email: string): string {
  if (!email) {
    return '';
  }
  return email.trim().toLowerCase();
}

/**
 * Validates whether an email string adheres to basic standard email regex.
 */
export function isValidEmailFormat(email: string): boolean {
  const normalized = normalizeEmail(email);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(normalized);
}

/**
 * Escapes unsafe characters for safe DOM presentation.
 */
export function sanitizeDisplayText(text: string): string {
  if (!text) {
    return '';
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
