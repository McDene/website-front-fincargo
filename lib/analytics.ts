declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const pushToDataLayer = (
  eventName: string,
  params: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
};

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string; // Nom de l'action (par ex. "click_footer_link")
  category: string; // Catégorie d'événement (par ex. "Footer")
  label: string; // Étiquette pour identifier l'élément (par ex. "About Us")
  value?: number; // Valeur optionnelle associée à l'événement
}) => {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
    return;
  }
  // Fallback GTM-only: pousse un événement dataLayer consommable par un tag GA4 dans GTM
  pushToDataLayer(action, {
    event_category: category,
    event_label: label,
    value,
  });
};
