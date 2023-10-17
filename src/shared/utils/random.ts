import { randomBytes } from 'node:crypto';

export function generateRandomString(length: number): string {
  return randomBytes(length / 2).toString('hex'); // as hex conversion is 2 * length
}
