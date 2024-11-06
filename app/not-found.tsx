import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-lightBlue to-darkBlue text-white text-center">
      <div>
        <h1 className="text-9xl text-white font-bold mb-4">404</h1>
        <p className="text-xl text-blue-950 md:text-2xl font-light mb-8">
          Page Not Found
        </p>
        <Link href="/">
          <button className="px-8 py-3 mt-6 bg-blue-950 text-white font-semibold text-lg rounded-full shadow-lg border-white hover:bg-blue-900 transition duration-300">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
