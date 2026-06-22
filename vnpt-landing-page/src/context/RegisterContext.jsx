import {
  createContext,
  useContext,
  useState
} from "react";

const RegisterContext =
  createContext();

export function RegisterProvider({
  children
}) {

  const [
    showRegister,
    setShowRegister
  ] = useState(false);

  return (

    <RegisterContext.Provider
      value={{
        showRegister,
        setShowRegister
      }}
    >

      {children}

    </RegisterContext.Provider>

  );

}

export function useRegister() {

  return useContext(
    RegisterContext
  );

}