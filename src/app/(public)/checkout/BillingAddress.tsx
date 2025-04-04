import React from "react";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Radio from "@/shared/Radio/Radio";

interface BillingAddressProps {
  billing: {
    sameAsShipping: boolean;
    firstName?: string;
    lastName?: string;
    address?: string;
    apt?: string;
    city?: string;
    country?: string;
    state?: string;
    postalCode?: string;
    phone?: string; // Added optional phone field
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onToggleSameAsShipping: (value: boolean) => void;
  errors: Partial<Record<string, string>>;
}

const BillingAddress: React.FC<BillingAddressProps> = ({ billing, onChange, onToggleSameAsShipping, errors }) => (
  <section className="border-t border-slate-200 py-6 space-y-4">
    <h3 className="text-lg font-semibold">Billing Address</h3>
    <div className="space-y-2">
      <Radio
        label="Same as shipping address"
        id="same-as-shipping"
        name="billing-option"
        checked={billing.sameAsShipping}
        onChange={() => onToggleSameAsShipping(true)}
      />
      <Radio
        label="Use a different billing address"
        id="different-billing"
        name="billing-option"
        checked={!billing.sameAsShipping}
        onChange={() => onToggleSameAsShipping(false)}
      />
    </div>
    {!billing.sameAsShipping && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>First name</Label>
          <Input name="firstName" value={billing.firstName || ""} onChange={onChange} />
          {errors["billing.firstName"] && <p className="text-sm text-red-600">{errors["billing.firstName"]}</p>}
        </div>
        <div>
          <Label>Last name</Label>
          <Input name="lastName" value={billing.lastName || ""} onChange={onChange} />
          {errors["billing.lastName"] && <p className="text-sm text-red-600">{errors["billing.lastName"]}</p>}
        </div>
        <div className="col-span-2">
          <Label>Address</Label>
          <Input name="address" value={billing.address || ""} onChange={onChange} />
          {errors["billing.address"] && <p className="text-sm text-red-600">{errors["billing.address"]}</p>}
        </div>
        <div>
          <Label>Apt, Suite (optional)</Label>
          <Input name="apt" value={billing.apt || ""} onChange={onChange} />
        </div>
        <div>
          <Label>City</Label>
          <Input name="city" value={billing.city || ""} onChange={onChange} />
          {errors["billing.city"] && <p className="text-sm text-red-600">{errors["billing.city"]}</p>}
        </div>
        <div>
          <Label>Country</Label>
          <Select name="country" value={billing.country || "United States"} onChange={onChange}>
            <option value="United States">United States</option>
            <option value="India">India</option>
            <option value="Canada">Canada</option>
          </Select>
        </div>
        <div>
          <Label>State</Label>
          <Input name="state" value={billing.state || ""} onChange={onChange} />
          {errors["billing.state"] && <p className="text-sm text-red-600">{errors["billing.state"]}</p>}
        </div>
        <div>
          <Label>Postal code</Label>
          <Input name="postalCode" value={billing.postalCode || ""} onChange={onChange} />
          {errors["billing.postalCode"] && <p className="text-sm text-red-600">{errors["billing.postalCode"]}</p>}
        </div>
        <div className="col-span-2">
          <Label>Phone (optional)</Label>
          <Input name="phone" value={billing.phone || ""} onChange={onChange} />
          {errors["billing.phone"] && <p className="text-sm text-red-600">{errors["billing.phone"]}</p>}
        </div>
      </div>
    )}
    {errors.billing && !billing.sameAsShipping && <p className="text-sm text-red-600">{errors.billing}</p>}
  </section>
);

export default BillingAddress;