import * as React from "react";
import styles from "./Popup.module.scss";
import {Color, TooltipPosisjon} from "../Karrieretre";


type FagfeltSirkelProps = {
    content: React.ReactNode,
    children: React.ReactNode,
    color: Color
    open: boolean
    tooltipPosition: TooltipPosisjon
};

export const Popup = ({content, children, color, open, tooltipPosition}: FagfeltSirkelProps) => {
    return <div className={`${styles.tooltip}`}>
        <div className={`${open ? styles.open : styles.close} ${styles.tooltipContent} ${styles[color]} ${styles[tooltipPosition]}`}>{content}</div>
        {children}
    </div>;
};
