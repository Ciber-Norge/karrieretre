import {useEffect, useState} from "react";
import {SPHttpClient} from "@microsoft/sp-http";
import {IRolle} from "../models/IRolle";

type FetchStateType = "idle" | "loading" | "error" | "success";

type UseRolleTabellProps = {
    spHttpClient: SPHttpClient,
    absoluteUrl: string
};

export const useRolleTabell = ({spHttpClient, absoluteUrl}: UseRolleTabellProps) => {
    const [roller, setRoller] = useState<IRolle[]>([]);
    const [state, setState] = useState<FetchStateType>("idle");

    useEffect(() => {
        setState("loading");
        spHttpClient.get(`${absoluteUrl}/_api/web/lists/GetByTitle('RolleTabell')/items`, SPHttpClient.configurations.v1).then((result) => {
            return result.json();
        }).then((body: { value: IRolle [] }) => {
            setRoller(body.value);
            setState("success");
        }).catch(() => {
            setState("error");
        });
    }, []);

    return {state, roller};
};
