import { color } from './color.js';

export function logSuccess(message: string, data?: unknown) {
  console.log(color(32, `${message}`));
  if (data) {
    console.log(color(33, JSON.stringify(data, null, 2)));
  }
}

export function logError(message: string) {
  console.log(color(31, `❌ ${message}`));
}

export function logWarning(message: string) {
  console.log(color(33, `⚠️ ${message}`));
}
