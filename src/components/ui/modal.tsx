"use client";

import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/utils";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  children,
  id,
  isOpen,
  onClose,
  className,
  ...props
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal containerId={id}>
      <div
        {...props}
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-background invisible opacity-0 p-4 mx-4 -mt-5 rounded-lg transition-all z-50",
          isOpen && "visible mt-0 opacity-100",
          className,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "fixed top-0 left-0 w-screen h-screen bg-black/15 backdrop-blur-sm shadow invisible opacity-0 z-40",
          isOpen && "visible opacity-100",
        )}
        onClick={() => onClose()}
      ></div>
    </Portal>
  );
};
