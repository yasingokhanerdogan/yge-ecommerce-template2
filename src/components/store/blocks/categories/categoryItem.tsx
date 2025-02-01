import Link from "next/link";
import paths from "@/lib/paths";
import _ from "lodash";

const CategoryItem = ({ item }: { item: any }) => {
  return (
    <Link
      href={`${paths.STORE.CATALOG}/${item?.slug}`}
      className="flex flex-col items-center justify-center"
    >
      <div className="bg-white w-20 h-20 rounded-full border"></div>
      <div>{item?.name}</div>
    </Link>
  );
};

export default CategoryItem;
