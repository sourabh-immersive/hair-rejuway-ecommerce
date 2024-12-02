import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-100 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-100 dark:text-slate-800 shadow-xl rounded-lg ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
