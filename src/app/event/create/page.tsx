'use client';

import { SetStateAction, useState } from "react";
import { CreateBattleCategory } from "./battle-category";
import { addEventCommand } from "@/app/sql/command/insert-event";
import EventCategory from "@/app/model/event-category.model";
import { getEventsByName } from "@/app/sql/query/get-events-by-name";
import addCategoriesCommandHandler from "@/app/sql/command/insert-categories";
import AddCategoriesCommand from "@/app/model/commands/add-categories-command.model";

export default function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
    const [categoryIndex, setCategoryIndex] = useState(0);
  
    const showSubmitButton = eventCategories.length > 0;

    const updateEventName = (event: { target: { value: SetStateAction<string>; }; }) => {
      setEventName(event.target.value);
    };
  
    const addEventCategory = () => {
      setEventCategories([...eventCategories, new EventCategory({id: categoryIndex, name: '', participantsperteam: 0, style: ''})]);
      setCategoryIndex(categoryIndex+1);
    }

    const updateEventCategories = (update: {id: number, eventCategory: EventCategory}) => {
      let categoryIndex = eventCategories.findIndex(category => category.id == update.id);
      setEventCategories([...eventCategories.slice(0, categoryIndex), update.eventCategory, ...eventCategories.slice(categoryIndex+1)]);
    }
  
    const createEvent = async (event: {preventDefault: () => void}) => {
      event.preventDefault();
      await addEventCommand(eventName);
      const events = await getEventsByName(eventName);
      const eventId = events[0].id;
      const command = JSON.parse(JSON.stringify(new AddCategoriesCommand({
        eventCategories: eventCategories,
        eventId: eventId
      })));
      await addCategoriesCommandHandler(command);
    };
  
    return (
      <div className="mt-5 ml-5">
          <form onSubmit={createEvent} className="flex flex-col">
              <h1>Create Event</h1>
              <div className="flex flex-row mt-5">
                  <input id="event-name" type="text" onChange={updateEventName} placeholder="Event Name"/>
                  <button type="button" className="secondary" onClick={addEventCategory}>Add Category</button>
              </div>
              <div className="flex flex-col">
                {eventCategories.map((eventCategory, index) => (
                  <CreateBattleCategory key={index} eventCategory={eventCategory} updateBattleCategory={updateEventCategories} />
                ))}
              </div>
              {showSubmitButton && <button type="submit" className="button primary mt-5">Submit</button>}
          </form>
    </div>
    );
}