import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const convertToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const calcDiscountedPrice = (
  price: number,
  discountRate: number,
): number => {
  return parseInt((price - (price / 100) * discountRate).toFixed(2));
};
