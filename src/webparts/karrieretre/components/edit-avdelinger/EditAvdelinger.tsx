import {Typography} from "../typography/Typography";
import * as React from "react";
import {getAvailableFagfelt, IAvdelinger} from "../Karrieretre.util";
import styles from "./EditAvdelinger.module.scss";
import {AddFagfelt} from "../add-fagfelt/AddFagfelt";
import {IRolle} from "../../models/IRolle";
import {TableFagfelt} from "./TableFagfelt";

type EditAvdelingerProps = {
    avdelinger: IAvdelinger[]
    setAvdelinger: (avdelinger: IAvdelinger[]) => void
    roller: IRolle[]
    cssOptions: string[]
}

export const EditAvdelinger = ({avdelinger, setAvdelinger, roller, cssOptions}: EditAvdelingerProps) => {

    return <>
        <Typography variant={"h2"} className="mb-1">Avdelinger</Typography>
        <div className={styles.container}>


        {avdelinger.map(({avdelingsTittel, fagfelter, color}) => {

            const handleAddFagfelt = (fagfeltTittel: string) => {
                setAvdelinger(avdelinger.map(avdeling => {
                    return avdeling.avdelingsTittel === avdelingsTittel ? {
                        ...avdeling, fagfelter: [...avdeling.fagfelter, {fagfeltTittel, sirkelPosisjon: {x: 0, y: 0}}]
                    } : avdeling;
                }));
            };

            const fagfeltOptions = getAvailableFagfelt(roller, avdelingsTittel, fagfelter.map(f => f.fagfeltTittel));

            return (<div key={avdelingsTittel}
                         className={`${styles.paddingContainer} ${styles[color]}`}>
                <Typography variant={"h3"}>{avdelingsTittel}</Typography>
                {fagfeltOptions.length > 0 && <AddFagfelt onAddFagfelt={handleAddFagfelt}
                                                          options={fagfeltOptions}/>}
                <TableFagfelt setAvdelinger={setAvdelinger}
                              cssOptions={cssOptions}
                              avdelinger={avdelinger}
                              fagfelter={fagfelter}
                              avdelingsTittel={avdelingsTittel}/>
            </div>);
        })}

    </div></>;
};
