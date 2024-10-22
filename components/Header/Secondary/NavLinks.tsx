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
  console.log("Menu items: ", menuItems); // Ajout pour déboguer

  return (
    <div className="flex space-x-4 ">
      {menuItems.map((item) => (
        <NavItem
          key={item.name}
          href={item.href} // Utilise "href" ici
          text={item.name}
          isActive={pathname === item.href} // Comparer avec le "pathname" actuel
          sticky={sticky}
        />
      ))}
    </div>
  );
}
