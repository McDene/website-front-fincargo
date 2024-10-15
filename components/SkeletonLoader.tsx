export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Titre */}
      <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>

      {/* Paragraphe */}
      <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>

      {/* Image de fond */}
      <div className="h-64 bg-gray-300 rounded-lg mx-auto"></div>

      {/* Bouton */}
      <div className="h-12 w-32 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
}
