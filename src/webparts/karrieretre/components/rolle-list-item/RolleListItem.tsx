import * as React from "react";
import {useState} from "react";
import {IRolle} from "../../models/IRolle";
import {RolleInformasjon} from "../rolle-informasjon/RolleInformasjon";
import {Typography} from "../typography/Typography";
import {Color} from "../../models/Color";
import {usePopper} from "react-popper";
import styles from "./RolleListItem.module.scss";


type FagfeltSirkelProps = {
    rolle: IRolle
    setValgtRolle: (id: number) => void
    color: Color
    valgtRolle: number
};

export const RolleListItem = ({rolle, setValgtRolle, color, valgtRolle}: FagfeltSirkelProps) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const {styles: popperStyle, attributes} = usePopper(referenceElement, popperElement, {placement: "top"});

    const handleKey = (event: React.KeyboardEvent)=>{
        if (event.key === "Enter") {
            setValgtRolle(rolle.Id);
        }
    }

    return <>
        <li ref={setReferenceElement}>
            <div role="button" onClick={() => {
                setValgtRolle(rolle.Id);
            }} tabIndex={0} onKeyDown={handleKey}>
                <Typography variant={"body1"}>{rolle.Title}</Typography>
            </div>
            {valgtRolle === rolle.Id && <div ref={setPopperElement}
                                             className={styles.tooltip}
                                             style={popperStyle.popper} {...attributes.popper}
            >
                <div className={`${styles.tooltipContent} ${styles[color]}`}>
                    <RolleInformasjon rolle={rolle}/>
                </div>
            </div>}
        </li>

    </>;
};
