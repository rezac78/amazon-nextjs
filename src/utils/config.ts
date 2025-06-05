export const BASE_URL =
  typeof window === "undefined"
    ? process.env.BASE_URL || ""
    : process.env.NEXT_PUBLIC_BASE_URL_CLIENT || "";
