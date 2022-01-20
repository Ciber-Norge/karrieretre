import * as React from 'react';
import {SPHttpClient} from "@microsoft/sp-http";
import {SvgTre} from "./svg-tre/SvgTre";
import {useRolleTabell} from "../rest/useRolleTabell";
import {Tittel} from "./tittel/Tittel";
import {IRolle} from "../rest/IRolle";
import {FagfeltSirkel} from "./fagfelt-sirkel/FagfeltSirkel";
import {IPosisjon} from "./IPosisjon";
import "./Karrieretre.module.scss";
import {Stige} from "./stiger/Stige";

type KarrieretreProps = {
    description: string;
    spHttpClient: SPHttpClient;
    absoluteUrl: string;
};

export const Karrieretre = ({spHttpClient, absoluteUrl}: KarrieretreProps) => {
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
            tooltipPosisjon: "left",
            fagfelter: [
                {
                    fagfeltTittel: "Sikkerhet",
                    sirkelPosisjon: {x: 82, y: 6},
                    size: "small"
                },
                {
                    fagfeltTittel: "Arkitektur",
                    sirkelPosisjon: {x: 49, y: 10},
                    size: "medium"
                },
                {
                    fagfeltTittel: "Test og testledelse",
                    sirkelPosisjon: {x: 67, y: 16},
                    size: "medium"
                },
                {
                    fagfeltTittel: "Design",
                    sirkelPosisjon: {x: 85, y: 20},
                    size: "small"
                },
                {
                    fagfeltTittel: "Prosjektledelse",
                    sirkelPosisjon: {x: 50, y: 28},
                    size: "large"
                },
                {
                    fagfeltTittel: "Utredning og analyse",
                    sirkelPosisjon: {x: 75, y: 33},
                    size: "medium"
                }
            ]
        },
        {
            avdelingsTittel: "Ledelse",
            titlePosisjon: {x: 41, y: 50},
            color: "orange",
            tooltipPosisjon: "rightTop",
            fagfelter: [
                {
                    fagfeltTittel: "Ledelse",
                    sirkelPosisjon: {x: 22, y: 52},
                    size: "xLarge"
                }
            ]
        },
        {
            avdelingsTittel: "Utvikling",
            titlePosisjon: {x: 22, y: 5},
            color: "blue",
            tooltipPosisjon: "right",
            fagfelter: [
                {
                    fagfeltTittel: "Utvikling",
                    sirkelPosisjon: {x: 10, y: 8},
                    size: "medium"
                },
                {
                    fagfeltTittel: "Design",
                    sirkelPosisjon: {x: 28, y: 12},
                    size: "medium"
                },
                {
                    fagfeltTittel: "Utviklingsprosjektledelse",
                    sirkelPosisjon: {x: 29, y: 30},
                    size: "medium"
                },
                {
                    fagfeltTittel: "Teknisk arkitektur",
                    sirkelPosisjon: {x: 38, y: 0},
                    size: "small"
                }
            ]
        },
        {
            avdelingsTittel: "Digital workspace",
            titlePosisjon: {x: 3, y: 29},
            color: "grey",
            tooltipPosisjon: "right",
            fagfelter: [
                {
                    fagfeltTittel: "Digital workspace",
                    sirkelPosisjon: {x: 5, y: 36},
                    size: "medium"
                }
            ]
        },
        {
            avdelingsTittel: "Salg",
            titlePosisjon: {x: 77, y: 62},
            color: "red",
            tooltipPosisjon: "leftTop",
            fagfelter: [
                {
                    fagfeltTittel: "Salg",
                    sirkelPosisjon: {x: 56, y: 60},
                    size: "large"
                }
            ]
        }
    ];

    return <>
        <SvgTre/>
        <Stige variant={"1"} style={{position: "absolute", top: "52%", left: "71%"}}/>
        <Stige variant={"2"} style={{position: "absolute", top: "58%", left: "47%"}}/>
        <Stige variant={"3"} style={{position: "absolute", top: "4%", left: "52%"}}/>
        <Stige variant={"4"} style={{position: "absolute", top: "26%", left: "20%"}}/>

        {avdelinger.map(({color, titlePosisjon, avdelingsTittel, fagfelter, tooltipPosisjon}) => {
            const rollerForAvdeling = filtrerRoller(roller, avdelingsTittel);
            return <React.Fragment>
                <Tittel color={color} position={titlePosisjon}>
                    {avdelingsTittel}
                </Tittel>
                {fagfelter.map(({fagfeltTittel, sirkelPosisjon, size}) => {
                    return <FagfeltSirkel title={fagfeltTittel}
                                          tooltipPosisjon={tooltipPosisjon}
                                          roller={filtrerRoller(rollerForAvdeling, avdelingsTittel, fagfeltTittel)}
                                          color={color} position={sirkelPosisjon} size={size}/>;
                })}
            </React.Fragment>;
        })}
    </>;
};

export type Color = "green" | "orange" | "blue" | "red" | "grey";
export type TooltipPosisjon = "left" | "right" | "rightTop" | "leftTop";
export type Size = "xLarge" | "large" | "small" | "medium";

interface IFagfelt {
    fagfeltTittel: FagfeltType;
    sirkelPosisjon: IPosisjon;
    size: Size;
}

interface IAvdelinger {
    avdelingsTittel: AvdelingsType;
    titlePosisjon: IPosisjon;
    color: Color;
    tooltipPosisjon: TooltipPosisjon;
    fagfelter: IFagfelt[];
}

type AvdelingsType = "Rådgivning" | "Ledelse" | "Utvikling" | "Digital workspace" | "Salg";
type FagfeltType =
    "Arkitektur"
    | "Test og testledelse"
    | "Prosjektledelse"
    | "Sikkerhet"
    | "Utredning og analyse"
    | "Design"
    | "Utvikling"
    | "Utviklingsprosjektledelse"
    | "Teknisk arkitektur"
    | "Digital workspace"
    | "Salg"
    | "Ledelse";

const filtrerRoller = (roller: IRolle[], avdeling: AvdelingsType, fagfelt?: FagfeltType) => {
    return roller.filter((rolle) => {
        if (!fagfelt) {
            return rolle.Kluster.toUpperCase() === avdeling.toUpperCase();
        }
        return rolle.Kluster.toUpperCase() === avdeling.toUpperCase() && rolle.Akse.toUpperCase() === fagfelt.toUpperCase();
    });
};
