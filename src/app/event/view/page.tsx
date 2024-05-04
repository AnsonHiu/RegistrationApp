'use client'

import { getEvent } from "@/app/sql/query/get-event";
import { getEventCategories } from "@/app/sql/query/get-event-categories";
import EventCategoryView from "./view-event-category";
import EventCategory from "@/app/model/event-category.model";
import Event from "@/app/model/event.model";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ViewEvent({searchParams}: {searchParams: {id: number}}){
    const [event, setEvent] = useState<Event>();
    const [eventCategories, setEventCategories] = useState<EventCategory[]>();
    const [selectedCategory, setSelectedCategory] = useState<EventCategory>();
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
    }, []);

    const handleError = (error: Error) => {
        // TODO: handle error
        console.log(error);
    }

    return (
        <div>
            <h1>{event && event.name}</h1>
            <ul>
                {eventCategories?.map((category, index) => (
                    <p key={category.id} 
                        className={clsx({'clickable': true, 'bg-sky-100 text-blue-600': selectedCategory?.id === category.id})} 
                        onClick={() => setSelectedCategory(category)}>
                        {category.name}
                    </p>
                ))}
            </ul>
            {selectedCategory && <EventCategoryView key={selectedCategory.id} eventCategory={selectedCategory}/>}
        </div>
    )
}