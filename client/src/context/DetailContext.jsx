import { createContext, useReducer } from "react";

export const DetailsContext = createContext();

export const detailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return {
        details: action.payload,
      };
    case "CREATE_DETAIL":
      return {
        details: [action.payload, ...state.details],
      };
    case "DELETE_DETAIL":
      return {
        details: state.details.filter(
          (detail) => detail._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const DetailsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(detailsReducer, {
    details: [],
  });

  return (
    <DetailsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
};
