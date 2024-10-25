import Link from "next/link";

interface NavItemProps {
  href: string;
  text: string;
  isActive: boolean;
  sticky: boolean;
  onClick?: () => void;
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
      className={`px-4 py-2 text-lg rounded-3xl font-semibold transition duration-300 ${
        isActive ? "border-b-2 border-blue-400" : ""
      } ${
        sticky
          ? "text-blue-950 hover:bg-gray-100"
          : "text-blue-950 hover:bg-gray-100"
      } transition duration-300`}
    >
      {text}
    </Link>
  );
}
