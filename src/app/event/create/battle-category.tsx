import { EventCategory } from "@/app/model/event-category.model";
import { useEffect, useState } from "react";

export function CreateBattleCategory(props: { id: number; updateBattleCategories: (data: { id: any; eventCategory: EventCategory; }) => void; }) {
    const [eventCategory, setEventCategory] = useState<EventCategory>(new EventCategory({Id: props.id, Name: '', Style: '', ParticipantsPerTeam: 0}));

    useEffect(() => {
        props.updateBattleCategories({
            id: props.id,
            eventCategory: eventCategory
        })
    }, [eventCategory]);

    const categoryNameUpdated = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(eventCategory);
        category.Name = event.target.value;
        setEventCategory(category);
    }

    const participantsNoUpdated = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(eventCategory);
        category.ParticipantsPerTeam = Number(event.target.value);
        setEventCategory(category);
    }

    const styleChanged = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(eventCategory);
        category.Style = event.target.value;
        setEventCategory(category);
    }

    return (
        <table className="mt-5">
            <tbody>     
                <tr>
                    <td><label>Category</label></td>
                    <td><input type="text" value={eventCategory.Name} onChange={categoryNameUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Participants per team</label></td>
                    <td><input type="number" value={eventCategory.ParticipantsPerTeam} onChange={participantsNoUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Style</label></td>
                    <td><input type="text" value={eventCategory.Style} onChange={styleChanged}/></td>
                </tr>
            </tbody>
        </table>
    );
}