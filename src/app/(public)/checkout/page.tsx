"use client";

import { useAppSelector } from "@/lib/hooks";
import CheckoutForm from "./CheckoutForm";
import LoginForm from "./loginform";

const CheckoutPage: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);

    return (
  <div className="nc-CheckoutPage">
    <main className="container py-8 lg:pb-28 lg:pt-10">
      {auth.status === "authenticated" ? '' : <LoginForm /> }
      <CheckoutForm />
    </main>
  </div>
);
}

export default CheckoutPage;
