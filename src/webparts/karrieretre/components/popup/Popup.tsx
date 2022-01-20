import * as React from "react";
import styles from "./Popup.module.scss";


type FagfeltSirkelProps = {
    content: React.ReactNode,
    children: React.ReactNode,
    color: "green"
};

export const Popup = ({content, children, color}: FagfeltSirkelProps) => {


    return <div className={`${styles.tooltip}`}>
        <div className={`${styles.tooltipContent} ${styles[color]}`}>{content}</div>
        {children}
    </div>;
};
