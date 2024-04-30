import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useEffect, useState, SetStateAction } from "react";

export function CreateBattleCategory(props: { updateBattleCategories: (data: { 
    name: string; 
    participantsNo: number; 
    id: number; 
    style: string;
}) => void; id: any; }) {
    const [name, setName] = useState('');
    const [participantsNo, setParticipantsNo] = useState<number>(0);
    const [style, setStyle] = useState('');

    useEffect(() => {
        props.updateBattleCategories({
            id: props.id,
            name: name,
            participantsNo: participantsNo,
            style: style
        })
    });

    const categoryUpdated = (event: { target: { value: SetStateAction<string>; }; }) => {
        setName(event.target.value);
    }

    const participantsNoUpdated = (event: { target: { value: SetStateAction<string | undefined>; }; }) => {
        setParticipantsNo(Number(event.target.value));
    }

    const styleChanged = (event: { target: { value: any; }; }) => {
        setStyle(event.target.value);
    }

    return (
        <table className="mt-5">
            <tbody>     
                <tr>
                    <td><label>Category</label></td>
                    <td><input type="text" value={name} onChange={categoryUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Participants per team</label></td>
                    <td><input type="number" value={participantsNo} onChange={participantsNoUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Style</label></td>
                    <td><input type="text" value={style} onChange={styleChanged}/></td>
                </tr>
            </tbody>
        </table>
    );
}