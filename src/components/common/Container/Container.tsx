import { ReactNode } from "react";

import clsx from "clsx";

import styles from "./Container.module.scss";

interface ContainerProps {
  variant?: "default" | "secondary" | "modal";
  children: ReactNode;
}

const Container = ({ variant = "default", children }: ContainerProps) => {
  return (
    <div className={clsx(styles[variant],styles.container)}>
      {children}
    </div>
  );
};

export default Container;
