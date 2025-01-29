import { ReactNode } from "react";
import { Footer, Header } from "@/components/store/layout";

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[80vh] p-8">{children}</div>
      <Footer />
    </div>
  );
};

export default StoreLayout;
