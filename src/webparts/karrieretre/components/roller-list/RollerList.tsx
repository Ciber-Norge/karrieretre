import * as React from "react";
import {IRolle} from "../../rest/IRolle";


type RollerListProps = {
    roller: IRolle[]
};

export const RollerList = (props: RollerListProps) => {
    const {roller} = props;
    return <>
        <h2 id="roller-list-tittel">Liste over tilgjengelige roller</h2>
        <ul aria-labelledby="roller-list-tittel">
            {roller.map((rolle) => {
                return <li key={rolle.Id}>{rolle.Title}</li>;
            })}
        </ul>
    </>;
};
