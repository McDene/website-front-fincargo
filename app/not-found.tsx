import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkBlue to-black text-white text-center overflow-hidden">
      <div>
        <h1 className="lg:text-[20rem] text-[10rem] text-gray-100 font-bold mb-4">
          404
        </h1>
        <p className="text-xl text-gray-100 md:text-2xl font-light mb-8">
          Page Not Found
        </p>
        <Link href="/">
          <button className="px-8 py-3 mt-6 bg-darkBlue text-white font-semibold text-lg rounded-full shadow-lg border-white hover:bg-lightBlue transition duration-300">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
