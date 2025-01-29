import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const skeletonVariants = cva("bg-gray-200 animate-pulse", {
  variants: {
    rounded: {
      true: "rounded-md",
      false: "",
    },
    size: {
      sm: "h-4 w-12",
      md: "h-6 w-24",
      lg: "h-8 w-32",
      full: "h-full w-full",
    },
  },
  defaultVariants: {
    rounded: true,
    size: "md",
  },
});

interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  className,
  width,
  height,
  rounded,
  size,
}: SkeletonProps) => {
  return (
    <div
      className={cn(skeletonVariants({ rounded, size }), className)}
      style={{ width, height }}
    />
  );
};
