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
