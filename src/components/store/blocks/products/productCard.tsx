import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import paths from "@/lib/paths";
import { currencyFormat } from "@/lib/utils";

const ProductCard = ({ data }: { data: any }) => {
  const discountedPrice: any = data?.discountPercentage
    ? (data?.price - (data?.price / 100) * data?.discountPercentage).toFixed(2)
    : null;

  return (
    <Link
      href={`${paths.STORE.PRODUCT_DETAIL}/${_.kebabCase(data?.title.toLowerCase())}--${data?.id}`}
      className="inline-block bg-white rounded-md shadow-sm p-4"
    >
      <div className="relative w-auto h-80">
        <Image
          fill
          sizes="100%"
          src={data?.thumbnail}
          className="w-full object-contain object-center rounded-md"
          quality={60}
          alt={data?.title}
          priority
        />
      </div>
      <h4 className="line-clamp-2">{data?.title}</h4>
      {discountedPrice ? (
        <span className="text-lg text-primary font-semibold">
          {currencyFormat(discountedPrice)}
        </span>
      ) : (
        <span className="text-lg text-primary font-semibold">
          {currencyFormat(data?.price)}
        </span>
      )}
    </Link>
  );
};

export default ProductCard;
