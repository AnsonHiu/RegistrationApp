'use client'

import { getEvent } from "@/app/sql/query/get-event";
import { getEventCategories } from "@/app/sql/query/get-event-categories";
import EventCategoryView from "../../components/view-event-category";
import EventCategory from "@/app/model/event-category.model";
import Event from "@/app/model/event.model";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { CreateBattleCategory } from "@/app/components/create-battle-category";
import addCategoriesCommandHandler from "@/app/sql/command/insert-categories";
import AddCategoriesCommand from "@/app/model/commands/add-categories-command.model";

export default function ViewEvent({searchParams}: {searchParams: {id: number}}){
    const [event, setEvent] = useState<Event>();
    const [eventCategories, setEventCategories] = useState<EventCategory[]>();
    const [selectedCategory, setSelectedCategory] = useState<EventCategory>();
    const [newCategory, setNewCategory] = useState<EventCategory>();
    const eventId = Number(searchParams.id);

    useEffect(() => {
        let cancel = false;

        async function fetchEvents() {
            if(cancel) {
                return;
            }
            const eventPromise = getEvent(eventId);
            const eventCategoriesPromise =  getEventCategories(eventId);
            const [event, eventCategories] = await Promise.all([eventPromise, eventCategoriesPromise]);
            setEvent(event);
            setEventCategories(eventCategories);
        }
        fetchEvents().catch(handleError);

        return () => { cancel = true };
    }, [newCategory]);

    const handleError = (error: Error) => {
        // TODO: handle error
        console.log(error);
    }

    const updateNewCategory = (update: {id: number, eventCategory: EventCategory}) => {
      setNewCategory(update.eventCategory);
    }

    const addNewCategory = async () => {
        if(newCategory){
            const command = JSON.parse(JSON.stringify(new AddCategoriesCommand({
            eventCategories: [newCategory],
            eventId: eventId
            })));
            await addCategoriesCommandHandler(command);
            setNewCategory(undefined);
        }
    }

    return (
        <div className="view-event">
            <h1>{event && event.name}</h1>
            <ul>
                {eventCategories?.map((category, index) => (
                    <p key={category.id} 
                        className={clsx({'clickable': true, 'bg-sky-100 text-blue-600': selectedCategory?.id === category.id})} 
                        onClick={() => setSelectedCategory(category)}>
                        {category.name}
                    </p>
                ))}
                <p className='clickable' onClick={() => setNewCategory({id: 0, name: '', participantsperteam: undefined, style: ''})}>+ Category</p>
            </ul>
            {
                newCategory && 
                <div>
                    <CreateBattleCategory eventCategory={newCategory} updateBattleCategory={updateNewCategory}/>
                    <div className="flex">
                        <button className="primary button mt-5 mr-5" onClick={addNewCategory}>Save Category</button>
                        <button className="secondary button mt-5" onClick={() => setNewCategory(undefined)}>Cancel</button>
                    </div>
                </div>
            }
            {selectedCategory && <EventCategoryView key={selectedCategory.id} eventCategory={selectedCategory}/>}
        </div>
    )
}