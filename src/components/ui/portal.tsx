"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export const Portal = ({
  children,
  containerId = "portal-root",
}: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let target = document.getElementById(containerId);
    if (!target) {
      target = document.createElement("div");
      target.id = containerId;
      document.body.appendChild(target);
    }
    setContainer(target);

    return () => {
      if (target && target.parentNode) {
        target.parentNode.removeChild(target);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};
