import React from "react";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";

interface ShippingAddressProps {
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    apt?: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
    phone: string; // Added required phone field
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Partial<Record<string, string>>;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ shipping, onChange, errors }) => (
  <section className="border-t border-slate-200 py-6 space-y-4">
    <h3 className="text-lg font-semibold">Shipping Address</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label>First name</Label>
        <Input name="firstName" value={shipping.firstName} onChange={onChange} />
        {errors["shipping.firstName"] && <p className="text-sm text-red-600">{errors["shipping.firstName"]}</p>}
      </div>
      <div>
        <Label>Last name</Label>
        <Input name="lastName" value={shipping.lastName} onChange={onChange} />
        {errors["shipping.lastName"] && <p className="text-sm text-red-600">{errors["shipping.lastName"]}</p>}
      </div>
      <div className="col-span-2">
        <Label>Address</Label>
        <Input name="address" value={shipping.address} onChange={onChange} />
        {errors["shipping.address"] && <p className="text-sm text-red-600">{errors["shipping.address"]}</p>}
      </div>
      <div>
        <Label>Apt, Suite (optional)</Label>
        <Input name="apt" value={shipping.apt || ""} onChange={onChange} />
      </div>
      <div>
        <Label>City</Label>
        <Input name="city" value={shipping.city} onChange={onChange} />
        {errors["shipping.city"] && <p className="text-sm text-red-600">{errors["shipping.city"]}</p>}
      </div>
      <div>
        <Label>Country</Label>
        <Select name="country" value={shipping.country} onChange={onChange}>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
        </Select>
      </div>
      <div>
        <Label>State</Label>
        <Input name="state" value={shipping.state} onChange={onChange} />
        {errors["shipping.state"] && <p className="text-sm text-red-600">{errors["shipping.state"]}</p>}
      </div>
      <div>
        <Label>Postal code</Label>
        <Input name="postalCode" value={shipping.postalCode} onChange={onChange} />
        {errors["shipping.postalCode"] && <p className="text-sm text-red-600">{errors["shipping.postalCode"]}</p>}
      </div>
      <div className="col-span-2">
        <Label>Phone</Label>
        <Input name="phone" value={shipping.phone} onChange={onChange} />
        {errors["shipping.phone"] && <p className="text-sm text-red-600">{errors["shipping.phone"]}</p>}
      </div>
    </div>
  </section>
);

export default ShippingAddress;