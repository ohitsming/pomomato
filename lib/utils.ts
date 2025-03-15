import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
    if(seconds > 0) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60 | 0;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } 
    return '00:00'
};

export const extractTextFromHtml = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
};