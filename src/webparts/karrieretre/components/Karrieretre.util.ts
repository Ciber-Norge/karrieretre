import {IRolle} from "../models/IRolle";
import {AvdelingsType} from "../models/AvdelingsType";
import {FagfeltType} from "../models/FagfeltType";
import {IPosisjon} from "../models/IPosisjon";
import {Color} from "../models/Color";

export interface IFagfelt {
    fagfeltTittel: FagfeltType;
    sirkelPosisjon: IPosisjon;
    options?: Partial<React.CSSProperties>
}

export interface IAvdelinger {
    avdelingsTittel: AvdelingsType;
    titlePosisjon: IPosisjon;
    color: Color;
    fagfelter: IFagfelt[];
}

const defaultAvdelinger: IAvdelinger[] = [
    {
        avdelingsTittel: "Rådgivning",
        titlePosisjon: {x: 64, y: 8},
        color: "green",
        fagfelter: [
            {
                fagfeltTittel: "Sikkerhet",
                sirkelPosisjon: {x: 82, y: 0},
            },
            {
                fagfeltTittel: "Arkitektur",
                sirkelPosisjon: {x: 49, y: 10},
            },
            {
                fagfeltTittel: "Test og testledelse",
                sirkelPosisjon: {x: 67, y: 16},
            },
            {
                fagfeltTittel: "Design",
                sirkelPosisjon: {x: 90, y: 20},
            },
            {
                fagfeltTittel: "Prosjektledelse",
                sirkelPosisjon: {x: 50, y: 30},
            },
            {
                fagfeltTittel: "Utredning og analyse",
                sirkelPosisjon: {x: 75, y: 35},
            }
        ]
    },
    {
        avdelingsTittel: "Ledelse",
        titlePosisjon: {x: 41, y: 50},
        color: "orange",
        fagfelter: [
            {
                fagfeltTittel: "Ledelse",
                sirkelPosisjon: {x: 22, y: 52},
            }
        ]
    },
    {
        avdelingsTittel: "Utvikling",
        titlePosisjon: {x: 22, y: 5},
        color: "blue",
        fagfelter: [
            {
                fagfeltTittel: "Utvikling",
                sirkelPosisjon: {x: 10, y: 8},
            },
            {
                fagfeltTittel: "Design",
                sirkelPosisjon: {x: 28, y: 12},
            },
            {
                fagfeltTittel: "Utviklingsprosjektledelse",
                sirkelPosisjon: {x: 29, y: 30},
            },
            {
                fagfeltTittel: "Teknisk arkitektur",
                sirkelPosisjon: {x: 38, y: 0},
            }
        ]
    },
    {
        avdelingsTittel: "Digital workspace",
        titlePosisjon: {x: 3, y: 29},
        color: "grey",
        fagfelter: [
            {
                fagfeltTittel: "Digital workspace",
                sirkelPosisjon: {x: 5, y: 36},
            }
        ]
    },
    {
        avdelingsTittel: "Salg",
        titlePosisjon: {x: 77, y: 62},
        color: "red",
        fagfelter: [
            {
                fagfeltTittel: "Salg",
                sirkelPosisjon: {x: 56, y: 60},
            }
        ]
    }
];
export const getAvdelinger = (avdelingerString: string): IAvdelinger[] => {
    return avdelingerString ? JSON.parse(avdelingerString) ?? defaultAvdelinger : defaultAvdelinger;
};

export const filtrerRoller = (roller: IRolle[], avdeling: AvdelingsType, fagfelt?: FagfeltType): IRolle[] => {
    return roller.filter((rolle) => {
        if (!fagfelt) {
            return rolle.Kluster.toUpperCase() === avdeling.toUpperCase();
        }
        return rolle.Kluster.toUpperCase() === avdeling.toUpperCase() && rolle.Akse.toUpperCase() === fagfelt.toUpperCase();
    });
};

export const getAvailableAvdelinger = (roller: IRolle[]): AvdelingsType[]=>{
    const set = new Set(roller.filter(r=>!!r.Kluster).map(rolle=>rolle.Kluster))
    const array: string [] = [];
    set.forEach(v => array.push(v));
    return array
}

export const getAvailableFagfelt = (roller: IRolle[], avdeling: AvdelingsType, selectedFagfelt: FagfeltType[]): AvdelingsType[]=>{
    const set = new Set(roller.filter(r=>r.Kluster.toUpperCase() === avdeling.toUpperCase()).map(rolle=>rolle.Akse))
    const array: string [] = [];
    set.forEach(v => {
        if(selectedFagfelt.indexOf(v) === -1){
            array.push(v)
        }
    });
    return array
}


