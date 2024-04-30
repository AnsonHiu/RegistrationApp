'use client';

import { SetStateAction, useState } from "react";
import { CreateBattleCategory } from "./battle-category";
import { addEventCommand } from "@/app/sql/command/insert-event/insert-event";
import { EventCategory } from "@/app/model/event-category.model";

export default function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
    const [categoryIndex, setCategoryIndex] = useState(0);
    let submitButton;
    if(eventCategories.length > 0){
      submitButton = <button type="submit" className="button primary mt-5">Submit</button>
    } else {
      submitButton = '';
    }
  
    const addCategory = () => {
      setEventCategories([...eventCategories, new EventCategory({Id: categoryIndex, Name: '', ParticipantsPerTeam: 0, Style: ''})]);
      console.log(categoryIndex);
      setCategoryIndex(categoryIndex+1);
    }
  
    const updateBattleName = (event: { target: { value: SetStateAction<string>; }; }) => {
      setEventName(event.target.value);
    };
  
    const createEvent = async (event: {preventDefault: () => void}) => {
      event.preventDefault();
      await addEventCommand(eventName);
    };

    const updateBattleCategories = (battleCategory: any) => {
      console.log(battleCategory);
      let categoryIndex = eventCategories.findIndex(category => category.Id == battleCategory.Id);
      const category = new EventCategory({
        Id: battleCategory.Id, 
        Name: battleCategory.Name, 
        ParticipantsPerTeam: battleCategory.participantsNo,
        Style: battleCategory.style
      });
      if(!category.equals(eventCategories[categoryIndex])){
        const newCategories = [...eventCategories.slice(0, categoryIndex), category, ...eventCategories.slice(categoryIndex+1)];
        console.log(newCategories);
        setEventCategories([...eventCategories.slice(0, categoryIndex), category, ...eventCategories.slice(categoryIndex+1)]);
      }
    }
  
    return (
      <div className="mt-5 ml-5">
          <form onSubmit={createEvent} className="flex flex-col">
              <h1>Create Event</h1>
              <div className="flex flex-row mt-5">
                  <label htmlFor="event-name">Event Name</label>
                  <input id="event-name" type="text" onChange={updateBattleName}/>
                  <button type="button" className="secondary" onClick={addCategory}>Add Category</button>
              </div>
              <div className="flex flex-col">
                {eventCategories.map((eventCategory) => (
                  <CreateBattleCategory key={eventCategory.Id} id={eventCategory.Id} updateBattleCategories={updateBattleCategories} />
                ))}
              </div>
              {submitButton}
          </form>
    </div>
    );
}