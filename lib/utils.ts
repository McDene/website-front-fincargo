import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toStrapiLocale, type UILocale, detectServerRegion, detectClientRegion } from "@/lib/i18n";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FALLBACK_API_URL =
  process.env.NEXT_PUBLIC_FALLBACK_API_URL ||
  "https://fincargo-backend-website.onrender.com";

const errorSummary = (e: unknown): string => {
  if (typeof e === "string") return e;
  if (typeof e === "object" && e !== null) {
    const obj = e as Record<string, unknown>;
    const code = typeof obj.code === "string" ? obj.code : undefined;
    const message = typeof obj.message === "string" ? obj.message : undefined;
    return [code, message].filter(Boolean).join(": ") || "Unknown error";
  }
  return "Unknown error";
};

// Some environments resolve "localhost" to IPv6 (::1) while Strapi binds IPv4 (127.0.0.1)
// Normalize localhost → 127.0.0.1 to avoid ECONNREFUSED ::1:1337 issues.
const normalizeLocalhost = (base?: string): string | undefined => {
  if (!base) return base;
  try {
    const u = new URL(base);
    if (u.hostname === "localhost") {
      u.hostname = "127.0.0.1";
      return u.toString().replace(/\/$/, ""); // keep no trailing slash to match original style
    }
    return base;
  } catch {
    // If not a valid URL, fallback to string replace
    return base.replace("://localhost", "://127.0.0.1");
  }
};

/**
 * Function to make a GET request to the Strapi API with Axios
 * @param endpoint - The Strapi API endpoint (e.g., /api/hero)
 * @returns - The data from the Strapi API
 */
export const fetchAPI = async (
  endpoint: string,
  locale: UILocale = "en"
) => {
  try {
    const separator = endpoint.includes("?") ? "&" : "?";
    const baseLocale = toStrapiLocale(locale);
    const region = typeof window === "undefined" ? await detectServerRegion() : detectClientRegion();
    const strapiLocale = (() => {
      if (region === "be") {
        // Belgium site serves English content from en-BE
        return "en-BE";
      }
      return baseLocale;
    })();
    const buildUrl = (base: string | undefined) =>
      `${normalizeLocalhost(base)}${endpoint}${separator}locale=${strapiLocale}`;

    // First attempt: primary API_URL
    const primaryUrl = buildUrl(API_URL);
    const res = await axios.get(primaryUrl, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });

    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Error fetching from primary Strapi:", errorSummary(error));
    }
    // Fallback to remote API if primary fails (useful when localhost Strapi is down)
    try {
      if (!FALLBACK_API_URL || FALLBACK_API_URL === API_URL) throw error;
      const separator = endpoint.includes("?") ? "&" : "?";
      const baseLocale = toStrapiLocale(locale);
      const region = typeof window === "undefined" ? await detectServerRegion() : detectClientRegion();
      const strapiLocale = (() => {
        if (region === "be") {
          return "en-BE";
        }
        return baseLocale;
      })();
      const fallbackUrl = `${normalizeLocalhost(FALLBACK_API_URL)}${endpoint}${separator}locale=${strapiLocale}`;
      const res2 = await axios.get(fallbackUrl, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });
      if (process.env.NODE_ENV !== "production") {
        console.info("Fetched from fallback Strapi base:", FALLBACK_API_URL);
      }
      return res2.data;
    } catch (fallbackError) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "Error fetching data from Strapi (fallback):",
          errorSummary(fallbackError)
        );
      }
      return null;
    }
  }
};

/**
 * Function to make a POST request to the Strapi API with Axios
 * @param endpoint - The Strapi API endpoint (e.g., /api/contact-submissions)
 * @param data - The data to send in the body of the POST request
 * @returns - The response data from the Strapi API
 */
export const postAPI = async <T>(endpoint: string, data: T) => {
  try {
    const res = await axios.post(
      `${API_URL}${endpoint}`,
      { data },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Error posting to primary Strapi:", errorSummary(error));
    }
    // Attempt fallback POST as a best-effort (ensure CORS is configured)
    try {
      if (!FALLBACK_API_URL || FALLBACK_API_URL === API_URL) throw error;
      const res2 = await axios.post(
        `${FALLBACK_API_URL}${endpoint}`,
        { data },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (process.env.NODE_ENV !== "production") {
        console.info("Posted to fallback Strapi base:", FALLBACK_API_URL);
      }
      return res2.data;
    } catch (fallbackError) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "Error posting data to Strapi (fallback):",
          errorSummary(fallbackError)
        );
      }
      return null;
    }
  }
};

/**
 * Utility function to merge Tailwind classes
 * @param inputs - List of classes to merge
 * @returns - The merged classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
