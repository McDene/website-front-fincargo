import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileMenu({ menuOpen, toggleMenu }: MobileMenuProps) {
  // Désactive le scroll lorsque le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Bloque le scroll
    } else {
      document.body.style.overflow = ""; // Réactive le scroll
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const { t } = useTranslation();

  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "-100%" },
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-b from-darkBlue to-black z-50 flex flex-col items-center text-center h-screen"
        >
          <div className="w-full flex justify-between items-center px-5 pt-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/logo/logo_fincargo_white.svg"
                  alt="Fincargo Logo"
                  width={150}
                  height={40}
                />
              </Link>
            </div>

            {/* Bouton de fermeture */}
            <button onClick={toggleMenu}>
              <XMarkIcon className="w-10 h-10 text-gray-50" />
            </button>
          </div>

          {/* Liens */}
          <motion.div className="flex flex-col space-x-4 pt-36 pb-36 text-lg">
            <Link
              href="/"
              className={`px-4 py-2 mb-12 text-3xl text-gray-50 font-bold transition-all duration-300 ease-in-out rounded-full}`}
            >
              {t("for_carriers")}
            </Link>

            <Link
              href="/freight-forwarders"
              className={`px-4 py-2 text-3xl text-gray-50 font-bold transition-all duration-300 ease-in-out rounded-full `}
            >
              {t("for_freight_forwarders")}
            </Link>
          </motion.div>

          {/* Boutons Register et Login */}
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a href="https://app.fincargo.ai/register" target="_blank">
              <button className="text-white text-xl bg-gray-900 px-8 py-4 rounded-full hover:bg-gray-800">
                {t("register")}
              </button>
            </a>

            <a href="https://app.fincargo.ai/login" target="_blank">
              <button className="text-gray-900 text-xl bg-gray-200 px-8 py-4 rounded-full hover:bg-gray-100">
                {t("login")}
              </button>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
