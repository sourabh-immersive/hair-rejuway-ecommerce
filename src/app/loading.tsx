export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div
        role="status"
        className="w-full p-6 border border-gray-200 rounded-sm shadow-sm animate-pulse dark:border-gray-700"
      >
        {/* First Section: Large Image Placeholder */}
        <div className="flex items-center justify-center w-full h-[400px] bg-gray-300 rounded-sm dark:bg-gray-700">
          <svg
            className="w-20 h-20 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>

        {/* Second Section: Category Grid */}
        <div className="grid grid-cols-5 gap-6 mt-8">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-gray-300 rounded-full dark:bg-gray-700"></div>
              <div className="h-2.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          ))}
        </div>

        <span className="sr-only">Loading dfdfdf...</span>
      </div>
    </>
  );
}
