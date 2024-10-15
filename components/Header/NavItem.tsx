import Link from "next/link";

interface NavItemProps {
  href: string;
  text: string;
  isActive: boolean;
  sticky: boolean;
  onClick?: () => void; // Optionnel pour les liens du menu mobile
}

export default function NavItem({
  href,
  text,
  isActive,
  sticky,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-1 py-2 text-lg font-semibold ${
        isActive ? "border-b-2 border-blue-400" : ""
      } ${sticky ? "text-blue-950" : "text-white"} transition duration-300`}
    >
      {text}
    </Link>
  );
}
