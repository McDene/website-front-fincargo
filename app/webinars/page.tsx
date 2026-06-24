import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";
import WebinarsContent from "@/components/Webinars/WebinarsContent";

export const metadata = {
  title: "Webinars — Stay ahead across the order-to-cash journey",
  description:
    "Free live Fincargo webinars on the regulation, digitalisation and financing of transport & logistics — e-CMR / e-Documento de Control, e-invoicing, invoice integrity and supply chain finance.",
  alternates: { canonical: "/webinars" },
  openGraph: {
    title: "Fincargo Webinars",
    description:
      "Live sessions with Fincargo experts and industry associations on the regulation, digitalisation and financing of transport & logistics.",
    url: "/webinars",
    type: "website",
  },
};

export default function WebinarsPage() {
  return (
    <>
      <Header />
      <WebinarsContent />
      <Footer />
    </>
  );
}
