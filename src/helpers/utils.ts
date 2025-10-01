import type { AppSection } from "./types";

export function customLog(section: AppSection, text: string): void {
  console.log(`[${section.toUpperCase()}] ${text}`);
}
