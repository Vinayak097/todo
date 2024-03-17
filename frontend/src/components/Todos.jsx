import React, {  useState } from 'react';

export function Todos() {
    const [title ,setTitle]=useState("");
    const [res,setres]=useState({});
    return (
        
        <div id="todos">
  <input
    className="it"
    type="text"
    placeholder="Enter task title"
    onChange={(e) => {
      setTitle(e.target.value);
      console.log(title)
    }}
  />
  <button
    className="list"
    onClick={async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          
          body: JSON.stringify({
            title: title,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setres(json); // Assuming you have a function to handle the response data
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }}
  >
    Get List
  </button>
</div>
    );
}
