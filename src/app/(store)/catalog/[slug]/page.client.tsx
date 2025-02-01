"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

import ProductCard from "@/components/store/blocks/products/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  CheckIcon,
  ChevronDownIcon,
  CircleXIcon,
  SearchIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const options = [
  { id: 1, title: "Price Low to High", value: "price" },
  { id: 2, title: "Price High to Low", value: "-price" },
  { id: 3, title: "Rating", value: "-rating" },
];

const FilterSidebar = () => {
  const [genders, setGenders] = useState([
    {
      id: 1,
      title: "Men",
    },
    {
      id: 2,
      title: "Boy",
    },
    {
      id: 3,
      title: "Women",
    },
    {
      id: 4,
      title: "Girl",
    },
  ]);

  return (
    <div className="sticky top-40 left-0 w-full h-[80vh] bg-card rounded-md shadow-sm hidden xl:block overflow-y-auto">
      <div className="flex flex-col border-b gap-4 p-4">
        <div className="flex items-center justify-between">
          <h5 className="text-primary font-medium">Selected Filters(1)</h5>
          <button className="text-muted-foreground underline underline-offset-2 hover:text-primary">
            All Clear
          </button>
        </div>
        <div className="max-h-44 flex flex-wrap gap-2 overflow-y-auto">
          <button className="w-fit flex items-center gap-1 text-sm text-muted-foreground border rounded-md h-9 px-2 [&_svg]:size-4">
            <span>Men</span>
            <CircleXIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col border-b gap-4 p-4">
        <div className="flex items-center justify-between">
          <h5 className="text-primary font-medium">Gender</h5>
        </div>
        <div className="relative [&_svg]:size-5">
          <input
            type="text"
            className="w-full h-10 border rounded-md outline-none px-2"
            placeholder="Search Gender"
          />
          <SearchIcon className="absolute top-1/2 right-2 -translate-y-1/2" />
        </div>
        <div className="max-h-44 flex flex-col gap-2 overflow-y-auto">
          {genders.map((gender: any) => {
            return (
              <div key={gender.id} className="flex items-center gap-2">
                <Checkbox id={gender.id} />
                <label htmlFor={gender.id} className="text-muted-foreground">
                  {gender.title}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col border-b gap-4 p-4">
        <div className="flex items-center justify-between">
          <h5 className="text-primary font-medium">Product Type</h5>
        </div>
        <div className="relative [&_svg]:size-5">
          <input
            type="text"
            className="w-full h-10 border rounded-md outline-none px-2"
            placeholder="Search Type"
          />
          <SearchIcon className="absolute top-1/2 right-2 -translate-y-1/2" />
        </div>
        <div className="max-h-44 flex flex-col gap-2 overflow-y-auto">
          {Array.from({ length: 10 }).map((_, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2">
                <Checkbox id={`type-${idx + 1}`} />
                <label
                  htmlFor={`type-${idx + 1}`}
                  className="text-muted-foreground"
                >
                  Type {idx + 1}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const GridSelect = ({ data }: { data: any }) => {
  const { grid, setGrid } = data;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">View</span>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center group gap-1"
          onClick={() => setGrid(3)}
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-gray-400 group-hover:bg-gray-800 w-3 h-5",
                grid === 3 && "bg-gray-600",
              )}
            ></div>
          ))}
        </button>
        <div className="w-[0.05rem] h-7 bg-gray-500"></div>
        <button
          className="flex items-center group gap-1"
          onClick={() => setGrid(4)}
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-gray-400 group-hover:bg-gray-800 w-3 h-5",
                grid === 4 && "bg-gray-600",
              )}
            ></div>
          ))}
        </button>
      </div>
    </div>
  );
};

const SortDropdown = ({ data }: { data: any }) => {
  const { sort, setSort } = data;
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setIsActive((a) => !a);
  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative w-44">
      <button
        onClick={handleClick}
        className={cn(
          "w-full h-10 text-sm border border-gray-500 rounded-md px-3 flex items-center justify-between gap-1 [&_svg]:size-5",
          isActive && "rounded-b-none",
        )}
      >
        <span>
          {options.find((option) => option.id === sort)?.title || "Sort"}
        </span>
        <ChevronDownIcon />
      </button>
      <div
        className={cn(
          "absolute top-10 left-0 bg-card w-full flex flex-col gap-1 invisible opacity-0 border border-gray-500 border-t-0 rounded-md text-sm transition-opacity p-1 z-10 whitespace-nowrap",
          isActive && "visible opacity-100 rounded-t-none",
        )}
      >
        {options.map((option) => (
          <button
            key={option.id}
            className="h-9 px-2 flex items-center justify-between rounded-md hover:bg-muted [&_svg]:size-4"
            onClick={() => {
              setSort(option.id);
              setIsActive(false);
            }}
          >
            <span>{option.title}</span>
            {sort === option.id && <CheckIcon />}
          </button>
        ))}
      </div>
    </div>
  );
};

const fetchProducts = async ({
  params,
  sortBy,
}: {
  params: any;
  sortBy: any;
}): Promise<any> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category/${params?.slug}${sortBy && `?sortBy=${sortBy}`}`,
  )
    .then((res) => res.json())
    .then((data) => data.products)
    .catch((error) => {
      throw new Error(error);
    });
};

const CatalogPageClient = ({ params }: { params: any }) => {
  const [grid, setGrid] = useState(4);
  const [sort, setSort] = useState<number | null>(null);

  const sortBy = sort
    ? options.find((option) => option.id === sort)?.value
    : "";

  const {
    data: products,
    isPending,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["catalogProducts", { sortBy: sort, slug: params.slug }],
    queryFn: () => fetchProducts({ params, sortBy }),
  });
  if (isError) {
    toast.error(
      process.env.NODE_ENV !== "production"
        ? error.message
        : "An error occurred",
    );
  }

  const loading = isPending || isLoading;

  return (
    <div className="relative grid xl:grid-cols-[16rem_auto] gap-4">
      <FilterSidebar />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-6">
            <GridSelect data={{ grid, setGrid }} />
            <SortDropdown data={{ sort, setSort }} />
          </div>
        </div>
        <div
          className={cn(
            "grid  gap-4",
            grid === 4 && "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
            grid === 3 && "grid-cols-2 xl:grid-cols-3",
          )}
        >
          {loading
            ? Array.from({ length: 12 }).map((_, idx) => {
                return <Skeleton key={idx} width="100%" height={425} />;
              })
            : products?.map((product: any) => {
                return <ProductCard key={product?.id} data={product} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default CatalogPageClient;
