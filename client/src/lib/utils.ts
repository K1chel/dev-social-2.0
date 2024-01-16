import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateDistance = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);

  const diffInSeconds = differenceInSeconds(now, date);
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  const diffInMinutes = differenceInMinutes(now, date);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  const diffInHours = differenceInHours(now, date);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const diffInDays = differenceInDays(now, date);
  if (diffInDays < 30) {
    return `${diffInDays}d`;
  }

  const diffInMonths = differenceInMonths(now, date);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo`;
  }

  const diffInYears = differenceInYears(now, date);
  return `${diffInYears}y`;
};
