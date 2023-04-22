import {Typography} from "../typography/Typography";
import {CSSProperties, useState} from "react";
import {Button} from "../button/Button";
import * as React from "react";
import {IAvdelinger, IFagfelt} from "../Karrieretre.util";

type TableFagfeltProps = {
    avdelingsTittel: string
    fagfelter: IFagfelt[]
    avdelinger: IAvdelinger[]
    setAvdelinger: (avdelinger: IAvdelinger[])=>void
    cssOptions: string[]
}

export const TableFagfelt = ({fagfelter, avdelinger, setAvdelinger, avdelingsTittel, cssOptions}: TableFagfeltProps) => {

    const [attribute, setAttribute] = useState(cssOptions[0]);

    return <table>
        <thead>
        <tr>
            <th align="left">Fagfelt</th>
            <th align="left">Css: <select value={attribute} onChange={(ev) => setAttribute(ev.target.value.trim())}>
                <option value="">--Velg--</option>
                {cssOptions.map(navn => <option key={navn} value={navn}>{navn}</option>)}
            </select></th>
            <th align="left">Handling</th>
        </tr>
        </thead>
        <tbody>
        {fagfelter.map(({fagfeltTittel, options = {}}) => {
            const addAttribute = (value: string) => {
                setAvdelinger(avdelinger.map(avdeling => {
                    return avdeling.avdelingsTittel === avdelingsTittel ? {
                        ...avdeling, fagfelter: avdeling.fagfelter.map(fagfelt => {
                            return fagfelt.fagfeltTittel === fagfeltTittel ? {
                                ...fagfelt,
                                options: {...fagfelt.options, [attribute]: value}
                            } : fagfelt;
                        })
                    } : avdeling;
                }));
            };
            const handleDelete = () => {
                setAvdelinger(avdelinger.map(avdeling => {
                    return avdeling.avdelingsTittel === avdelingsTittel ? {
                        ...avdeling, fagfelter: avdeling.fagfelter.filter(fagfelt => {
                            return fagfelt.fagfeltTittel !== fagfeltTittel;
                        })
                    } : avdeling;
                }));
            };
            return <tr key={fagfeltTittel}>
                <td width="100%"><Typography variant="body1">{fagfeltTittel}: </Typography></td>
                <td>
                    <input value={options[attribute as keyof CSSProperties] || ""}
                           onChange={(e) => addAttribute(e.target.value)}/>
                </td>
                <td><Button onClick={handleDelete}>Slett</Button></td>
            </tr>;
        })}

        </tbody>
    </table>
};
