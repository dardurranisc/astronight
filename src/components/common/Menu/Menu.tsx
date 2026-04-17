import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { menuData } from "./constants/menuData";

import styles from "./Menu.module.scss";

interface MenuProps {
  variant?: "desktop" | "mobile";
}

const Menu = ({ variant = "desktop" }: MenuProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <nav
      className={clsx(styles.nav , variant === "mobile" && styles.mobileNav )}
      aria-label="Главное меню"
    >
      <div className={clsx(styles.menu , styles[`${variant}Menu`])}>
        {menuData.map((link) => (
          <Link 
            href={link.href}
            className={clsx(styles.menuItem,pathname === link.href && styles.currentActive)}
            key={link.id}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
