import NavItem from "./NavItem";

interface NavLinksProps {
  menuItems: { name: string; anchor: string }[];
  sticky: boolean;
  pathname: string;
}

export default function NavLinks({
  menuItems,
  sticky,
  pathname,
}: NavLinksProps) {
  return (
    <div className="flex space-x-4">
      {menuItems.map((item) => (
        <NavItem
          key={item.name}
          href={item.anchor}
          text={item.name}
          isActive={pathname === item.anchor}
          sticky={sticky}
        />
      ))}
    </div>
  );
}
