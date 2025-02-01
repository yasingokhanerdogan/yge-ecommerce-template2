import { ReactNode } from "react";
import { Footer, Header } from "@/components/store/layout";

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[65vh] p-4 md:p-8">{children}</div>
      <Footer />
    </div>
  );
};

export default StoreLayout;
