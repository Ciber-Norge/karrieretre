import * as React from "react";
import {IRolle} from "../../models/IRolle";
import styles from "./RolleInformasjon.module.scss";
import {Typography} from "../typography/Typography";

type GridRowProps = {
    title: string;
    subtitle?: string;
    description: string;
};

const GridRow = ({title, description, subtitle}: GridRowProps) => {
    return <div className={styles.gridrow}>
        <div role="rowheader" className={styles.rowheader}>
            <Typography variant={"h3"} upperCase>{title}</Typography>
            {subtitle && <Typography variant={"body2"}>{subtitle}</Typography>}
        </div>
        <div role="gridcell" className={styles.gridcell}><Typography variant={"body1"}>{description}</Typography></div>
    </div>;
};

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


