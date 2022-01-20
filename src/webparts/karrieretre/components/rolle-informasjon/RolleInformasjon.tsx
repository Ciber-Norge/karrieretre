import * as React from "react";
import {IRolle} from "../../rest/IRolle";
import styles from "./RolleInformasjon.module.scss";

type RolleInformasjonProps = {
    rolle: IRolle
};

export const RolleInformasjon = ({rolle}: RolleInformasjonProps) => {

    return <div role={"grid"} className={styles.grid}>
        <GridRow title={"Rolle"} description={rolle.Title}/>
        <GridRow title={"Rolle-Beskrivelse"} description={rolle.Rollebeskrivelse}/>
        <GridRow title={"Formell kompetanse"} subtitle={"Utdanning, kurs, sertifiseringer, e-læring"}
                 description={rolle.Formellkompetanse}/>
        <GridRow title={"Erfaringer"} subtitle={"Eksponering gjennom prosjektroller og verv"}
                 description={rolle.Erfaring}/>
        <GridRow title={"Personlig egenskaper"} subtitle={"Consulting skills"}
                 description={rolle.Personligeegenskaper}/>
    </div>;
};

type GridRowProps = {
    title: string;
    subtitle?: string;
    description: string;
};

const GridRow = ({title, description, subtitle}: GridRowProps) => {
    return <div className={styles.gridrow}>
        <div role="rowheader" className={styles.rowheader}>
            {title}
            {subtitle && <p>{subtitle}</p>}
        </div>
        <div role="gridcell" className={styles.gridcell}>{description}</div>
    </div>;
};
