import { Metadata } from "next";
import CategorySection from "@/components/store/sections/category";

export const metadata: Metadata = {
  title: "HomePage",
};

const HomePage = () => {
  return (
    <div>
      <CategorySection />
    </div>
  );
};

export default HomePage;
