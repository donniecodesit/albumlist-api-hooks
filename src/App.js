import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    const defaultTitle = document.title;
    document.title = "Awesome Album App";
    setUsers([]);
    const abortSwitch = new AbortController();
    async function loadUsers() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {signal: abortSwitch.signal});
        const usersFetched = await response.json();
        setUsers(usersFetched);
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      }
    }

    loadUsers()
    return () => {
      document.title = defaultTitle;
      abortSwitch.abort();
    }
  }, [])

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} />
      </div>
    </div>
  );
}

export default App;
