import React from "react";
import Link from "next/link";
import paths from "@/lib/paths";

const Logo = () => {
  return (
    <Link
      href={paths.STORE.BASE}
      className="text-4xl font-extrabold uppercase text-primary"
    >
      Logo
    </Link>
  );
};

export default Logo;
