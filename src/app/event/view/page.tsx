import { getEvent } from "@/app/sql/query/get-event";
import { getEventCategories } from "@/app/sql/query/get-event-categories";
import Link from "next/link";
import EventCategoryView from "./view-event-category";

export default async function ViewEvent({searchParams}){
    // const searchParams = useSearchParams();
    const eventId = Number(searchParams.id);
    const eventPromise = getEvent(eventId);
    const eventCategoriesPromise = getEventCategories(eventId);
    const [event, eventCategories] = await Promise.all([eventPromise, eventCategoriesPromise]);
    
    return (
        <div>
            <h1>{event.name}</h1>
            <ul>
                {eventCategories.map((category, index) => (
                    <li key={index}>
                        <Link href="">
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <EventCategoryView />
        </div>
    )
}