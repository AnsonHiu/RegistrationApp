'use client'

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
      <form onSubmit={handleSubmit} className="flex items-center">
        <label htmlFor="new-contestant-input" className="mr-2 block text-sm font-medium leading-6 text-gray-900">New Contestant</label>
        <input id="new-contestant-input" type="text" value={text} onChange={handleChange} className="mr-2 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add to list</button>
      </form>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
  </div>
  );
}
