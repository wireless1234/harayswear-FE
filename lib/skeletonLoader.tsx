export const ProductSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-4 animate-pulse">
      <div className="w-full h-[409px] bg-gray-800 rounded-4xl" />
      <div className="flex flex-col space-y-4 bg-black px-8 py-6 w-full max-w-lg">
        <div className="h-10 bg-gray-800 rounded w-3/4 mx-auto md:mx-0" />
        <div className="h-6 bg-gray-700 rounded w-full" />
        <div className="h-6 bg-gray-700 rounded w-5/6" />
        <div className="h-12 bg-gray-800 rounded-full w-1/2 mx-auto md:mx-0" />
      </div>
    </div>
  );
  