export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container mt-11">
      <div
        role="status"
        className="w-full rounded-sm shadow-sm animate-pulse dark:border-gray-700"
      >
        {/* First Section: Large Image Placeholder */}
        <div className="flex items-center justify-center w-full h-[350px] bg-gray-300 rounded-sm dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        {/* Second Section: Category Grid */}
        <div className="grid grid-cols-5 gap-6 mt-8">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-40 h-40 bg-gray-300 rounded-full dark:bg-gray-700"></div>
              <div className="h-2.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          ))}
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
