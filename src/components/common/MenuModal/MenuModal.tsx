import { createPortal } from "react-dom";
import { ReactNode } from "react";

import styles from "./MenuModal.module.scss";

interface MenuModalProps {
  children: ReactNode;
  isMenuOpen: boolean;
  topFromHeader: number;
  onClose: () => void;
}

const MenuModal = ({
  children,
  isMenuOpen,
  topFromHeader,
  onClose,
}: MenuModalProps) => {
  if (!isMenuOpen) return null;
  return createPortal(
    <div
      style={{
        top: topFromHeader,
        height: `calc(100% - ${topFromHeader}px)`,
      }}
      className={styles.overlay}
      onClick={onClose}
      role="menu"
      aria-label="Мобильное меню"
    >
      <button
        className={styles.btnClose}
        onClick={onClose}
        aria-label="Закрыть меню"
      />
      {children}
      <button
        className={styles.btnCloseOverlay}
        onClick={onClose}
        aria-label="Закрыть меню"
      />
    </div>,
    document.body,
  );
};

export default MenuModal;
