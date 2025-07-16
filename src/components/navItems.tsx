"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Top Sales", href: "/products/top-sales" },
  { name: "New Products", href: "/products/new" },
  { name: "Mobiles", href: "/products/mobiles" },
  { name: "Accessories", href: "/products/accessories" },
];

export const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            pathname === item.href ? "font-bold text-blue-600" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
