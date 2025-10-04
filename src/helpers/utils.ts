import {
  KEY_CHARSET_SIZE,
  KEY_SIZE,
  SHORT_CODE_CHARSET_SIZE,
  SHORT_CODE_SIZE,
} from "./consts.js";
import { Tag } from "./types.js";

const chars62 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const chars16 = "0123456789abcdef";

export function customLog(
  tags: Tag | Tag[],
  text: string,
  haveTestTag = false
): void {
  if (typeof tags === "string") {
    tags = [tags];
  }

  if (haveTestTag && !tags.includes("test")) {
    tags.push("test");
  }

  let tagString = "";
  for (const tag of tags) {
    tagString = `${tagString}[${tag.toUpperCase()}] `;
  }

  console.log(`${tagString}${text}`);
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

export function getDifferentShortCode(shortCode: string): string {
  if (shortCode.length !== SHORT_CODE_SIZE) {
    return shortCode;
  }

  const result = "aaaaaa";
  if (shortCode !== result) {
    return result;
  }

  return "aaaaab";
}

export function getDifferentKey(key: string): string {
  if (key.length !== KEY_SIZE) {
    return key;
  }

  const result = "q2345678901234567890123456789012";
  if (key !== result) {
    return result;
  }

  return "q234567890123456789012345678901a";
}
