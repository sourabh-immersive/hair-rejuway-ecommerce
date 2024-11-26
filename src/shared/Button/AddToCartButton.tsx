import React from "react";

interface AddToCartButtonProps {
  className?: string;
  radius?: string;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const twFocusClass = () => "focus:outline-none focus:ring-2 focus:ring-slate-500";

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  className = "",
  radius = "rounded-sm", // Default border radius for a small button
  isActive = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`block font-medium whitespace-nowrap px-3 py-1.5 text-sm ${className} ${radius} ${
        isActive
          ? "bg-blue-900 text-slate-50"
          : "text-slate-600 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-900"
      } ${twFocusClass()}`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </button>
  );
};

export default AddToCartButton;
