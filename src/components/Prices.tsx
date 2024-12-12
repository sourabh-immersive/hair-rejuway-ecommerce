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
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${contentClass}`}>
        {price || salePrice || priceRange ? (
          <span className="text-black text-2xl font-bold !leading-none">
            ₹
            {!salePrice && !price ? (
              <h3 className="inline-block text-xl font-semibold">{String(priceRange)}</h3>
            ) : (
              <>
                <span className="line-through text-lg text-gray-500">{String(price)}</span>
                <h3 className="inline-block pl-2 text-xl font-semibold">{String(salePrice)}</h3>
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
