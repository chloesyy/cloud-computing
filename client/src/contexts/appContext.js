import React, { useReducer, useContext, useState } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER,
} from "./actions";

const user = localStorage.getItem("user");

const initialState = {
  showAlert: false,
  isLoading: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [message, setMessage] = useState("");

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user }) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const setupUser = async ({ currentUser, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    console.log("CURRENT USER!!!!: " + currentUser);
    axios.post("http://localhost:5000/register", currentUser).then((res) => {
      if (res.status === 200) {
        // setMessage("successful registration");
        console.log("successful registration");
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: { user, alertText },
        });
        addUserToLocalStorage({ user });
      } else {
        console.log(res.message);
        dispatch({
          type: SETUP_USER_ERROR,
          payload: { msg: res.message },
        });
      }
    });

    clearAlert();
    // const { data } = await axios.post(`http://localhost:5000/register`, currentUser);
    // const { user } = data;
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    console.log("CURRENT USER!!!!: " + currentUser);
    axios
      .patch("http://localhost:5000/update/userID", currentUser)
      .then((res) => {
        if (res.status === 200) {
          // setMessage("successful registration");
          console.log("successful registration");
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { user },
          });
          addUserToLocalStorage({ user });
        } else {
          console.log(res.message);
          dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: res.message },
          });
        }
      });

    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
