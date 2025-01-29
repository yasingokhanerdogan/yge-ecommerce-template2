"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export const Checkbox = ({
  id,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="inline-flex items-center gap-1">
      <label htmlFor={id}>
        <div className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={id}
            className={cn(
              "w-5 h-5 peer cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary",
              className,
            )}
            {...props}
          />
          <span
            className={`absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none [&_svg]:size-4`}
          >
            <CheckIcon />
          </span>
        </div>
      </label>
    </div>
  );
};
