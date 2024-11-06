// SectionInvite.tsx
import Image from "next/image";

interface InviteData {
  Title: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink: string | null;
  Image: {
    url: string;
  };
}

interface SectionInviteProps {
  inviteData: InviteData;
}

export default function SectionInvite({ inviteData }: SectionInviteProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const imageUrl = inviteData.Image.url.startsWith("http")
    ? inviteData.Image.url
    : `${API_URL}${inviteData.Image.url}`;

  return (
    <section
      id="invite"
      className="py-20 md:py-28 px-6 bg-gradient-to-b from-gray-300 to-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <h2 className="text-6xl sm:text-5xl md:text-8xl font-semibold leading-tight mb-10 md:mb-20 text-darkBlue uppercase">
            <span className="text-gray-900">Invite your</span>{" "}
            {inviteData.Title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {inviteData.Paragraph}
          </p>
          <button className="mt-6 px-6 py-3 bg-lightBlue text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-darkBlue ">
            {inviteData.ButtonText}
          </button>
        </div>

        <div className="lg:w-1/2 overflow-hidden rounded-3xl shadow-lg transform transition duration-500 hover:scale-105">
          <Image
            src={imageUrl}
            alt={inviteData.Title}
            width={700}
            height={700}
            className="w-full h-full object-cover rounded-3xl"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
