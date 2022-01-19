import * as React from "react";
import {IRolle} from "../../rest/IRolle";
import styles from "./FagfeltSirkel.module.scss";
import {useEffect, useState} from "react";
import {IPosisjon} from "../IPosisjon";
import {Popup} from "../popup/Popup";


type FagfeltSirkelProps = {
    title: string
    roller: IRolle[]
    color: "green",
    position: { x: number, y: number }
};

export const FagfeltSirkel = ({roller, title, color, position}: FagfeltSirkelProps) => {
    const [popup, setPopup] = useState<IPosisjon>();

    useEffect(() => {
        console.log(popup);
    }, [popup]);

    return <div className={`${styles.fagfelt}`}
                style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`}}>
        <h3 className={`${styles[`${color}-title`]}`}>{title}</h3>
        <div className={`${styles[color]} ${styles.sirkel}`}
        >

            <ul>
                {roller.map((rolle) => {
                    return <li key={rolle.Id}
                               onMouseEnter={(e) => setPopup({x: e.screenX, y: e.screenY})}
                               onMouseLeave={() => setPopup(undefined)}>{rolle.Title}</li>;
                })}
            </ul>
            <Popup position={popup}/>
        </div>
    </div>;
};
