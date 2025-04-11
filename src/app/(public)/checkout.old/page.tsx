"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import Label from "@/components/Label/Label";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Radio from "@/shared/Radio/Radio";
import Select from "@/shared/Select/Select";
import PaymentMethod from "./PaymentMethod";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { CartItem, fullCart, LocalCartItem, removeFromCartAsync, removeItemLocally } from "@/lib/features/cart/cartBSlice";
import { getCart } from "@/api/protected";

// Zod schema
const checkoutSchema = z.object({
  contact: z.string()
    .min(1, "Contact is required")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$|^(\+\d{1,3}[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      { message: "Please enter a valid email or phone number" }
    ),
  shipping: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    apt: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    addressType: z.enum(["home", "office"]),
  }),
  billing: z.object({
    sameAsShipping: z.boolean(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    apt: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
  }).refine((data) => {
    if (!data.sameAsShipping) {
      return data.firstName && data.lastName && data.address && data.city && 
             data.country && data.state && data.postalCode;
    }
    return true;
  }, {
    message: "All billing fields are required when different from shipping",
    path: ["billing"],
  }),
});

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const cartData = useAppSelector((state) => state.cartB);
    const userStatus = useAppSelector((state) => state.auth.status);
    const auth = useAppSelector((state) => state.auth);
    const [userCart, setUserCart] = useState<fullCart>();
  
    useEffect(() => {
      const getCartData = async () => {
        if (userStatus === "authenticated" && auth.user) {
          try {
            // Fetch cart data from server
            const response = await getCart(auth.user.token);
            const cartItems = response.data;
            setUserCart(cartItems);
            // console.log('cartItems', cartItems);
            // console.log("response from sync cart", response);
          } catch (error) {
            console.error("Failed to get cart:", error);
          }
        }
      }
      getCartData();
    }, [auth, userStatus]);
  
    const items =
      userStatus === "authenticated" ? userCart?.items : cartData.localItems;
    const totalItems =
      userStatus === "authenticated"
        ? userCart?.totals.total_items
        : cartData.localTotalItems;
    const totalPrice =
      userStatus === "authenticated"
        ? userCart?.totals.total_price
        : cartData.localTotalPrice;

  const [formData, setFormData] = useState({
    contact: "",
    shipping: {
      firstName: "",
      lastName: "",
      address: "",
      apt: "",
      city: "",
      country: "United States",
      state: "",
      postalCode: "",
      addressType: "home" as const,
    },
    billing: {
      sameAsShipping: true,
      firstName: "",
      lastName: "",
      address: "",
      apt: "",
      city: "",
      country: "United States",
      state: "",
      postalCode: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: "contact" | "shipping" | "billing"
  ) => {
    const { name, value } = e.target;
    if (section === "contact") {
      setFormData(prev => ({ ...prev, contact: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    }
  };

  const handleBillingOptionChange = (sameAsShipping: boolean) => {
    setFormData(prev => ({
      ...prev,
      billing: {
        ...prev.billing,
        sameAsShipping
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      checkoutSchema.parse(formData);

      const checkoutData = {
        contact: formData.contact,
        shipping: formData.shipping,
        billing: formData.billing.sameAsShipping ? formData.shipping : formData.billing,
        cartItems: items,
        totalAmount: totalPrice,
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const result = await response.json();
      console.log("Checkout successful:", result);
      // Add success handling (e.g., redirect to thank you page)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Checkout error:", error);
        // Add error handling (e.g., show error message)
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProduct = (item: LocalCartItem | CartItem, index: number) => {
    const { product_image, prices, name, key, product_id, variation, quantity } = item;

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={product_image ? product_image : ""}
            alt={"product image"}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {Array.isArray(variation) && (
                      <>
                        {variation.map((att, i) => (
                          <p key={i}>
                            <span>{att.attribute_title}</span>
                            <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                            <span>{att.attribute_value}</span>
                          </p>
                        ))}
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    price={prices?.regular_price}
                    salePrice={prices?.sale_price}
                    className="mt-0.5"
                  />
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                {/* <NcInputNumber className="relative z-10" /> */}
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices
                  price={prices?.regular_price}
                  salePrice={prices?.sale_price}
                  className="mt-0.5"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* {Math.random() > 0.6
              ? renderStatusSoldout()
              : renderStatusInstock()} */}

            <p className="text-gray-500 dark:text-slate-400">{`Qty ${quantity}`}</p>

            <p
              className="relative cursor-pointer z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
              onClick={async () => {
                if (userStatus === "authenticated") {
                  try {
                    await dispatch(removeFromCartAsync(key || 0)).unwrap();
                    // Optional: Sync only if needed for server consistency
                    // await dispatch(syncCartWithServer()).unwrap();
                  } catch (error) {
                    console.error('Failed to remove item:', error);
                  }
                } else {
                  // console.log("remove locally", product_id);
                  dispatch(removeItemLocally(Number(product_id)));
                }
              }}
            >
              <span>Remove</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              {/* Contact Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="mt-4">
                  <Label className="text-sm">Email or Phone Number</Label>
                  <Input
                    className="mt-1.5"
                    value={formData.contact}
                    onChange={(e) => handleInputChange(e, "contact")}
                  />
                  {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t border-slate-200 py-6 my-6 space-y-6">
                <h3 className="text-lg font-semibold">Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>First name</Label>
                    <Input
                      className="mt-1.5"
                      name="firstName"
                      value={formData.shipping.firstName}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                    {errors["shipping.firstName"] && <p className="mt-1 text-sm text-red-600">{errors["shipping.firstName"]}</p>}
                  </div>
                  <div>
                    <Label>Last name</Label>
                    <Input
                      className="mt-1.5"
                      name="lastName"
                      value={formData.shipping.lastName}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                    {errors["shipping.lastName"] && <p className="mt-1 text-sm text-red-600">{errors["shipping.lastName"]}</p>}
                  </div>
                </div>
                <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                  <div className="flex-1">
                    <Label>Address</Label>
                    <Input
                      className="mt-1.5"
                      name="address"
                      value={formData.shipping.address}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                    {errors["shipping.address"] && <p className="mt-1 text-sm text-red-600">{errors["shipping.address"]}</p>}
                  </div>
                  <div className="sm:w-1/3">
                    <Label>Apt, Suite</Label>
                    <Input
                      className="mt-1.5"
                      name="apt"
                      value={formData.shipping.apt}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input
                      className="mt-1.5"
                      name="city"
                      value={formData.shipping.city}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                    {errors["shipping.city"] && <p className="mt-1 text-sm text-red-600">{errors["shipping.city"]}</p>}
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Select
                      className="mt-1.5"
                      name="country"
                      value={formData.shipping.country}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    >
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>State/Province</Label>
                    <Input
                      className="mt-1.5"
                      name="state"
                      value={formData.shipping.state}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                    {errors["shipping.state"] && <p className="mt-1 text-sm text-red-600">{errors["shipping.state"]}</p>}
                  </div>
                  <div>
                    <Label>Postal code</Label>
                    <Input
                      className="mt-1.5"
                      name="postalCode"
                      value={formData.shipping.postalCode}
                      onChange={(e) => handleInputChange(e, "shipping")}
                    />
                    {errors["shipping.postalCode"] && <p className="mt-1 text-sm text-red-600">{errors["shipping.postalCode"]}</p>}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="border-t border-slate-200 py-6 my-6 space-y-6">
                <h3 className="text-lg font-semibold">Billing Address</h3>
                <div className="space-y-4">
                  <Radio
                    label="Same as shipping address"
                    id="same-as-shipping"
                    name="billing-option"
                    checked={formData.billing.sameAsShipping}
                    onChange={() => handleBillingOptionChange(true)}
                  />
                  <Radio
                    label="Use a different billing address"
                    id="different-billing"
                    name="billing-option"
                    checked={!formData.billing.sameAsShipping}
                    onChange={() => handleBillingOptionChange(false)}
                  />
                </div>
                {!formData.billing.sameAsShipping && (
                  <div className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>First name</Label>
                        <Input
                          className="mt-1.5"
                          name="firstName"
                          value={formData.billing.firstName}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                        {errors["billing.firstName"] && <p className="mt-1 text-sm text-red-600">{errors["billing.firstName"]}</p>}
                      </div>
                      <div>
                        <Label>Last name</Label>
                        <Input
                          className="mt-1.5"
                          name="lastName"
                          value={formData.billing.lastName}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                        {errors["billing.lastName"] && <p className="mt-1 text-sm text-red-600">{errors["billing.lastName"]}</p>}
                      </div>
                    </div>
                    <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                      <div className="flex-1">
                        <Label>Address</Label>
                        <Input
                          className="mt-1.5"
                          name="address"
                          value={formData.billing.address}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                        {errors["billing.address"] && <p className="mt-1 text-sm text-red-600">{errors["billing.address"]}</p>}
                      </div>
                      <div className="sm:w-1/3">
                        <Label>Apt, Suite</Label>
                        <Input
                          className="mt-1.5"
                          name="apt"
                          value={formData.billing.apt}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input
                          className="mt-1.5"
                          name="city"
                          value={formData.billing.city}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                        {errors["billing.city"] && <p className="mt-1 text-sm text-red-600">{errors["billing.city"]}</p>}
                      </div>
                      <div>
                        <Label>Country</Label>
                        <Select
                          className="mt-1.5"
                          name="country"
                          value={formData.billing.country}
                          onChange={(e) => handleInputChange(e, "billing")}
                        >
                          <option value="United States">United States</option>
                          <option value="India">India</option>
                          <option value="Canada">Canada</option>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>State/Province</Label>
                        <Input
                          className="mt-1.5"
                          name="state"
                          value={formData.billing.state}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                        {errors["billing.state"] && <p className="mt-1 text-sm text-red-600">{errors["billing.state"]}</p>}
                      </div>
                      <div>
                        <Label>Postal code</Label>
                        <Input
                          className="mt-1.5"
                          name="postalCode"
                          value={formData.billing.postalCode}
                          onChange={(e) => handleInputChange(e, "billing")}
                        />
                        {errors["billing.postalCode"] && <p className="mt-1 text-sm text-red-600">{errors["billing.postalCode"]}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {errors.billing && !formData.billing.sameAsShipping && <p className="text-sm text-red-600">{errors.billing}</p>}
              </div>

              {/* Payment Method */}
              <div className="border-t border-slate-200 py-6 my-6">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <PaymentMethod />
              </div>
            </div>

            <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16"></div>

            <div className="w-full lg:w-[36%]">
              <h3 className="text-lg font-semibold">Order summary</h3>
              <div className="mt-8 divide-y divide-slate-200/70">
                {items && items.map((item: any, index: any) => renderProduct(item, index))}
              </div>
              <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700">
                <div>
                  <Label className="text-sm">Discount code</Label>
                  <div className="flex mt-1.5">
                    <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                    <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between py-2.5">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ${totalPrice}
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Shipping estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    $5.00
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Tax estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    $24.90
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Order total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <ButtonPrimary
                className="mt-8 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </ButtonPrimary>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;