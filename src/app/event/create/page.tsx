'use client'

import { SetStateAction, useEffect, useState } from "react";
import { CreateBattleCategory } from "./battle-category";
import { AddEventCommand } from "@/app/sql/command/insert-event/route";

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventCategories, setEventCategories] = useState<string[]>([]);
  let submitButton;
  let submit: boolean;
  if(eventCategories.length > 0){
    submitButton = <button type="submit" className="button primary mt-5">Submit</button>
  } else {
    submitButton = '';
  }

  const addCategory = () => {
    setEventCategories([...eventCategories, '']);
  }

  const updateBattleName = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEventName(event.target.value);
  };

  const addEvent = (event: {preventDefault: () => void}) => {
    event.preventDefault();
    submit = true;
    console.log(eventName);
  };

  useEffect(() => {
    if(eventName && submit){
      fetch('../sql/command/insert-event', {
        method: ''
      })
    }
  }, [eventName]);

  return (
    <div className="mt-5 ml-5">
        <form onSubmit={addEvent} className="flex flex-col">
            <h1>Create Event</h1>
            <div className="flex flex-row mt-5">
                <label htmlFor="event-name">Event Name</label>
                <input id="event-name" type="text" onChange={updateBattleName}/>
                <button type="button" className="secondary" onClick={addCategory}>Add Category</button>
            </div>
            <div className="flex flex-col">
              {eventCategories.map((battheCategory, index) => (
                <CreateBattleCategory />
              ))}
            </div>
            {submitButton}
        </form>
  </div>
  );
}