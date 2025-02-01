"use client";

import { useQuery } from "@tanstack/react-query";
import CategoryItem from "../blocks/categories/categoryItem";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySection = () => {
  const {
    data: categories,
    isPending: categoryIsPending,
    isLoading: categoryIsLoading,
    isFetching: categoryIsFetching,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery({
    queryKey: ["categorySection"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories`)
        .then((res) => res.json())
        .then((data) => data.slice(0, 9)),
  });
  if (categoryIsError) {
    return <div>Error: {categoryError?.message}</div>;
  }

  const isLoading =
    categoryIsFetching || categoryIsPending || categoryIsLoading;

  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-evenly gap-4 pb-2 overflow-x-auto xl:overflow-y-hidden">
      {isLoading
        ? Array.from({ length: 9 }).map((_, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-1"
              >
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-5" />
              </div>
            );
          })
        : categories?.map((category: any, idx: number) => {
            return <CategoryItem key={idx} item={category} />;
          })}
    </div>
  );
};

export default CategorySection;
