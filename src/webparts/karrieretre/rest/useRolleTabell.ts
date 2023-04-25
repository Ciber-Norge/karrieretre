import {useEffect, useState} from "react";
import {SPHttpClient} from "@microsoft/sp-http";
import {IRolle} from "../models/IRolle";

type FetchStateType = "idle" | "loading" | "error" | "success";

type UseRolleTabellProps = {
    spHttpClient: SPHttpClient,
    absoluteUrl: string
    tableTitle: string
};

export const useRolleTabell = ({spHttpClient, absoluteUrl, tableTitle}: UseRolleTabellProps) => {
    const [roller, setRoller] = useState<IRolle[]>([]);
    const [state, setState] = useState<FetchStateType>("idle");

    useEffect(() => {
        setState("loading");
        spHttpClient.get(`${absoluteUrl}/_api/web/lists/GetByTitle('${tableTitle}')/items`, SPHttpClient.configurations.v1).then((result) => {
            return result.json();
        }).then((body: { value: IRolle [] }) => {
            setRoller(getRollerMappedWithFallback(body.value));
            setState("success");
        }).catch(() => {
            setState("error");
        });
    }, [tableTitle]);

    return {state, roller};
};

function getRollerMappedWithFallback(roller: IRolle []) {
    return roller.map(rolle => ({
        ...rolle,
        Kluster: rolle.Kluster ?? rolle.field_0,
        Akse: rolle.Akse ?? rolle.field_1,
        Rollebeskrivelse: rolle.Rollebeskrivelse ?? rolle.field_2,
        Formellkompetanse: rolle.Formellkompetanse ?? rolle.field_3,
        Erfaring: rolle.Erfaring ?? rolle.field_4,
        Personligeegenskaper: rolle.Personligeegenskaper ?? rolle.field_5,
        Kontaktperson: rolle.Kontaktperson ?? rolle.field_6,
        Sistoppdatert: rolle.Sistoppdatert ?? rolle.field_7,
        Oppdatertav: rolle.Oppdatertav ?? rolle.field_8
    }))
}
