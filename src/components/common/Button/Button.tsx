import clsx from "clsx"

import styles from "./Button.module.scss"

interface ButtonProps {
    text:string,
    ariaLabel?:string,
    variant?:'default' | 'secondary',
    type?:'button' | "submit",
    onClick?:() => void
}

const Button = ({
    text,
    ariaLabel,
    variant = "default",
    type = "button",
    onClick
}:ButtonProps) => {
    return(
        <button 
            className={clsx(styles.button,styles[`${variant}`])}
            onClick={onClick}
            aria-label={ariaLabel}
            type={type}
        >
          {text}
      </button>
    )
}

export default Button