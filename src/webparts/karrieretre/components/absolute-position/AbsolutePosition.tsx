import * as React from "react";
import {DragEventHandler, ReactNode, useState} from "react";
import styles from "./AbsolutePosition.module.scss";
import {IPosisjon} from "../../models/IPosisjon";


const DragIcon = () => {
    return <svg width="16px" height="16px" viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg">
        <title>drag arrow</title>
        <g>
            <g>
                <rect width="48" height="48" fill="none"/>
            </g>
            <g>
                <path
                    d="M45.4,22.6l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L39.2,22H26V8.8l2.6,2.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7l-6-5.9a1.9,1.9,0,0,0-2.8,0l-6,5.9a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L22,8.8V22H8.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-5.9,6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L8.8,26H22V39.2l-2.6-2.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l6,5.9a1.9,1.9,0,0,0,2.8,0l6-5.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L26,39.2V26H39.2l-2.6,2.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l5.9-6A1.9,1.9,0,0,0,45.4,22.6Z"/>
            </g>
        </g>
    </svg>;
};

type AbsolutePositionProps = {
    position: IPosisjon
    canEdit: boolean
    children: ReactNode
    onDragEnd: (position: IPosisjon) => void
    dragPosition: { x: string | number, y: string | number }
}

export const AbsolutePosition = ({
                                     position: initPosition,
                                     children,
                                     canEdit,
                                     onDragEnd,
                                     dragPosition
                                 }: AbsolutePositionProps) => {
    const [position, setPosition] = useState(initPosition);

    const handleDrag: DragEventHandler<HTMLDivElement> = (event) => {
        if (!canEdit) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const diffX = event.clientX - rect.x;
        const diffY = event.clientY - rect.y;
        if (event.clientX !== 0 && event.clientY !== 0) {
            setPosition({x: position.x + getNewPosition(diffX), y: position.y + getNewPosition(diffY)});
        }

    };

    const handleDragStart: DragEventHandler = (e) => {
        const dragImg = new Image(0, 0);
        dragImg.src =
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(dragImg, 0, 0);
    };


    return <div style={{position: "absolute", left: `${position.x}%`, top: `${position.y}%`}}>{canEdit &&
        <div className={styles.drag}
             style={{left: dragPosition.x, top: dragPosition.y}}
             draggable
             onDrag={handleDrag}
             onDragEnd={() => onDragEnd(position)}
             onDragStart={handleDragStart}><DragIcon/>
        </div>}{children}</div>;
};

function getNewPosition(diff: number) {
    if (Math.abs(diff) > 4) {
        return diff > 0 ? 1 : -1;
    }
    return 0;
}
