import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      className={cn(
        "flex items-center text-sm text-foreground font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
};
