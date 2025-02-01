import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found Page",
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-2 p-4 lg:p-8">
      <h1 className="text-5xl font-bold text-primary">Page Not Found!</h1>
    </div>
  );
};

export default NotFoundPage;
