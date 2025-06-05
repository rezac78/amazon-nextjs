"use client";

import * as React from "react";

import {cn} from "lib/utils";
import EyeIcon from "@/public/icons/eye-icon";
import EyeCloseIcon from "@/public/icons/EyeCloseIcon";

export interface InputProps extends React.ComponentProps<"input"> {
 leftIcon?: React.ReactNode;
 rightIcon?: React.ReactNode;
 Size?: "normal" | "small" | "default";
 formControl?: {
  labelText?: string;
  labelTextAltTop?: string;
  labelTextAltBottomLeft?: string;
  labelTextAltBottomRight?: string;
  status?: "default" | "success" | "error" | "warning";
 };
 variant?: "default" | "contain";
 containerClassName?: string;
 className?: string;
}

const inputSizeVariants = {
 normal: " h-[47px] text-[16px] rounded-8",
 small: " h-[42px] text-[14px] rounded-8",
 default: "min-h-[52px] text-[12px] rounded-8",
};
const inputVariants = {
 default: "bg-white border-border ",
 contain: "bg-grey-100 ",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
 (
  {
   containerClassName,
   className,
   type,
   Size = "default",
   variant = "default",
   leftIcon,
   rightIcon,
   formControl,
   ...props
  },
  ref
 ) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const textColor =
   formControl?.status === "success"
    ? "text-green-700"
    : formControl?.status === "error"
    ? "text-red-700"
    : formControl?.status === "warning"
    ? "text-yellow-700"
    : "text-grey-900";

  const borderColor =
   formControl?.status === "success"
    ? "border-green-700"
    : formControl?.status === "error"
    ? "border-red-700"
    : formControl?.status === "warning"
    ? "border-yellow-700"
    : "border-input";

  const labelSize = inputSizeVariants.normal
   ? "text-[14px]"
   : inputSizeVariants.default
   ? "text-[12px]"
   : inputSizeVariants.small
   ? "text-[12px]"
   : "text-[12px]";

  const inputElement = (
   <div
    className={cn(
     "relative flex w-full items-center gap-2",
     textColor,
     containerClassName // Apply containerClassName here
    )}
   >
    {rightIcon && (
     <span className={cn(textColor, "absolute start-2 top-1/2 size-6 -translate-y-1/2")}>{rightIcon}</span>
    )}
    <input
     type={type === "password" ? (showPassword ? "text" : "password") : type}
     className={cn(
      inputSizeVariants[Size],
      inputVariants[variant],
      "block w-full grow border px-4 py-3 text-sm focus:border-black-800 focus:outline-none focus:ring-black-800 disabled:pointer-events-none disabled:opacity-50",
      rightIcon ? "ps-9" : leftIcon ? "pe-9" : "",
      borderColor,
      className
     )}
     ref={ref}
     {...props}
    />
    {leftIcon && <span className={cn(textColor, "absolute end-2 top-1/2 size-6 -translate-y-1/2")}>{leftIcon}</span>}
    {type === "password" && (
     <button type="button" className="absolute end-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeIcon className={"size-6"} /> : <EyeCloseIcon className={"size-6"} />}
     </button>
    )}
   </div>
  );

  if (formControl) {
   return (
    <label className={cn(labelSize, textColor)}>
     {formControl.labelText && (
      <div className="label">
       {formControl.labelText}
       {formControl.labelTextAltTop && formControl.labelTextAltTop}
      </div>
     )}
     {inputElement}
     {(formControl.labelTextAltBottomLeft ?? formControl.labelTextAltBottomRight) && (
      <div className="label">
       {formControl.labelTextAltBottomRight && formControl.labelTextAltBottomRight}
       {formControl.labelTextAltBottomLeft && formControl.labelTextAltBottomLeft}
      </div>
     )}
    </label>
   );
  }

  return inputElement;
 }
);

Input.displayName = "Input";

export {Input};
