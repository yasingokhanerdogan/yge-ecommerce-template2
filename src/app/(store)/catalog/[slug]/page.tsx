import CatalogPageClient from "./page.client";

const CatalogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const paramsData = await params;
  return <CatalogPageClient params={paramsData} />;
};

export default CatalogPage;
