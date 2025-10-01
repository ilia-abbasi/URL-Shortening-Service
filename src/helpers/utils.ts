import {
  KEY_CHARSET_SIZE,
  KEY_SIZE,
  SHORT_CODE_CHARSET_SIZE,
  SHORT_CODE_SIZE,
} from "./consts";
import type { AppSection } from "./types";

const chars62 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const chars16 = "0123456789abcdef";

export function customLog(section: AppSection, text: string): void {
  console.log(`[${section.toUpperCase()}] ${text}`);
}

export function generateShortCode(): string {
  let result = "";

  for (let i = 0; i < SHORT_CODE_SIZE; i++) {
    const randomIndex = Math.floor(
      Math.random() * (SHORT_CODE_CHARSET_SIZE - 1)
    );
    result = `${result}${chars62[randomIndex]}`;
  }

  return result;
}

export function generateKey(): string {
  let result = "q";

  for (let i = 0; i < KEY_SIZE - 1; i++) {
    const randomIndex = Math.floor(Math.random() * (KEY_CHARSET_SIZE - 1));
    result = `${result}${chars16[randomIndex]}`;
  }

  return result;
}
