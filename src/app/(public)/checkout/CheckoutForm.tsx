import React, { useState, useCallback, useEffect } from "react";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { syncCartWithServer } from "@/lib/features/cart/cartBSlice";
import ContactInfo from "./ContactInfo";
import ShippingAddress from "./ShippingAddress";
import BillingAddress from "./BillingAddress";
import OrderSummary from "./OrderSummary";
import { useRouter } from "next/navigation";
import { doCheckout } from "@/api/protected";

const checkoutSchema = z.object({
  contact: z
    .string()
    .min(1, "Contact is required")
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\+?[1-9]\d{1,14}$/.test(value),
      { message: "Invalid email or phone" }
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
    phone: z.string().min(1, "Phone is required").refine(
      (value) => /^\+?[1-9]\d{1,14}$/.test(value),
      { message: "Invalid phone number format" }
    ), // Required phone
  }),
  billing: z
    .object({
      sameAsShipping: z.boolean(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      address: z.string().optional(),
      apt: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      phone: z.string().optional(), // Optional phone
    })
    .refine(
      (data) =>
        data.sameAsShipping ||
        (data.firstName && data.lastName && data.address && data.city && data.country && data.state && data.postalCode),
      { message: "All billing fields except phone are required" }
    ),
});

type FormData = z.infer<typeof checkoutSchema>;

const CheckoutForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    items,
    localItems,
    totalItems,
    localTotalItems,
    totalPrice,
    localTotalPrice,
    isLoading,
  } = useAppSelector((state) => state.cartB);
  const { status: userStatus, user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
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
      phone: "", // Added phone
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
      phone: "", // Added phone
    },
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = userStatus === "authenticated" ? items : localItems;
  const cartTotalItems = userStatus === "authenticated" ? totalItems : localTotalItems;
  const cartTotalPrice = userStatus === "authenticated" ? totalPrice : localTotalPrice;

  useEffect(() => {
    if (userStatus === "authenticated" && user?.token) {
      dispatch(syncCartWithServer());
    }
  }, [userStatus, user?.token, dispatch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: keyof FormData) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [section]: section === "contact" ? value : { ...prev[section], [name]: value },
      }));
    },
    []
  );

  const handleBillingToggle = useCallback((sameAsShipping: boolean) => {
    setFormData((prev) => ({
      ...prev,
      billing: { ...prev.billing, sameAsShipping },
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = checkoutSchema.parse(formData);

      const checkoutData = {
        cart: cartItems.map((item: any) => ({
          product_id: String(item.id),
          product_qty: String(item.product_qty || item.quantity || 1),
          variation: item.variation || [],
        })),
        shipping: "Standard Shipping",
        payment_method: "COD",
        customer_name: `${validatedData.shipping.firstName} ${validatedData.shipping.lastName}`,
        customer_email: validatedData.contact.includes("@") ? validatedData.contact : "",
        customer_country: validatedData.shipping.country,
        customer_phone: validatedData.shipping.phone, // Use shipping phone as primary
        customer_address: `${validatedData.shipping.address}${validatedData.shipping.apt ? `, ${validatedData.shipping.apt}` : ""}`,
        customer_city: validatedData.shipping.city,
        customer_zip: validatedData.shipping.postalCode,
        shipping_address: {
          shipping_name: `${validatedData.shipping.firstName} ${validatedData.shipping.lastName}`,
          company: "",
          address_1: validatedData.shipping.address,
          address_2: validatedData.shipping.apt || "",
          city: validatedData.shipping.city,
          state: validatedData.shipping.state,
          postcode: validatedData.shipping.postalCode,
          country: validatedData.shipping.country,
        },
        billing_address: validatedData.billing.sameAsShipping
          ? {
              billing_name: `${validatedData.shipping.firstName} ${validatedData.shipping.lastName}`,
              company: "",
              address_1: validatedData.shipping.address,
              address_2: validatedData.shipping.apt || "",
              city: validatedData.shipping.city,
              state: validatedData.shipping.state,
              postcode: validatedData.shipping.postalCode,
              country: validatedData.shipping.country,
              email: validatedData.contact.includes("@") ? validatedData.contact : "",
              phone: validatedData.shipping.phone, // Use shipping phone if same
            }
          : {
              billing_name: `${validatedData.billing.firstName} ${validatedData.billing.lastName}`,
              company: "",
              address_1: validatedData.billing.address || "",
              address_2: validatedData.billing.apt || "",
              city: validatedData.billing.city || "",
              state: validatedData.billing.state || "",
              postcode: validatedData.billing.postalCode || "",
              country: validatedData.billing.country || "",
              email: validatedData.contact.includes("@") ? validatedData.contact : "",
              phone: validatedData.billing.phone || validatedData.shipping.phone, // Fallback to shipping phone
            },
      };

      console.log("Checkout data:", checkoutData);


      const token = user?.token;
      if (!token && userStatus === "authenticated") {
        throw new Error("Authentication token missing");
      }

      if (token) {
        const response = await doCheckout(token, checkoutData);

        console.log("Checkout response:", response.status);

        // if (!response.ok) {
        //   const errorData = await response;
        //   throw new Error(errorData.message || "Checkout failed");
        // }

        if (response.status) {
          console.log("Checkout successful:", response.message);
          router.push(`/thank-you?order_number=${response.order_number}`);
        } else {
          throw new Error(response.message || "Order placement failed");
        }
      } else {
        throw new Error("User must be authenticated to checkout");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<string, string>> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path.join(".")] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Checkout error:", error);
        setErrors({
          submit: error instanceof Error ? error.message : "An error occurred during checkout",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
      {errors.submit && <p className="text-red-600 mb-4">{errors.submit}</p>}
      <div className="flex-1 space-y-6">
        <ContactInfo
          contact={formData.contact}
          onChange={(e) => handleInputChange(e, "contact")}
          error={errors.contact}
        />
        <ShippingAddress
          shipping={formData.shipping}
          onChange={(e) => handleInputChange(e, "shipping")}
          errors={errors}
        />
        <BillingAddress
          billing={formData.billing}
          onChange={(e) => handleInputChange(e, "billing")}
          onToggleSameAsShipping={handleBillingToggle}
          errors={errors}
        />
      </div>
      <OrderSummary
        items={cartItems}
        totalPrice={cartTotalPrice}
        totalItems={cartTotalItems}
        isLoading={isLoading}
        userStatus={userStatus}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default CheckoutForm;