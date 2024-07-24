"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import LinksIcon from "./icons/LinksIcon";
import ProfileIcon from "./icons/ProfileIcon";
import EyeIcon from "/public/ph_eye-bold.png";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        <nav className="">
          <ul className="flex">
            <li className="px-7">
              <Link href="/" passHref>
                <p
                  className={`block w-full py-2 px-4 rounded-lg transition-colors ${
                    pathname === "/"
                      ? "bg-purple-100 text-[#633CFF]"
                      : "text-[rgb(115,115,115)] hover:text-[#633CFF]"
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <LinksIcon />
                    <span className="hidden md:block">Links</span>
                  </span>
                </p>
              </Link>
            </li>
            <li className="px-7">
              <Link href="/profile" passHref>
                <p
                  className={`block w-full py-2 px-4 rounded-lg transition-colors ${
                    pathname === "/profile"
                      ? "bg-purple-100 text-[#633CFF]"
                      : "text-[#737373] hover:text-[#633CFF]"
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <ProfileIcon />
                    <span className="hidden md:block">Profile Details</span>
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <Link href="/preview" passHref>
          <div className="px-4 py-2 border border-[#633CFF] text-[#633CFF] rounded-md">
            <div className=" relative md:hidden">
              <Image src={EyeIcon} alt="preview" />
            </div>

            <span className="hidden md:block">Preview</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
