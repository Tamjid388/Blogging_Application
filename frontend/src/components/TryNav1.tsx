import Link from "next/link";
import { Button } from "./ui/button";
import { Hamburger } from "lucide-react";

export default function TryNav1() {
  const navitems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/contact" },
    { label: "Dashboard", href: "/contact" },
  ];
  return (
    <main className="flex justify-between max-w-7xl mx-auto py-4 px-4">
      <div className="">
        <h1 className="font-extrabold text-lg">DevBlog</h1>
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-4 text-lg font-semibold ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex gap-2 hidden sm:block">
          <Button>Login</Button>
          <Button>Get Started</Button>
        </div>
        <div className=" block md:hidden">
          <Hamburger />
        </div>
      </div>
    </main>
  );
}
