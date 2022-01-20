import * as React from "react";
import {IRolle} from "../../rest/IRolle";
import styles from "./FagfeltSirkel.module.scss";
import {IPosisjon} from "../IPosisjon";
import {Popup} from "../popup/Popup";
import {RolleInformasjon} from "../rolle-informasjon/RolleInformasjon";


type FagfeltSirkelProps = {
    title: string
    roller: IRolle[]
    color: "green",
    position: IPosisjon
};

export const FagfeltSirkel = ({roller, title, color, position}: FagfeltSirkelProps) => {

    return <div className={`${styles.fagfelt}`}
                style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`}}>
        <h3 className={`${styles[`${color}-title`]}`}>{title}</h3>
        <div className={`${styles[color]} ${styles.sirkel}`}
        >

            <ul>
                {roller.map((rolle) => {
                    return <li key={rolle.Id}><Popup
                        content={<RolleInformasjon rolle={rolle}/>}
                        color={color}>{rolle.Title}</Popup></li>;
                })}
            </ul>
        </div>
    </div>;
};
