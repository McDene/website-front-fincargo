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
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
