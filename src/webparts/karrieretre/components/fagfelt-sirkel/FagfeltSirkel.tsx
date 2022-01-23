import * as React from "react";
import {IRolle} from "../../models/IRolle";
import styles from "./FagfeltSirkel.module.scss";
import {IPosisjon} from "../../models/IPosisjon";
import {Tooltip} from "../tooltip/Tooltip";
import {RolleInformasjon} from "../rolle-informasjon/RolleInformasjon";
import {useState} from "react";
import {Typography} from "../typography/Typography";
import {Color} from "../../models/Color";
import {TooltipPosisjon} from "../../models/TooltipPosisjon";
import {Size} from "../../models/Size";


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
                            <Tooltip
                                content={<RolleInformasjon rolle={rolle}/>}
                                color={color} open={valgtRolle === rolle.Id} tooltipPosition={tooltipPosisjon}>
                                <Typography variant={"body1"}>{rolle.Title}</Typography>
                            </Tooltip>
                        </li>;
                    })}
                </ul>
            </div>

        </div>
    </div>;
};
