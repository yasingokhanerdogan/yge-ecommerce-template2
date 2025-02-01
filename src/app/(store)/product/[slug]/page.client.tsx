"use client";

import Link from "next/link";
import Image from "next/image";
import { calcDiscountedPrice, currencyFormat } from "@/lib/utils";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import { HeartIcon, StarIcon } from "lucide-react";

const ProductPageClient = ({ params }: { params: { slug: string } }) => {
  const {
    data: product,
    isPending,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${params.slug.split("--")[1]}`,
      ).then((res) => res.json()),
  });

  const loading = isFetching || isPending || isLoading;

  if (loading) return null;

  const discountedPrice = calcDiscountedPrice(
    product?.price,
    product?.discountPercentage,
  );

  return (
    <div>
      <div className="grid grid-cols-[auto_40%] bg-card gap-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          {product?.images.map((image: string, idx: number) => {
            return (
              <div key={idx} className="relative bg-gray-50 min-h-[40rem]">
                <Image
                  fill
                  sizes="100%"
                  src={image}
                  className="object-contain object-center rounded-sm"
                  quality={50}
                  alt={product?.title}
                />
              </div>
            );
          })}
        </div>

        <div className="sticky top-40 left-0 w-full h-fit flex flex-col gap-6">
          <div>
            <span className="text-xs uppercase">SKU: {product?.sku}</span>
            <h1 className="text-2xl font-medium line-clamp-2">
              {product?.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.floor(product?.rating) }).map(
                  (_, idx) => {
                    return (
                      <StarIcon
                        key={idx}
                        size={18}
                        className="fill-orange-400 stroke-orange-400"
                      />
                    );
                  },
                )}
                {Array.from({ length: 5 - Math.floor(product?.rating) }).map(
                  (_, idx) => {
                    return (
                      <StarIcon
                        key={idx}
                        size={18}
                        className="stroke-orange-400"
                      />
                    );
                  },
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product?.rating})
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Price</span>
              <div className="flex items-center gap-4">
                <span className="text-2xl text-primary font-semibold">
                  {currencyFormat(discountedPrice)}
                </span>
                {discountedPrice && (
                  <span className="text-2xl text-muted-foreground font-semibold line-through">
                    {currencyFormat(product?.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[auto_auto_3rem] gap-2">
              <Button variant="outline" size="xxl" className="w-full uppercase">
                Buy Now
              </Button>
              <Button
                size="xxl"
                className="w-full uppercase"
                onClick={() => toast.success("Item added to cart")}
              >
                Add To Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-full h-12 [&_svg]:size-6 rounded-full"
              >
                <HeartIcon />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Size</span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="text-gray-400 bg-gray-100 rounded-md shadow-sm w-10 h-10 flex items-center justify-center uppercase line-through"
              >
                XS
              </button>
              <button className="text-muted-foreground bg-gray-100 rounded-md shadow-sm w-10 h-10 flex items-center uppercase justify-center">
                SM
              </button>
              <button className="text-muted-foreground bg-gray-100 rounded-md shadow-sm w-10 h-10 flex items-center uppercase justify-center">
                M
              </button>
              <button className="text-muted-foreground bg-gray-200 border border-primary rounded-md shadow-sm w-10 h-10 flex items-center uppercase justify-center">
                L
              </button>
              <button className="text-muted-foreground bg-gray-100 rounded-md shadow-sm w-10 h-10 flex items-center uppercase justify-center">
                XL
              </button>
              <button
                disabled
                className="text-gray-400 bg-gray-100 rounded-md shadow-sm w-10 h-10 flex items-center justify-center uppercase line-through"
              >
                2XL
              </button>
              <button
                disabled
                className="text-gray-400 bg-gray-100 rounded-md shadow-sm w-10 h-10 flex items-center justify-center uppercase line-through"
              >
                3XL
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Colors(3)</span>
            <div className="flex items-center gap-2">
              <Link
                href="#"
                className="flex flex-col items-center justify-center text-center text-sm gap-1 group"
              >
                <div className="w-20 h-28 bg-gray-300 rounded-sm"></div>
                <span className="group-hover:underline">Red</span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center text-center text-sm gap-1 group"
              >
                <div className="w-20 h-28 bg-gray-300 rounded-sm"></div>
                <span className="group-hover:underline">Green</span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center text-center text-sm gap-1 group"
              >
                <div className="w-20 h-28 bg-gray-300 rounded-sm"></div>
                <span className="group-hover:underline">Blue</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-lg text-primary font-medium">Description</h5>
            <p className="text-sm">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageClient;
