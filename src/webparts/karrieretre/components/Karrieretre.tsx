import * as React from 'react';
import {SPHttpClient} from "@microsoft/sp-http";
import {SvgTre} from "./svg-tre/SvgTre";
import {useRolleTabell} from "../rest/useRolleTabell";
import {Tittel} from "./tittel/Tittel";
import {IRolle} from "../rest/IRolle";
import {FagfeltSirkel} from "./fagfelt-sirkel/FagfeltSirkel";
import {IPosisjon} from "./IPosisjon";

type KarrieretreProps = {
    description: string;
    spHttpClient: SPHttpClient;
    absoluteUrl: string;
};

export const Karrieretre = ({description, spHttpClient, absoluteUrl}: KarrieretreProps) => {
    const {roller, state} = useRolleTabell({spHttpClient, absoluteUrl});


    if (state === "loading") {
        return <span>Henter roller...</span>;
    }
    if (state === "error") {
        return <span>Det oppstod en feil ved henting av roller!</span>;
    }

    const avdelinger: IAvdelinger[] = [
        {
            avdelingsTittel: "Rådgivning",
            titlePosisjon: {x: 62, y: 8},
            color: "green",
            fagfelter: [
                {
                    fagfeltTittel: "Arkitektur",
                    sirkelPosisjon: {x: 49, y: 22},
                },
                {
                    fagfeltTittel: "Test og testledelse",
                    sirkelPosisjon: {x: 70, y: 22},
                }
            ]
        }
    ];

    return <>
        <SvgTre/>
        {avdelinger.map(({color, titlePosisjon, avdelingsTittel, fagfelter}) => {
            return <React.Fragment>
                <Tittel color={color} position={titlePosisjon}>
                    {avdelingsTittel}
                </Tittel>
                {fagfelter.map(({fagfeltTittel, sirkelPosisjon}) => {
                    return <FagfeltSirkel title={fagfeltTittel}
                                          roller={filtrerRoller(roller, avdelingsTittel, fagfeltTittel)}
                                          color={color} position={sirkelPosisjon}/>;
                })}
            </React.Fragment>;
        })}
    </>;
};

type Color = "green";

interface IFagfelt {
    fagfeltTittel: FagfeltType;
    sirkelPosisjon: IPosisjon;
}

interface IAvdelinger {
    avdelingsTittel: AvdelingsType;
    titlePosisjon: IPosisjon;
    color: Color;
    fagfelter: IFagfelt[];
}

type AvdelingsType = "Rådgivning";
type FagfeltType = "Arkitektur" | "Test og testledelse";

const filtrerRoller = (roller: IRolle[], avdeling: AvdelingsType, fagfelt: FagfeltType) => {
    return roller.filter((rolle) => {
        return rolle.Kluster === avdeling && rolle.Akse === fagfelt;
    });
};
