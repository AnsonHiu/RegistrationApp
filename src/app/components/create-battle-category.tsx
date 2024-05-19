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

    const categoryNameUpdated = (event: React.ChangeEvent<HTMLInputElement>) => {
        let category = new EventCategory(props.eventCategory);
        category.name = event.target.value;
        handleCategoryUpdated(category);
    }

    const participantsNoUpdated = (event: React.ChangeEvent<HTMLInputElement>) => {
        let category = new EventCategory(props.eventCategory);
        category.participantsperteam = Number(event.target.value);
        handleCategoryUpdated(category);
    }

    const styleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let category = new EventCategory(props.eventCategory);
        category.style = event.target.value;
        handleCategoryUpdated(category);
    }

    return (
        <div className="mt-5 flex flex-col">
            <input className='mt-2' type="text" value={props.eventCategory.name} onChange={categoryNameUpdated} placeholder="Category Name"/>
            <input className='mt-2' type="number" 
                value={props.eventCategory.participantsperteam}
                onChange={participantsNoUpdated}
                placeholder="Participants per team"
                min='1'/>
            <input className='mt-2' type="text" value={props.eventCategory.style} onChange={styleChanged} placeholder="Style"/>
        </div>
    );
}