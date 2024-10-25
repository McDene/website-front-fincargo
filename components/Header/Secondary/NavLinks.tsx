import NavItem from "./NavItem";

interface NavLinksProps {
  menuItems: { name: string; href: string }[];
  sticky: boolean;
  pathname: string;
}

export default function NavLinks({
  menuItems,
  sticky,
  pathname,
}: NavLinksProps) {
  return (
    <div className="flex space-x-4 ">
      {menuItems.map((item) => (
        <NavItem
          key={item.name}
          href={item.href}
          text={item.name}
          isActive={pathname === item.href}
          sticky={sticky}
        />
      ))}
    </div>
  );
}
