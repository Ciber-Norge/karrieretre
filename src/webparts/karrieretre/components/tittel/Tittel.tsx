import * as React from 'react';

type KarrieretreProps = {
    children: string
    color: string
    position: { x: number, y: number }
};

export const Tittel = ({children, position, color}: KarrieretreProps) => {

    return <h2 style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`, color, margin: 0}}>
        {children}
    </h2>;
};


