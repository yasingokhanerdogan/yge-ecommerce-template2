import { currencyFormat } from "@/lib/utils";
import { HeartIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductList = ({ data }: { data: any }) => {
  const discountedPrice: any = data?.discountPercentage
    ? (data?.price - (data?.price / 100) * data?.discountPercentage).toFixed(2)
    : null;

  return (
    <div className="flex items-center justify-between bg-white rounded-md p-4">
      <div className="flex gap-4">
        <div className="bg-accent rounded-md">
          <Image
            src={data?.thumbnail}
            width={150}
            height={150}
            quality={60}
            alt={data.title}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <h4 className="text-lg font-medium">{data.title}</h4>
            <span className="text-sm text-foreground">SKU: {data.sku}</span>
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
            {currencyFormat(data?.price)}
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
};

export default ProductList;
