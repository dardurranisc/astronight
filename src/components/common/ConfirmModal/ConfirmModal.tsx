import { createPortal } from 'react-dom';

import Button from '@components/Button';

import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ isOpen, onCancel, onConfirm }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.confirmOverlay} onClick={onCancel}>
      <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.basketBlock}>
          <img className={styles.basket} src="/images/confirmModal/delete.svg" alt="basket" />
        </div>
        <h1>Are you sure?</h1>
        <div className={styles.buttons}>
          <Button text=".yep." onClick={onConfirm} />
          <Button text=".nope." variant="tertiary" onClick={onCancel} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
