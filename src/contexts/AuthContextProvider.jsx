import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// set up the context provider
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // default token value is taken from the local storage
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  // set token in the local storage
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      // set token in the local storage
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      // remove token from the local storage
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default AuthContextProvider;

export const useStateContext = () => useContext(StateContext);
