"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinks } from "./utils";

// logo element
export function LogoElementWithLink() {
  // check for the pathname
  const pathname = usePathname();

  // for the nav link conditions
  // if on / page then show dashboard link
  // if on dashboard page then show / link
  // if any on any other page then show dashboard link
  const currentRedirectingPath =
    pathname === "/" ? "/home" : pathname === "/home" ? "/" : "/home";

  return (
    <Link href={currentRedirectingPath}>
      <Image
        className="w-40 h-12 lg:w-72 lg:h-16"
        alt="main logo"
        src="/svgs/logo.svg"
        width={275}
        height={65}
        priority
      />
    </Link>
  );
}

// notification components
export function NotificationElement() {
  // const [open, setopen] = useState(false);
  return (
    <div className="relative w-[40px] h-[40px] pointer hover:border border-gray-600 rounded md:block hidden">
      <DropdownMenu
        open={false}
        // onOpenChange={setopen}
      >
        <DropdownMenuTrigger className="">
          <div>
            <Image
              src={"/svgs/notification.svg"}
              width={40}
              height={40}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-50 cursor-not-allowed"
              alt="notification to update"
            />
            {/* {notification.length > 0 && (
              <Image
                src={"/svgs/newNotification.svg"}
                width={40}
                height={40}
                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="notification to update"
              />
            )} */}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[20em] translate-y-7 -translate-x-12 bg-[#12141D] rounded-2xl shadow-xl shadow-[#f0f0f005] gap-2 flex flex-col p-2 border border-white border-opacity-10">
          <DropdownMenuLabel className="text-center">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function HamburgerOnMobile(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <svg viewBox="0 0 50 50" width="32px" height="32px" fill="white">
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
        </svg>
      </SheetTrigger>
      <SheetContent className="bg-[#12141D] fc">
        <SheetHeader className="text-start">
          <SheetTitle className="pb-4">Links</SheetTitle>
          <SheetDescription
            className="flex flex-col gap-4 text-2xl text-start"
            onClick={(_) => setOpen(false)}
          >
            <NavLinks {...props} />
          </SheetDescription>
        </SheetHeader>

        {/* if not on dashboard page */}
        {props.pathname != "/dashboard" && (
          <Link
            href={"/dashboard"}
            className="items-center gap-4 fr"
            onClick={(_) => setOpen(false)}
          >
            <Image
              src={"/svgs/arrow.svg"}
              className="rotate-180"
              width={30}
              height={30}
              alt=";t"
            ></Image>
            Back to Dashboard
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function NavLinksDashboard() {
  return <></>;
}
