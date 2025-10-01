import type { AppSection } from "./types";

export function log(section: AppSection, text: string): void {
  console.log(`[${section.toUpperCase()}] ${text}`);
}
