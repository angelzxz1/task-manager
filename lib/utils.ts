import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// This function will receive a Date and will return a string with this format MM/DD/YYYY
export const FormatDate = (date: Date) => {
    const newDate = new Date(date);
    return `${addZero(newDate.getMonth() + 1)}/${addZero(
        newDate.getDate()
    )}/${newDate.getFullYear()}`;
};

const addZero = (num: number) => (num < 10 ? `0${num}` : num);
