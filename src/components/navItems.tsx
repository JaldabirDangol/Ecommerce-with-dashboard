import Link from "next/link";

const navItems = [
  { name: "Top Sales", href: "/product/top-sales" },
  { name: "New Products", href: "/product/new" },
  { name: "Mobiles", href: "/product?search=mobile" },
  { name: "Accessories", href: "/product?search=accessories" },
];

export const NavMenu = () => {

  return (
    <nav className="flex gap-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
