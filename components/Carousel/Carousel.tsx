import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Liste des images
const slides = [
  { title: "1 Series", image: "/images/truck_fincargo_carrier.jpeg" },
  { title: "2 Series", image: "/images/truck_fincargo_carrier.jpeg" },
  { title: "3 Series", image: "/images/truck_fincargo_carrier.jpeg" },
  { title: "4 Series", image: "/images/truck_fincargo_carrier.jpeg" },
  { title: "5 Series", image: "/images/truck_fincargo_carrier.jpeg" },
];

export const Carousel1 = () => {
  return (
    <section className="relative flex items-center gap-12 py-24 mx-2 text-gray-100">
      <Swiper
        grabCursor
        centeredSlides
        slidesPerView={2}
        effect="coverflow"
        loop
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 3,
          slideShadows: true,
        }}
        modules={[Pagination, EffectCoverflow, Autoplay]}
        className="w-full max-w-7xl h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.title}
            className="relative flex items-end justify-center rounded-3xl overflow-hidden shadow-lg"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 -z-10 "
            />
            <div className="relative z-20 text-center text-white p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
              <h2 className="text-lg font-light uppercase tracking-wider mb-2">
                {slide.title}
              </h2>
              <a
                href="#"
                className="inline-block bg-white text-gray-700 font-medium rounded-full px-6 py-2 text-sm uppercase transition-colors duration-300 hover:text-blue-600"
              >
                Explore
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel1;
