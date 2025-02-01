"use client";

import { useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/common/blocks/formInput";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  useEffect(() => {
    const phoneInput = document.getElementById("phone") as HTMLInputElement;

    phoneInput?.addEventListener("input", function (event: any) {
      let input = event.target.value.replace(/\D/g, "");

      input = input.slice(0, 11);

      const areaCode = input.slice(2, 4);
      const first = input.slice(4, 7);
      const middle = input.slice(7, 9);
      const last = input.slice(9);

      let formattedNumber = "0 (5";
      if (areaCode) formattedNumber += `${areaCode}`;
      if (first) formattedNumber += `) ${first}`;
      if (middle) formattedNumber += ` ${middle}`;
      if (last) formattedNumber += ` ${last}`;

      event.target.value = formattedNumber;
    });

    phoneInput.addEventListener("focus", () => {
      if (!phoneInput.value) {
        phoneInput.value = "0 (5";
      }
    });
  }, []);

  return (
    <CardContent className="grid gap-4">
      <FormInput
        withAsterisk
        id="phone"
        type="tel"
        inputMode="tel"
        label="Phone Number"
        placeholder="0 (5__) ___ __ __"
      />
      <FormInput withAsterisk type="text" label="Email" placeholder="Email" />
      <FormInput
        withAsterisk
        type="password"
        label="Password"
        placeholder="Password"
      />
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground text-center">
          Your personal data will be processed in accordance with the
          Information Text. By clicking the &quot;Sign Up&quot; button, you
          accept the Membership Agreement.
        </p>
        <Button size="xxl" className="w-full">
          Register
        </Button>
      </div>
    </CardContent>
  );
};

export default RegisterForm;
