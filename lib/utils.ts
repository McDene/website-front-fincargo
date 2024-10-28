import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Function to make a GET request to the Strapi API with Axios
 * @param endpoint - The Strapi API endpoint (e.g., /api/hero)
 * @returns - The data from the Strapi API
 */
export const fetchAPI = async (endpoint: string) => {
  try {
    const res = await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
};

/**
 * Function to make a POST request to the Strapi API with Axios
 * @param endpoint - The Strapi API endpoint (e.g., /api/contact-submissions)
 * @param data - The data to send in the body of the POST request
 * @returns - The response data from the Strapi API
 */
export const postAPI = async <T>(endpoint: string, data: T) => {
  // Utilisation de <T> pour un type générique
  try {
    const res = await axios.post(`${API_URL}${endpoint}`, { data });
    return res.data;
  } catch (error) {
    console.error("Error posting data to Strapi:", error);
    return null;
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
