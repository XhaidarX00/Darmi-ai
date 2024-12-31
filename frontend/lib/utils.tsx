import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * This is useful for conditionally applying Tailwind CSS classes
 * 
 * @param inputs - Class names or conditional class names
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Debounces a function
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the passed function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function(this: any, ...args: Parameters<T>) {
    const context = this

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * Formats a date string to a more readable format
 * 
 * @param dateString - The date string to format
 * @returns A formatted date string
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}