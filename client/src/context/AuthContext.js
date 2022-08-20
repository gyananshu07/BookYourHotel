import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isAdmin: false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: payload,
        loading: false,
        error: null,
      };

    case "LOGIN_ADMIN":
      return {
        user: payload,
        loading: false,
        error: null,
        isAdmin: true,
      };

    case "LOGIN_FAILED":
      return {
        user: null,
        loading: false,
        error: payload,
        isAdmin: false,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: payload,
        isAdmin: false,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
