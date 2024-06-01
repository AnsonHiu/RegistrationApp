import { getEvents } from "../sql/query/get-events";
import { Event } from '../model/event.model';
import Link from "next/link";

export default async function ViewEvents(){
    const events: Event[] = await getEvents();

    return (
        <ul>
            {events.map((event, index) => (
                <li key={index}>
                    <Link href={{
                        pathname: '/event/view',
                        query: {
                            id: event.id
                        }
                    }}>{event.name}</Link>
                </li>
            ))}
        </ul>
    );
}