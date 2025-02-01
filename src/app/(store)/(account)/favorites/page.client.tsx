"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/store/blocks/products/productCard";

const FavoritesPageClient = () => {
  const {
    data: favorites,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=10&skip=8`).then(
        (res) => res.json(),
      ),
  });

  const loading = isPending || isLoading;

  return (
    <div className="grid grid-cols-6 gap-4">
      {loading ? (
        Array.from({ length: 12 }).map((_, idx) => {
          return <Skeleton key={idx} width="100%" height={400} />;
        })
      ) : !favorites?.products.length ? (
        <div>No Favorite Product!</div>
      ) : (
        favorites?.products.map((favorite: any) => {
          return <ProductCard key={favorite.id} data={favorite} />;
        })
      )}
    </div>
  );
};

export default FavoritesPageClient;
