"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import Colors from "tailwindcss/colors";

const TopbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color={Colors.blue[800]}
        options={{ showSpinner: true }}
        shallowRouting
        disableAnchorClick={false}
      />
    </>
  );
};
export default TopbarProvider;
