"use client";

import Link from "next/link";
import React, { useState } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Pricing with Buy Now Button */}
      <div className="section bg-blue-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="bg-blue-700 text-white p-4 flex flex-col sm:flex-row justify-between items-center rounded-lg">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold">
                ₹2,250
                <span className="text-gray-300 line-through text-lg ml-2">
                  ₹4,950
                </span>
              </div>
              <p className="text-sm text-gray-200">(Inclusive of all taxes)</p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-md shadow mt-4 sm:mt-0"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Overlay and Bottom Cart Modal */}
      <div
        className={`fixed inset-0 bg-black z-40 bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed bottom-0 left-0 w-full z-50 bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } duration-300 rounded-t-lg`}
      >
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Your Cart (4)</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 font-bold"
            >
              ✕ CLOSE
            </button>
          </div>

          {/* Product List */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-8 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 w-full lg:w-auto">
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg flex flex-col items-center"
                >
                  <img
                    src="/tablets/tab1.png"
                    alt="Product"
                    className="w-20 mb-4 rounded"
                  />
                  <p className="text-base font-semibold mt-2 mb-4 text-center">
                    Hair Rise hair herbs | 100% natural hair supplement
                  </p>
                  <p className="text-blue-700 font-semibold">₹30.25</p>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <div className="border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-8 w-full lg:w-[450px] mt-6 lg:mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Total</h3>
                <div>
                  <p className="text-2xl font-bold">
                    ₹2,250{" "}
                    <span className="text-gray-500 line-through text-lg">
                      ₹4,950
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    (Inclusive of all taxes)
                  </p>
                </div>
              </div>
              <p className="text-sm bg-green-50 border border-gray-200 p-4 mt-6 rounded-2xl">
                or 3 monthly payments of <strong>₹820</strong> at{" "}
                <strong>0%EMI</strong> on UPI Payment
              </p>

              {/* Place Order Button */}
              <Link href={"/checkout"}>
                <button className="bg-blue-700 text-white w-full mt-4 py-3 rounded-md text-lg font-semibold">
                  Place Order
                </button>
              </Link>
              <p className="text-gray-500 text-xs text-center mt-2">
                100% Purchase Protection
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
