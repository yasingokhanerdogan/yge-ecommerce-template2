"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import paths from "@/lib/paths";
import { calcDiscountedPrice, currencyFormat } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { HeartIcon, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

const CartPageClient = () => {
  const router = useRouter();

  const {
    data: cart,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/category/laptops?limit=3`,
      ).then((res) => res.json()),
  });

  const loading = isPending || isLoading;

  return (
    <div className="grid grid-cols-[auto_35rem] gap-4">
      {loading ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="ml-auto">
              <Skeleton width={100} height={40} />
            </div>
            {Array.from({ length: 2 }).map((_, idx) => {
              return <Skeleton key={idx} width="100%" height={175} />;
            })}
          </div>
          <Skeleton width="100%" height={250} />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="ml-auto">
              <Button size="lg" variant="ghost" className="px-3">
                <TrashIcon />
                <span>All Clear</span>
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {!cart?.products.length ? (
                <div>Your Cart is Empty!</div>
              ) : (
                cart?.products.map((item: any) => {
                  const discountedPrice = calcDiscountedPrice(
                    item?.price,
                    item?.discountPercentage,
                  );

                  return (
                    <div
                      key={item?.id}
                      className="flex items-center justify-between bg-white rounded-md p-4"
                    >
                      <div className="flex gap-4">
                        <div className="bg-accent rounded-md">
                          <Image
                            src={item?.thumbnail}
                            width={150}
                            height={150}
                            quality={60}
                            alt={item.title}
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">
                            <h4 className="text-lg font-medium">
                              {item.title}
                            </h4>
                            <span className="text-sm text-foreground">
                              SKU: {item.sku}
                            </span>
                          </div>
                          <div className="flex flex-col text-sm">
                            <div>
                              Size: <span className="font-medium">M</span>
                            </div>
                            <div>
                              Color: <span className="font-medium">Red</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        {discountedPrice && (
                          <div className="text-sm text-gray-400 font-semibold line-through">
                            {currencyFormat(item?.price)}
                          </div>
                        )}
                        <div className="text-2xl text-primary font-semibold">
                          {currencyFormat(discountedPrice)}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <button className="w-8 h-8 bg-muted border flex items-center justify-center [&_svg]:size-5">
                              <MinusIcon />
                            </button>
                            <div className="w-8 h-8 bg-white border-y flex items-center justify-center">
                              1
                            </div>
                            <button className="w-8 h-8 bg-muted border flex items-center justify-center [&_svg]:size-5">
                              <PlusIcon />
                            </button>
                          </div>
                          <button className="w-8 h-8 bg-muted border flex items-center justify-center [&_svg]:size-5">
                            <HeartIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="h-fit flex flex-col gap-4 bg-white rounded-md p-4">
            <h3 className="text-xl font-semibold">Order Summary</h3>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <div className="">Product Total</div>
                <div className="">{currencyFormat(5182.99)}</div>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <div className="">Discounts</div>
                <div className="">{currencyFormat(321.99)}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="">Sub Total</div>
                <div className="">{currencyFormat(5182.99 - 321.99)}</div>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <div className="">Shipping Cost</div>
                <div className="">{currencyFormat(15)}</div>
              </div>
              <div className="flex items-center justify-between text-xl text-primary font-semibold">
                <div className="">Total</div>
                <div className="">{currencyFormat(5182.99 - 321.99 + 15)}</div>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full"
              onClick={() => router.push(paths.STORE.CHECKOUT)}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPageClient;
