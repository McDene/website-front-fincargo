import { useTranslation } from "@/hooks/useTranslation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

type Language = "en" | "fr" | "es" | "de";

const testimonialFF = {
  name: "OT Logistica",
  city: "Barcelona",
  role: {
    en: "Warehousing & Distribution (Freight Forwarder)",
    fr: "Entreposage & Distribution (Commissionnaire de transport)",
    de: "Lagerhaltung & Distribution (Spediteur)",
    es: "Almacenaje y distribución (Transitario)",
  },
  text: {
    en: `Fincargo has streamlined our subcontractor invoice inflow and offered us early payment options that helps balancing the extended payment terms of our shippers, especially in spot or project logistics. This flexibility strengthens our cash flow and enhances our ability to commit to reliable subcontractor capacity.`,
    fr: `Fincargo a fluidifié l'arrivée des factures de nos sous-traitants et nous a proposé des options de paiement anticipé, ce qui nous permet d'équilibrer les délais de paiement prolongés de nos clients expéditeurs, notamment sur la logistique spot ou projet. Cette flexibilité renforce notre trésorerie et notre capacité à garantir la disponibilité de sous-traitants fiables.`,
    de: `Fincargo hat den Eingang unserer Subunternehmerrechnungen optimiert und uns Frühzahlungsoptionen angeboten, was hilft, die verlängerten Zahlungsziele unserer Auftraggeber auszugleichen – insbesondere im Spot- oder Projektgeschäft. Diese Flexibilität stärkt unseren Cashflow und unsere Fähigkeit, zuverlässige Subunternehmerkapazitäten zu sichern.`,
    es: `Fincargo ha agilizado la gestión de facturas de nuestros subcontratistas y nos ha ofrecido opciones de pago anticipado, lo que nos ayuda a equilibrar los plazos de pago extendidos de nuestros clientes cargadores, especialmente en logística spot o de proyectos. Esta flexibilidad fortalece nuestro flujo de caja y nuestra capacidad de garantizar capacidad de subcontratistas fiable.`,
  },
};

const titles: Record<Language, string> = {
  en: "What our clients say",
  fr: "Ce que disent nos clients",
  de: "Das sagen unsere Kunden",
  es: "Lo que dicen nuestros clientes",
};

export default function TestimonialsFF() {
  const { language } = useTranslation();
  console.log("language", language);

  const lang2 = language.slice(0, 2) as Language;
  const lang = (
    ["en", "fr", "es", "de"].includes(lang2) ? lang2 : "en"
  ) as Language;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto px-4 lg:px-0">
        <h2 className="text-5xl uppercase font-bold text-center text-darkBlue mb-16 tracking-tight">
          {titles[lang]}
        </h2>
        <div className="grid grid-cols-1 gap-10">
          <div className="rounded-2xl bg-white shadow-sm p-8 flex flex-col items-center transition group">
            <FormatQuoteIcon
              fontSize="large"
              className="mb-4 text-darkBlue opacity-80 group-hover:scale-110 transition"
            />
            <p className="text-lg text-gray-800 font-medium text-center italic leading-relaxed mb-6">
              “{testimonialFF.text[lang]}”
            </p>
            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-darkBlue">
                {testimonialFF.name}
              </span>
              <span className="text-sm text-gray-500">
                {testimonialFF.city} — {testimonialFF.role[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
