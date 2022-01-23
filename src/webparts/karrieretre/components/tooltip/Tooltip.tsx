import * as React from "react";
import styles from "./Tooltip.module.scss";
import {Color} from "../../models/Color";
import {TooltipPosisjon} from "../../models/TooltipPosisjon";


type TooltipProps = {
    content: React.ReactNode,
    children: React.ReactNode,
    color: Color
    open: boolean
    tooltipPosition: TooltipPosisjon
};

export const Tooltip = ({content, children, color, open, tooltipPosition}: TooltipProps) => {
    return <div className={`${styles.tooltip}`}>
        <div className={`${open ? styles.open : styles.close} ${styles.tooltipContent} ${styles[color]} ${styles[tooltipPosition]}`}>{content}</div>
        {children}
    </div>;
};
