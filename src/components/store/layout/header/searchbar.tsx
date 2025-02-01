"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import paths from "@/lib/paths";
import { cn } from "@/lib/utils";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resultBarIsActive, setResultBarIsActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (e: any) => {
    if (searchRef.current) {
      searchRef.current.contains(e.target)
        ? setResultBarIsActive(true)
        : setResultBarIsActive(false);
    }
  };

  const {
    data: searchResults,
    isPending: srIsPending,
    isLoading: srIsLoading,
    refetch: srRefetch,
  } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${searchValue}&limit=5`,
      ).then((res) => res.json()),
    enabled: !!searchValue.length,
  });

  useEffect(() => {
    if (searchResults?.products.length) {
      setResultBarIsActive(true);
    }
  }, [searchValue, searchResults]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Product, Category or Brand.."
          className={cn(
            "w-full h-12 rounded-sm border outline-none focus:border-primary px-2",
            resultBarIsActive && "rounded-b-none border-primary",
          )}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center">
          <SearchIcon />
        </button>
      </div>
      <div
        className={cn(
          "absolute bg-header top-12 left-0 w-full rounded-sm rounded-t-none border border-t-0 p-2 invisible opacity-0 space-y-2 transition-all",
          resultBarIsActive && "visible opacity-100 border-primary",
        )}
      >
        {!searchResults?.products.length ? (
          <p>No result found</p>
        ) : (
          searchResults?.products.map((product: any) => {
            return (
              <div key={product.id}>
                <Link
                  href={`${paths.STORE.PRODUCT_DETAIL}/${_.kebabCase(product?.title).toLocaleLowerCase()}--${product?.id}`}
                  className="flex items-center hover:bg-muted gap-2 transition-colors p-2"
                  onClick={() => {
                    setSearchValue("");
                  }}
                >
                  <Image
                    src={product?.thumbnail}
                    width={50}
                    height={50}
                    className="object-contain bg-muted"
                    alt={product?.title}
                  />
                  <h4>{product?.title}</h4>
                </Link>
              </div>
            );
          })
        )}
        {searchResults?.products.length ? (
          <a
            href={`/search?q=${searchValue}`}
            className="p-2 block bg-accent text-primary text-center"
          >
            View All
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
