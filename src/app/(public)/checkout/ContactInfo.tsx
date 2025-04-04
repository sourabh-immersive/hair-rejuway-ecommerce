import React from "react";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";

interface ContactInfoProps {
  contact: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact, onChange, error }) => (
  <section className="space-y-2">
    <h3 className="text-lg font-semibold">Contact Information</h3>
    <Label>Email or Phone Number</Label>
    <Input value={contact} onChange={onChange} />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </section>
);

export default ContactInfo;