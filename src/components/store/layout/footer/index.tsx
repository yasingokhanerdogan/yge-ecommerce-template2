"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, scrollToTop } from "@/lib/utils";

import Logo from "@/components/store/layout/header/logo";
import PaymentBanner from "~/payment-banner.svg";

import {
  ChevronUpIcon,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const MenuItem = (item: { title: string; items: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold uppercase">{item.title}</h4>
      <ul className="flex flex-col gap-1">
        {item.items.map(
          (subItem: { id: number; href: string; title: string }) => {
            return (
              <li key={subItem.id}>
                <Link href={subItem.href} className="hover:underline">
                  {subItem.title}
                </Link>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
};
const Footer = () => {
  const [isActive, setIsActive] = useState(false);

  const SocialLinks: {
    id: number;
    icon: ReactNode;
    href: string;
    title: string;
  }[] = [
    {
      id: 1,
      icon: <Facebook />,
      href: "https://www.facebook.com",
      title: "Facebook",
    },
    {
      id: 2,
      icon: <Twitter />,
      href: "https://www.twitter.com",
      title: "Twitter",
    },
    {
      id: 3,
      icon: <Instagram />,
      href: "https://www.instagram.com",
      title: "Instagram",
    },
    {
      id: 4,
      icon: <Youtube />,
      href: "https://www.youtube.com",
      title: "Youtube",
    },
    {
      id: 5,
      icon: <Linkedin />,
      href: "https://www.linkedin.com",
      title: "Linkedin",
    },
  ];

  const MenuItems: {
    id: number;
    title: string;
    items: { id: number; href: string; title: string }[];
  }[] = [
    {
      id: 1,
      title: "Support",
      items: [
        {
          id: 1,
          href: "#",
          title: "Contact",
        },
        {
          id: 2,
          href: "#",
          title: "Track Order",
        },
        {
          id: 3,
          href: "#",
          title: "Whatsapp",
        },
      ],
    },
    {
      id: 2,
      title: "Help",
      items: [
        {
          id: 1,
          href: "#",
          title: "FAQS",
        },
        {
          id: 2,
          href: "#",
          title: "Cancel and Return",
        },
        {
          id: 3,
          href: "#",
          title: "Usage Policy",
        },
        {
          id: 4,
          href: "#",
          title: "Site Map",
        },
      ],
    },
    {
      id: 3,
      title: "Corporate",
      items: [
        {
          id: 1,
          href: "#",
          title: "About Us",
        },
        {
          id: 2,
          href: "#",
          title: "Stores",
        },
        {
          id: 3,
          href: "#",
          title: "Corporate",
        },
        {
          id: 4,
          href: "#",
          title: "Careers",
        },
        {
          id: 5,
          href: "#",
          title: "Gift Card",
        },
      ],
    },
    {
      id: 4,
      title: "Policies",
      items: [
        {
          id: 1,
          href: "#",
          title: "User Agreement",
        },
        {
          id: 2,
          href: "#",
          title: "Privacy Policy",
        },
        {
          id: 3,
          href: "#",
          title: "Accessibility",
        },
      ],
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 250 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <>
      <footer className="flex flex-col gap-20 bg-accent p-8">
        <div className="grid grid-cols-5 items-start place-items-center gap-4">
          <div className="">
            <Logo />
          </div>
          {MenuItems.map((item) => {
            return (
              <MenuItem key={item.id} title={item.title} items={item.items} />
            );
          })}
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <p>&copy; {new Date().getFullYear()}. All right reserved.</p>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center gap-2">
            {SocialLinks.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full shadow-sm bg-header flex items-center justify-center [&_svg]:size-5 transition-all"
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <Image
              src={PaymentBanner}
              width={320}
              height={25}
              quality={75}
              className="object-contain"
              priority
              alt="Payment Banner"
            />
          </div>
        </div>
      </footer>
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-10 right-10 h-8 bg-header border border-primary rounded-full flex items-center justify-center gap-1 px-2 text-sm text-primary [&_svg]:size-4 shadow-md invisible opacity-0 transition-all",
          isActive && "visible opacity-100",
        )}
      >
        <ChevronUpIcon />
        <span>Başa Dön</span>
      </button>
    </>
  );
};

export default Footer;
