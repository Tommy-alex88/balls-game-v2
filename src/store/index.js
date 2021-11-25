import { createStore } from "redux";

const initialState = {
  score: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SCORE":
      return { ...state, score: state.score + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
