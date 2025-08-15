import { clsx, type ClassValue } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown, message: string) => {
  console.error(message, error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
