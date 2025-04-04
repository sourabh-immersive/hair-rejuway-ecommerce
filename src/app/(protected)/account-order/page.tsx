"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import Prices from "@/components/Prices";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import { getOrderDetails, getOrders } from "@/api/protected";

interface OrderItem {
  id: number;
  number: string;
  total_item: string;
  total: string;
  status: string;
  details: string;
  created_at: string;
  updated_at: string;
}

interface OrderDetails {
  status: boolean;
  data: {
    ordered_products: {
      totalQty: number;
      totalPrice: number;
      items: {
        product_id: string;
        product_qty: number;
        variation: {
          attribute_id: number;
          attribute_title: string;
          attribute_value: string;
        }[];
        product_name: string;
        product_details: string;
        product_price: number;
        product_photo: string;
      }[];
    };
    number: string;
    total: string;
    status: string;
    payment_status: string;
    method: string;
    payment_url: string;
    shipping_name: string;
    shipping_email: string;
    shipping_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_zip: string;
    shipping_country: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    customer_zip: string;
    customer_city: string;
    customer_country: string;
    shipping: string;
    paid_amount: number;
    payment_method: string;
    shipping_cost: string;
    packing_cost: string;
    sub_total: string;
    gst_amount: string;
    coupon_discount: string;
    charge_id: string;
    transaction_id: string;
    platform_cost: string;
    created_at: string;
    updated_at: string;
  };
}

const AccountOrder: React.FC = () => {
  const { user, status: userStatus } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    [key: number]: OrderDetails;
  }>({});

  // Fetch orders on mount and when page changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (userStatus !== "authenticated" || !user?.token) {
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await getOrders(user.token);
        if (response.status) {
          setOrders(response.data.data);
          // setLastPage(response.data.meta.last_page);
        } else {
          throw new Error("Failed to load orders");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userStatus, user?.token, currentPage]);

  const handleViewOrder = async (orderId: number) => {
    if (!user?.token) return;

    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }

    if (!orderDetails[orderId]) {
      try {
        const response = await getOrderDetails(user.token, orderId);
        if (!response.status) {
          throw new Error("Failed to fetch order details");
        }
        setOrderDetails((prev) => ({ ...prev, [orderId]: response }));
        console.log("orderDetails", orderDetails);
      } catch (err) {
        console.error("Error fetching order details:", err);
        return;
      }
    }

    setExpandedOrderId(orderId);
  };

  const renderProductItem = (item: any, index: number) => (
    <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
      <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          fill
          sizes="100px"
          src={item.product_photo}
          alt={item.product_name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-base font-medium line-clamp-1">
                {item.product_name}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.variation.map((v: any) => (
                  <span key={v.attribute_id}>
                    {v.attribute_title}: {v.attribute_value}{" "}
                  </span>
                ))}
              </p>
            </div>
            <Prices price={item.product_price} salePrice={item.product_price} />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 dark:text-slate-400 flex items-center">
            <span className="hidden sm:inline-block">Qty</span>
            <span className="inline-block sm:hidden">x</span>
            <span className="ml-2">{item.product_qty}</span>
          </p>
        </div>
      </div>
    </div>
  );

  const renderOrder = (order: OrderItem) => {
    const details = orderDetails[order.id];
    const isExpanded = expandedOrderId === order.id;

    return (
      <div
        key={order.id}
        className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#{order.number}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>{order.created_at}</span>
              <span className="mx-2">·</span>
              <span
                className={`text-${
                  order.status === "pending" ? "yellow" : "primary"
                }-500`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
              onClick={() => handleViewOrder(order.id)}
            >
              {isExpanded ? "Hide Details" : "View Order"}
            </ButtonSecondary>
          </div>
        </div>
        {isExpanded && details && (
          <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8">
            <div className="mt-0">
              <h3 className="text-2xl font-semibold mb-6 pb-6 border-b border-gray-200">Order Details</h3>
              <div className="divide-y divide-slate-200 dark:divide-slate-700 mt-2">
                {details.data.ordered_products.items.map(renderProductItem)}
              </div>
              <div className="mt-10">
                <h4 className="text-2xl font-semibold mb-6 pb-6 border-b border-gray-200">Shipping Information</h4>
                <p>{details.data.shipping_name}</p>
                <p>{details.data.shipping_address}</p>
                <p>
                  {details.data.shipping_city}, {details.data.shipping_zip}
                </p>
                <p>{details.data.shipping_country}</p>
                <p>Email: {details.data.customer_email}</p>
                <p>Phone: {details.data.customer_phone}</p>
                <p>Total Items: {order.total_item}</p>
                <p>Total: {order.total}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="container py-10">Loading...</div>;
  }

  if (error) {
    return <div className="container py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {orders.map(renderOrder)}
        </>
      )}
    </div>
  );
};

export default AccountOrder;
