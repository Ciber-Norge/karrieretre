import * as React from "react";
import styles from "./Popup.module.scss";
import {IPosisjon} from "../IPosisjon";


type FagfeltSirkelProps = {
    position: IPosisjon
};

export const Popup = ({position}: FagfeltSirkelProps) => {


    return <div className={`${styles.popup}`}
                style={{position: "absolute", right: `${position.x}px`, top: `${position.y}px`}}>
            Jeg heter Lasse
    </div>;
};
