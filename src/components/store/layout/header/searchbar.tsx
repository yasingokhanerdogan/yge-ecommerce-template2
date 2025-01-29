"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    searchValue ? setResultBarIsActive(true) : setResultBarIsActive(false);
  }, [searchValue]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <div className="relative mx-2" ref={searchRef}>
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
      <ul
        className={cn(
          "absolute bg-header top-12 left-0 w-full rounded-sm rounded-t-none border border-t-0 p-2 invisible opacity-0 transition-all",
          resultBarIsActive && "visible opacity-100 border-primary",
        )}
      >
        <li>
          <Link href={`/ara?q=${searchValue}`}>dsadsasadsad</Link>
        </li>
        <li>
          <Link href={`/ara?q=${searchValue}`}>dsadsasadsad</Link>
        </li>
        <li>
          <Link href={`/ara?q=${searchValue}`}>dsadsasadsad</Link>
        </li>
      </ul>
    </div>
  );
};

export default SearchBar;
