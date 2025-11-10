import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [logado, setLogado] = useState(false);  

  return (
    <AppContext.Provider value={{ logado, setLogado }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
