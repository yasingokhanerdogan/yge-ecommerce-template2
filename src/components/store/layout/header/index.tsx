"use client";

import { ReactNode } from "react";
import Link from "next/link";
import paths from "@/lib/paths";

import Logo from "./logo";
import SearchBar from "./searchbar";

import { HeartIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const TopHeader = () => {
  return (
    <div className="h-10 text-muted-foreground bg-muted flex items-center justify-between">
      <div className="flex items-center">LeftSide</div>
      <div className="flex items-center">RightSide</div>
    </div>
  );
};

const MiddleHeader = () => {
  const RightMenu: {
    icon: ReactNode;
    href: string;
    title: string;
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
  }: {
    icon: ReactNode;
    href: string;
    title: string;
  }) => {
    return (
      <Link
        href={href}
        className="flex flex-col items-center justify-center [&_svg]:size-5 [&_svg]:text-primary hover:underline"
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
        <div className="absolute top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 hidden lg:block">
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
      <div className="block lg:hidden">
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
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories`)
        .then((res) => res.json())
        .then((data) => data.slice(0, 12)),
  });
  if (categoryIsError) {
    process.env.NODE_ENV !== "production" && console.log(categoryError);
  }

  const isLoading =
    categoryIsPending || categoryIsLoading || categoryIsFetching;

  return (
    <div className="relative h-14 flex items-center justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: 16 }).map((_, idx) => {
            return <Skeleton key={idx} height={30} />;
          })}
        </div>
      ) : (
        <ul className="h-full flex items-center gap-8">
          {categories.length &&
            categories?.map((item: any, idx: number) => {
              return (
                <li key={idx} className="h-full flex items-center">
                  <Link
                    href={`${paths.STORE.CATALOG}/${item?.slug}`}
                    className="text-lg font-medium uppercase whitespace-nowrap tracking-tight"
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
      <header className="sticky top-0 left-0 w-full bg-header border-b px-8 z-30">
        <MiddleHeader />
        <BottomHeader />
      </header>
    </>
  );
};

export default Header;
