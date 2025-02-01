"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/common/blocks/formInput";
import { Button } from "@/components/ui/button";

const LogInForm = () => {
  return (
    <CardContent className="grid gap-4">
      <FormInput withAsterisk type="text" label="Email" placeholder="Email" />
      <FormInput
        withAsterisk
        type="password"
        label="Password"
        placeholder="Password"
      />
      <Link
        href="#"
        className="ml-auto text-sm hover:underline underline-offset-2"
      >
        Forgot My Password?
      </Link>
      <Button size="xxl">Login</Button>
    </CardContent>
  );
};

export default LogInForm;
