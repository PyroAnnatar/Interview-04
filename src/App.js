import React, { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: false,
    Engin: false,
    Samet: false,
  });

  const value = { userState, setUserState };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

function App() {
  return (
    <UsersProvider>
      <UserList />
    </UsersProvider>
  );
}

const UserList = () => {
  const { userState, setUserState } = useContext(UsersContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState);
      const rando = users[Math.floor(users.length * Math.random())];
      setUserState((prev) => ({
        ...prev,
        [rando]: !prev[rando],
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="flex flex-col gap-2 m-4">
      {Object.keys(userState).map((user) => (
        <li key={user}>
          {user}: {userState[user] ? "🟢" : "🔴"}
        </li>
      ))}
    </ul>
  );
};

export default App;
