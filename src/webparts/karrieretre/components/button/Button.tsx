import * as React from "react";
import {MouseEventHandler} from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: string
    disabled?: boolean
}
export const Button = ({onClick, children, disabled}: ButtonProps)=>{
    return <button disabled={disabled} className={styles.buttonPrimary} type="button" onClick={onClick}>{children}</button>
}
