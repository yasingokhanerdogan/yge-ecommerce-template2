"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import paths from "@/lib/paths";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="max-w-md mx-auto text-center space-y-4">
      <div>
        <h2 className="text-xl font-medium">Hello,</h2>
        <p className="text-center">
          Log in or create an account, don&apos;t miss the opportunities
        </p>
      </div>
      <Card>
        <CardHeader className="grid grid-cols-2 gap-4 bg-gray-100 m-4 p-2 rounded-md">
          <Button
            size="xl"
            className={cn(
              pathname === paths.STORE.AUTH.LOGIN
                ? "text-muted-foreground bg-gray-50 border"
                : "bg-transparent text-muted-foreground",
            )}
            onClick={() => router.push(paths.STORE.AUTH.LOGIN)}
          >
            Login
          </Button>
          <Button
            size="xl"
            className={cn(
              pathname === paths.STORE.AUTH.REGISTER
                ? "text-muted-foreground bg-gray-50 border"
                : "bg-transparent text-muted-foreground",
            )}
            onClick={() => router.push(paths.STORE.AUTH.REGISTER)}
          >
            Signup
          </Button>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
