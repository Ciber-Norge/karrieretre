import * as React from 'react';
import styles from "./Tittel.module.scss";
import {Typography} from "../typography/Typography";

type KarrieretreProps = {
    children: React.ReactNode
    color: string
    position: { x: number, y: number }
};

export const Tittel = ({children, position, color}: KarrieretreProps) => {

    return <div className={`${styles[color]}`} style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`}}>
        <Typography variant={"h2"}>{children}</Typography>
    </div>;
};


