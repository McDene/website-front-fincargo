import { useTranslation } from "@/hooks/useTranslation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

type Language = "en" | "fr" | "es" | "de";

const testimonial = {
  name: "VISEOL LOGISTICA S.L.",
  city: "Barcelona",
  role: {
    en: "Road Carrier",
    fr: "Transporteur routier",
    de: "Straßentransportunternehmen",
    es: "Transportista por carretera",
  },
  text: {
    en: `Submitting invoices is quick and easy thanks to Fincargo’s automated process. We now get paid in less than 24 hours, without having to chase payments or deal with delays, which gives us the liquidity we need to keep operating with peace of mind.`,
    fr: `Déposer nos factures est devenu simple et rapide grâce au process automatisé de Fincargo. Nous sommes maintenant payés en moins de 24h, sans avoir à relancer ou subir de retards, ce qui nous donne la trésorerie nécessaire pour travailler sereinement.`,
    de: `Das Einreichen von Rechnungen ist dank des automatisierten Prozesses von Fincargo schnell und einfach. Wir werden jetzt in weniger als 24 Stunden bezahlt, ohne Zahlungen hinterherlaufen zu müssen oder mit Verzögerungen konfrontiert zu werden. Das verschafft uns die nötige Liquidität, um unseren Betrieb sorgenfrei aufrechtzuerhalten.`,
    es: `Presentar facturas es rápido y sencillo gracias al proceso automatizado de Fincargo. Ahora cobramos en menos de 24 horas, sin tener que perseguir los pagos ni lidiar con retrasos, lo que nos da la liquidez necesaria para operar con tranquilidad.`,
  },
};

const titles: Record<Language, string> = {
  en: "What our carriers say",
  fr: "Ce que disent nos transporteurs",
  de: "Das sagen unsere Transportunternehmen",
  es: "Lo que dicen nuestros transportistas",
};

export default function Testimonials() {
  const { language } = useTranslation();

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
              “{testimonial.text[lang]}”
            </p>
            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-darkBlue">
                {testimonial.name}
              </span>
              <span className="text-sm text-gray-500">
                {testimonial.city} — {testimonial.role[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
