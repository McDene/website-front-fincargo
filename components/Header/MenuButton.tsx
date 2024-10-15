import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface MenuButtonProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuButton({ menuOpen, toggleMenu }: MenuButtonProps) {
  return (
    <button onClick={toggleMenu} className="lg:hidden">
      {menuOpen ? (
        <XMarkIcon className="w-8 h-8 text-black" />
      ) : (
        <Bars3Icon className="w-8 h-8 text-black" />
      )}
    </button>
  );
}
