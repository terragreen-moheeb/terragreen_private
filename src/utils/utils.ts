import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export class CustomUtils {
  static parseFormattedNumber(value: string): number | null {
    const cleaned = value.replace(/\./g, "").replace(/,/g, ".");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }

    // Funktion zum Formatieren von Zahlen mit deutschen Tausendertrennern
  static formatNumber = (value: number | string | null | undefined): string => {
    if (!value || value === null || value === undefined) return "";
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return "";
    
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

}
