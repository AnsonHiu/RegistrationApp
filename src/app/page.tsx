'use client'

import Link from "next/link";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [list, setList] = useState<string[]>([]);

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setList([...list, text]);
    setText("");
  };

  return (
    <div className="App mt-5 ml-5">
      <Link key="create-event" href="event/create" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        Create Event
      </Link>
      <form onSubmit={handleSubmit} className="flex items-center">
        <label htmlFor="new-contestant-input">New Contestant</label>
        <input id="new-contestant-input" type="text" value={text} onChange={handleChange} />
        <button className="primary" type="submit">Add to list</button>
      </form>
      <ul>
        {list.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
      </ul>
  </div>
  );
}
