import EventCategory from "@/app/model/event-category.model";
import { useEffect, useState } from "react";

export function CreateBattleCategory(props: { id: number; updateBattleCategory: (data: { id: any; eventCategory: EventCategory; }) => void; }) {
    const [eventCategory, setEventCategory] = useState<EventCategory>(new EventCategory({id: props.id, name: '', style: '', participantsperteam: 0}));

    useEffect(() => {
        props.updateBattleCategory({
            id: props.id,
            eventCategory: eventCategory
        })
    }, [eventCategory]);

    const categoryNameUpdated = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(eventCategory);
        category.name = event.target.value;
        setEventCategory(category);
    }

    const participantsNoUpdated = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(eventCategory);
        category.participantsperteam = Number(event.target.value);
        setEventCategory(category);
    }

    const styleChanged = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(eventCategory);
        category.style = event.target.value;
        setEventCategory(category);
    }

    return (
        <table className="mt-5">
            <tbody>     
                <tr>
                    <td><label>Category</label></td>
                    <td><input type="text" value={eventCategory.name} onChange={categoryNameUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Participants per team</label></td>
                    <td><input type="number" value={eventCategory.participantsperteam} onChange={participantsNoUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Style</label></td>
                    <td><input type="text" value={eventCategory.style} onChange={styleChanged}/></td>
                </tr>
            </tbody>
        </table>
    );
}