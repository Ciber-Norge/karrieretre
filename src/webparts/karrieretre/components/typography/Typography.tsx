import * as React from "react";
import styles from "./Typography.module.scss";

type TypographyProps = {
    variant: "h1" | "h2" | "h3" | "body1" | "body2"
    children: React.ReactNode
    upperCase?: boolean
    className?:string
};

export const Typography = ({variant, children, upperCase = false, className}: TypographyProps) => {
    const getDefaultComponent = () => {
        if (variant === "body1" || variant === "body2") {
            return "div";
        }
        return variant;
    };
    const Tag = getDefaultComponent();
    return <Tag className={`${styles[variant]} ${styles.zeroMargin} ${upperCase && styles.upperCase} ${className}`}>{children}</Tag>;
};
