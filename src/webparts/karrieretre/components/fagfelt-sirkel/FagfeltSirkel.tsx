import * as React from "react";
import {useEffect, useState} from "react";
import {IRolle} from "../../models/IRolle";
import styles from "./FagfeltSirkel.module.scss";
import {IPosisjon} from "../../models/IPosisjon";
import {Typography} from "../typography/Typography";
import {Color} from "../../models/Color";
import {RolleListItem} from "../rolle-list-item/RolleListItem";
import {AbsolutePosition} from "../absolute-position/AbsolutePosition";


type FagfeltSirkelProps = {
    title: string
    roller: IRolle[]
    color: Color,
    position: IPosisjon,
    sirkelContainerStyle?: React.CSSProperties
    canEdit: boolean
    onDragEnd: (position: IPosisjon) => void
};

export const FagfeltSirkel = ({roller, title, color, position, sirkelContainerStyle, canEdit, onDragEnd}: FagfeltSirkelProps) => {
    const [valgtRolle, setValgtRolle] = useState<number>();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setValgtRolle(undefined);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return <AbsolutePosition position={position} canEdit={canEdit} onDragEnd={onDragEnd} dragPosition={{y: -21, x: "10%"}}>
        <div className={`${styles.fagfelt} ${styles[color]}`}
             onMouseLeave={() => setValgtRolle(undefined)}>
            <div className={`${styles.sirkel}`}>
                <div className={`${styles.title}`}>
                    <Typography variant={"h3"}>{title}</Typography>
                </div>
                <div className={styles.sirkelContainer} style={sirkelContainerStyle}>
                    <ul>
                        {roller.map((rolle) => {
                            return <RolleListItem rolle={rolle} setValgtRolle={setValgtRolle} color={color}
                                                  valgtRolle={valgtRolle} key={rolle.Id}/>;
                        })}
                    </ul>
                </div>

            </div>
        </div>
    </AbsolutePosition>;
};
