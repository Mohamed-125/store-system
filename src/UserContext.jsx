import { useState, useEffect, createContext } from "react";
export const userContext = createContext({});
const UserContext = ({ children }) => {
  const [user, setUser] = useState({});


  useEffect(() => {
    console.log(user);
    
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContext;