import ProductPageClient from "./page.client";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const paramsData = await params;

  return <ProductPageClient params={paramsData} />;
};

export default ProductPage;
