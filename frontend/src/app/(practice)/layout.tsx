import Link from "next/link";

export default function PracticeLayout({
  children,
  marketting,
  sales,
}: {
  children: React.ReactNode;
  marketting: React.ReactNode;
  sales: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex gap-10 m-8">
        <Link className="hover:underline" href="/development">
          Development
        </Link>
        <Link className="hover:underline" href="/testing">
          Testing
        </Link>
        <Link className="hover:underline"
         href="/marketting">
          Marketing
        </Link>
        <Link className="hover:underline"
         href="/marketing/settings">
          Settings
        </Link>
        <Link className="hover:underline"
         href="/sales">
          Sales
        </Link>
      </nav>
     <div className="p-8">
       {children}
     </div>
      <div className="flex p-8 gap-4">
        {marketting}
        {sales}
      </div>
    </div>
  );
}
