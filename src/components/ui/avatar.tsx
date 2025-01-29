"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export const Avatar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
};

export const AvatarImage = ({ className, ...props }: ImageProps) => {
  return (
    <Image
      className={cn("aspect-square h-full w-full", className)}
      {...props}
      fill
    />
  );
};

export const AvatarFallback = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full text-sm bg-muted font-semibold text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
