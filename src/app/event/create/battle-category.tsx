import EventCategory from "@/app/model/event-category.model";

export function CreateBattleCategory(
    props: {
        eventCategory: EventCategory,
        updateBattleCategory: (data: {
            id: number;
            eventCategory: EventCategory;
       }) => void 
    }) {

    const handleCategoryUpdated = (category: EventCategory) => {
        props.updateBattleCategory({
            id: props.eventCategory.id,
            eventCategory: category
        });
    }

    const categoryNameUpdated = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(props.eventCategory);
        category.name = event.target.value;
        handleCategoryUpdated(category);
    }

    const participantsNoUpdated = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(props.eventCategory);
        category.participantsperteam = Number(event.target.value);
        handleCategoryUpdated(category);
    }

    const styleChanged = (event: { target: { value: string; }; }) => {
        let category = new EventCategory(props.eventCategory);
        category.style = event.target.value;
        handleCategoryUpdated(category);
    }

    return (
        <table className="mt-5">
            <tbody>     
                <tr>
                    <td><label>Category</label></td>
                    <td><input type="text" value={props.eventCategory.name} onChange={categoryNameUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Participants per team</label></td>
                    <td><input type="number" value={props.eventCategory.participantsperteam} onChange={participantsNoUpdated}/></td>
                </tr>
                <tr>
                    <td><label>Style</label></td>
                    <td><input type="text" value={props.eventCategory.style} onChange={styleChanged}/></td>
                </tr>
            </tbody>
        </table>
    );
}