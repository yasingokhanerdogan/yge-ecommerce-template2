"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  withAsterisk?: boolean;
  label?: string;
  error?: string;
  isLoading?: boolean;
  message?: string;
}

export const FormInput = ({
  withAsterisk = false,
  type = "text",
  label,
  error,
  message,
  className,
  ...props
}: FormInputProps) => {
  return (
    <div className="grid gap-0.5">
      <div className="flex items-center justify-between">
        {label && (
          <Label
            className={cn(
              withAsterisk &&
                "after:content-['*'] after:text-sm after:text-red-500 after:ml-0.5",
            )}
          >
            {label}
          </Label>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      <Input
        type={type}
        {...props}
        className={cn("h-12 rounded-lg", className)}
      />
      {message && <p className="text-xs text-gray-500">{message}</p>}
    </div>
  );
};
