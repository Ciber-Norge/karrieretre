import * as React from 'react';
import {useEffect, useState} from 'react';
import {SPHttpClient} from "@microsoft/sp-http";
import {SvgTre} from "./svg-tre/SvgTre";
import {useRolleTabell} from "../rest/useRolleTabell";
import {Tittel} from "./tittel/Tittel";
import {FagfeltSirkel} from "./fagfelt-sirkel/FagfeltSirkel";
import styles from "./Karrieretre.module.scss";
import {Button} from "./button/Button";
import {filtrerRoller, getAvailableAvdelinger, getAvdelinger, IAvdelinger} from "./Karrieretre.util";
import {IPosisjon} from "../models/IPosisjon";
import {EditAvdelinger} from "./edit-avdelinger/EditAvdelinger";

type KarrieretreProps = {
    avdelingerString?: string;
    spHttpClient: SPHttpClient;
    absoluteUrl: string;
    tableTitle: string
    cssOptions: string[]
    hasEditPermission: boolean
};

export const Karrieretre = ({
                                spHttpClient,
                                absoluteUrl,
                                avdelingerString,
                                tableTitle,
                                cssOptions,
                                hasEditPermission
                            }: KarrieretreProps) => {
    const {roller, state} = useRolleTabell({spHttpClient, absoluteUrl, tableTitle});
    const [avdelinger, setAvdelinger] = useState<IAvdelinger[]>(getAvdelinger(avdelingerString));
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setAvdelinger(getAvdelinger(avdelingerString));
    }, [avdelingerString]);

    if (state === "loading") {
        return <span>Henter roller...</span>;
    }
    if (state === "error") {
        return <span>Det oppstod en feil ved henting av roller!</span>;
    }

    const handleEditButtonClick = async () => {
        if (editMode) {
            await navigator.clipboard.writeText(JSON.stringify(avdelinger));
        }
        setEditMode(!editMode);
    };

    const handleResetCss = () => {
        setAvdelinger(avdelinger.map(a => ({...a, fagfelter: a.fagfelter.map(f => ({...f, options: {}}))})));
    };

    const handleSyncAvdelinger = () => {
        const availableAvdelinger = getAvailableAvdelinger(roller)
        setAvdelinger(availableAvdelinger.map(avdelingsTittel => ({
            color: "green",
            avdelingsTittel,
            fagfelter: [],
            titlePosisjon: {x: 0, y: 0}
        })));
    }


    return <>
        <div className={styles.treeContainer}>
            <SvgTre/>

            {avdelinger.map(({color, titlePosisjon, avdelingsTittel, fagfelter}) => {
                const handleTitleDragEnd = (position: IPosisjon) => {
                    setAvdelinger(avdelinger.map(avdeling => {
                        return avdeling.avdelingsTittel === avdelingsTittel ? {
                            ...avdeling,
                            titlePosisjon: position
                        } : avdeling;
                    }));
                };
                const rollerForAvdeling = filtrerRoller(roller, avdelingsTittel);
                return <React.Fragment key={avdelingsTittel}>
                    <Tittel color={color} position={titlePosisjon} canEdit={editMode} onDragEnd={handleTitleDragEnd}>
                        {avdelingsTittel}
                    </Tittel>
                    {fagfelter.map(({fagfeltTittel, sirkelPosisjon, options = {}}) => {
                        const handleFagfeltDragEnd = (position: IPosisjon) => {
                            setAvdelinger(avdelinger.map(avdeling => {
                                return avdeling.avdelingsTittel === avdelingsTittel ? {
                                    ...avdeling, fagfelter: avdeling.fagfelter.map(fagfelt => {
                                        return fagfelt.fagfeltTittel === fagfeltTittel ? {
                                            ...fagfelt,
                                            sirkelPosisjon: position
                                        } : fagfelt;
                                    })
                                } : avdeling;
                            }));
                        };
                        return <FagfeltSirkel title={fagfeltTittel}
                                              key={fagfeltTittel}
                                              roller={filtrerRoller(rollerForAvdeling, avdelingsTittel, fagfeltTittel)}
                                              color={color} position={sirkelPosisjon}
                                              canEdit={editMode}
                                              onDragEnd={handleFagfeltDragEnd}
                                              sirkelContainerStyle={options}/>;
                    })}
                </React.Fragment>;
            })}


        </div>
        {editMode && <EditAvdelinger roller={roller} avdelinger={avdelinger} setAvdelinger={setAvdelinger}
                                     cssOptions={cssOptions}/>}
        <div className={styles.buttonContainer}>
            {hasEditPermission && <Button
                onClick={handleEditButtonClick}>{editMode ? "Avslutt redigering og kopier" : "Rediger"}</Button>}
            {editMode && <Button onClick={handleResetCss}>Nullstill css</Button>}
            {editMode && <Button onClick={handleSyncAvdelinger}>Synkroniser avdelinger med tabell</Button>}
        </div>

    </>;
};






