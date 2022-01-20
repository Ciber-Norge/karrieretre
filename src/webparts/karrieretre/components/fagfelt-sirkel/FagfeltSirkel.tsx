import * as React from "react";
import {IRolle} from "../../rest/IRolle";
import styles from "./FagfeltSirkel.module.scss";
import {IPosisjon} from "../IPosisjon";
import {Popup} from "../popup/Popup";
import {RolleInformasjon} from "../rolle-informasjon/RolleInformasjon";
import {useState} from "react";
import {Typography} from "../typography/Typography";
import {Color, Size, TooltipPosisjon} from "../Karrieretre";


type FagfeltSirkelProps = {
    title: string
    roller: IRolle[]
    color: Color,
    position: IPosisjon,
    size: Size,
    tooltipPosisjon: TooltipPosisjon
};

export const FagfeltSirkel = ({roller, title, color, position, size, tooltipPosisjon}: FagfeltSirkelProps) => {
    const [valgtRolle, setValgtRolle] = useState<number>();

    return <div className={`${styles.fagfelt} ${styles[size]} ${styles[color]}`}
                style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`}}
                onMouseLeave={() => setValgtRolle(undefined)}>

        <div className={`${styles.title}`}>
            <Typography variant={"h3"}>{title}</Typography>
        </div>

        <div className={`${styles.sirkel}`}>
            <div className={styles.sirkelContainer}>
                <ul>
                    {roller.map((rolle) => {
                        return <li key={rolle.Id} onMouseEnter={() => {
                            setValgtRolle(rolle.Id);
                        }
                        }>
                            <Popup
                                content={<RolleInformasjon rolle={rolle}/>}
                                color={color} open={valgtRolle === rolle.Id} tooltipPosition={tooltipPosisjon}>
                                <Typography variant={"body1"}>{rolle.Title}</Typography>
                            </Popup>
                        </li>;
                    })}
                </ul>
            </div>

        </div>
    </div>;
};
