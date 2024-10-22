import HeaderSecondary from "@/components/Header/Secondary";
import HeroAbout from "@/components/Hero/HeroAbout";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div>
      <HeaderSecondary />
      <HeroAbout />
      <section className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="pb-10">
              <h2 className="text-7xl font-semibold uppercase mb-3 tracking-wide flex justify-center">
                Fincargo
              </h2>
            </div>

            <div className="flex">
              <p>
                Fincargo is a road transport invoice financing platform
                headquartered in the Swiss Alps, offering cash management
                solutions across selected European markets.
              </p>
              <p>
                At Fincargo, our deep expertise in both logistics and finance
                ensures efficient invoice processing and competitive financing
                options.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
