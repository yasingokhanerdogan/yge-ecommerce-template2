"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import paths from "@/lib/paths";

import Logo from "./logo";
import SearchBar from "./searchbar";

import { HeartIcon, ShoppingBagIcon, TruckIcon, UserIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const TopHeader = () => {
  return (
    <div className="h-8 text-muted-foreground bg-muted flex items-center justify-end lg:justify-between px-8">
      <div className="hidden lg:flex items-center">
        <p className="text-xs">
          25% Discount on First Order + Free Shipping for Products with Coupon
          Labels in the Mobile Application!
        </p>
      </div>
      <div className="flex items-center">
        <Link
          href="#"
          className="flex items-center gap-1 text-xs [&_svg]:size-4"
        >
          <TruckIcon />
          <span>Track Order</span>
        </Link>
      </div>
    </div>
  );
};

const MiddleHeader = () => {
  if (typeof window === undefined) return null;

  const RightMenu: {
    icon: ReactNode;
    href: string;
    title: string;
    count?: number;
  }[] = [
    {
      icon: <UserIcon />,
      href: paths.STORE.AUTH.LOGIN,
      title: "Login",
    },
    {
      icon: <HeartIcon />,
      href: paths.STORE.ACCOUNT.FAVORITES,
      title: "Favorites",
    },
    {
      icon: <ShoppingBagIcon />,
      href: paths.STORE.CART,
      title: "Cart",
    },
  ];

  const RightMenuItem = ({
    icon,
    href,
    title,
    count,
  }: {
    icon: ReactNode;
    href: string;
    title: string;
    count?: number;
  }) => {
    return (
      <Link
        href={href}
        className="relative flex flex-col items-center justify-center [&_svg]:size-5 [&_svg]:text-primary hover:underline"
      >
        {icon}
        <span className="text-xs">{title}</span>
      </Link>
    );
  };

  return (
    <div>
      <div className="relative min-h-16 lg:min-h-20 flex items-center justify-between">
        <div>
          <Logo />
        </div>
        <div className="absolute top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 hidden z-10 lg:block">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          {RightMenu.map((item, idx) => (
            <RightMenuItem
              key={idx}
              icon={item?.icon}
              title={item?.title}
              href={item?.href}
            />
          ))}
        </div>
      </div>
      <div className="h-16 lg:hidden">
        <SearchBar />
      </div>
    </div>
  );
};

const BottomHeader = () => {
  const {
    data: categories,
    isPending: categoryIsPending,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
    isRefetchError: categoryIsRefetchError,
    isFetching: categoryIsFetching,
  } = useQuery({
    queryKey: ["headerCategories"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories`)
        .then((res) => res.json())
        .then((data) => data.slice(1, 10)),
  });
  if (categoryIsError) {
    process.env.NODE_ENV !== "production" && console.log(categoryError);
  }

  const isLoading =
    categoryIsPending || categoryIsLoading || categoryIsFetching;

  return (
    <div className="relative h-14 hidden 2xl:flex items-center justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: 14 }).map((_, idx) => {
            return <Skeleton key={idx} height={35} />;
          })}
        </div>
      ) : (
        <ul className="h-full flex items-center gap-4">
          {categories.length &&
            categories?.map((item: any, idx: number) => {
              return (
                <li key={idx} className="h-full flex items-center">
                  <Link
                    href={`${paths.STORE.CATALOG}/${item?.slug}`}
                    className="h-full flex items-center justify-center text-lg font-medium uppercase whitespace-nowrap tracking-tight border-2 border-transparent hover:border-b-primary transition-all px-4"
                  >
                    {item?.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <>
      <TopHeader />
      <header className="sticky top-0 left-0 w-full bg-header border-b px-4 md:px-8 z-30">
        <MiddleHeader />
        <BottomHeader />
      </header>
    </>
  );
};

export default Header;
