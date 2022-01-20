import * as React from 'react';
import styles from "./Tittel.module.scss";

type KarrieretreProps = {
    children: string
    color: string
    position: { x: number, y: number }
};

export const Tittel = ({children, position, color}: KarrieretreProps) => {

    return <h2 className={styles[color]} style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`, margin: 0}}>
        {children}
    </h2>;
};


