"use client";

import { cn } from "@/lib/utils";

export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "w-full h-10 border outline-none rounded-md text-sm px-2 focus:bg-gray-100",
        className,
      )}
      {...props}
    />
  );
};
