import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number | string;
  salePrice?: number | string;
  priceRange?: number | string;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price,
  salePrice,
  priceRange,
  contentClass = "py-1 px-2 md:py-1.5 md:px-0 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${contentClass}`}>
        {price || salePrice || priceRange ? (
          <span className="text-black text-lg font-bold !leading-none">
            ₹
            {!salePrice && !price ? (
              <h3 className="inline-block text-lg font-semibold">
                {String(priceRange)}
              </h3>
            ) : (
              <>
                {Number(salePrice) === 0 ? (
                  <h3 className="inline-block pl-0 text-lg font-semibold">
                    {String(price)}
                  </h3>
                ) : (
                  <>
                    <h3 className="inline-block pr-1 text-lg font-semibold">
                      {String(salePrice)}
                    </h3>
                    <span className="line-through text-sm text-gray-500">
                      {String(price)}
                    </span>
                  </>
                )}
              </>
            )}
          </span>
        ) : (
          <span className="text-gray-400 text-lg font-bold !leading-none">
            Loading...
          </span>
        )}
      </div>
    </div>
  );
};

export default Prices;
