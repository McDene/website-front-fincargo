export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      {/* Text */}
      <p className="ml-4 text-blue-500 text-lg font-semibold">Loading...</p>
    </div>
  );
}
