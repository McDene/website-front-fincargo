import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import CareerItem from "@/components/Career/CareerItem";
import Footer from "@/components/Footer";

export default function CareerIdPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <>
      <HeaderSecondary />
      <SectionHeroSmall />
      <CareerItem slug={slug} />
      <Footer />
    </>
  );
}
