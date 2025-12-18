import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [idUsu, setIdUsu] = useState(0); 
  const [ ip, setIp ] = useState("200.18.141.162");

  return (
    <AppContext.Provider value={{ idUsu: idUsu, setIdUsu: setIdUsu, ip: ip, setIp: setIp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
