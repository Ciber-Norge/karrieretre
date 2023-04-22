import * as React from 'react';
import styles from "./Tittel.module.scss";
import {Typography} from "../typography/Typography";
import {Color} from "../../models/Color";
import {AbsolutePosition} from "../absolute-position/AbsolutePosition";
import {IPosisjon} from "../../models/IPosisjon";

type KarrieretreProps = {
    children: React.ReactNode
    color: Color
    position: IPosisjon
    canEdit: boolean
    onDragEnd: (position: IPosisjon) => void
};

export const Tittel = ({children, position, color, canEdit, onDragEnd}: KarrieretreProps) => {

    return <AbsolutePosition position={position} canEdit={canEdit} onDragEnd={onDragEnd} dragPosition={{y: 3, x: -23}}>
        <div className={`${styles[color]}`}
             style={{width: 0}}>
            <Typography variant={"h2"} upperCase>{children}</Typography>
        </div>
    </AbsolutePosition>;
};


