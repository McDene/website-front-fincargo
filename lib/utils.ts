import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fonction pour faire une requête GET à l'API Strapi avec Axios
 * @param endpoint - L'endpoint de l'API Strapi (par exemple: /api/hero)
 * @returns - Les données de l'API Strapi
 */

export const fetchAPI = async (endpoint: string) => {
  try {
    const res = await axios.get(`${API_URL}${endpoint}`);
    // console.log("Data fetched with Axios:", res.data);
    return res.data; // Axios retourne déjà le JSON dans "data"
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
};

/**
 * Fonction utilitaire pour fusionner les classes Tailwind
 * @param inputs - Liste des classes à fusionner
 * @returns - Les classes fusionnées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
