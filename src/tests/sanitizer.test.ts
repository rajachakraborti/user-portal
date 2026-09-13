import { describe, it, expect } from 'vitest';
import { normalizeEmail, isValidEmailFormat, sanitizeDisplayText } from '../utils/sanitizer';

describe('Sanitizer Utilities', () => {
  describe('normalizeEmail', () => {
    it('strips surrounding whitespace and lowercases uppercase input', () => {
      const input = '   User.Admin@EXAMPLE.COM   ';
      expect(normalizeEmail(input)).toBe('user.admin@example.com');
    });

    it('handles empty string gracefully', () => {
      expect(normalizeEmail('')).toBe('');
    });
  });

  describe('isValidEmailFormat', () => {
    it('validates compliant email', () => {
      expect(isValidEmailFormat('alice@devex.io')).toBe(true);
    });

    it('rejects invalid email without domain or @', () => {
      expect(isValidEmailFormat('not-an-email')).toBe(false);
    });
  });

  describe('sanitizeDisplayText', () => {
    it('escapes script tags and HTML injection tokens', () => {
      const unsafe = '<script>alert("xss")</script>';
      expect(sanitizeDisplayText(unsafe)).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });
  });
});
