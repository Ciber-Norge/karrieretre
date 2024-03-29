import * as React from "react";
import {useState} from "react";
import {Button} from "../button/Button";
import styles from "./AddFagfelt.module.scss";

type AddFagfeltProps = {
    onAddFagfelt: (navn: string) => void
    options: string[]
}

export const AddFagfelt = ({onAddFagfelt, options}: AddFagfeltProps) => {
    const [valgtRolle, setValgtRolle] = useState("");
    return <div className={styles.container}>
        <div>
            <label htmlFor="fagfelt-select">Velg fagfelt: </label>
            <select name="fagfelt" id="fagfelt-select" value={valgtRolle} onChange={(ev) => setValgtRolle(ev.target.value)}>
                <option value="">--Velg--</option>
                {options.map(navn => <option key={navn} value={navn}>{navn}</option>)}
            </select>
        </div>
        <Button disabled={!valgtRolle} onClick={() => onAddFagfelt(valgtRolle)}>Legg til</Button>
    </div>;
};
