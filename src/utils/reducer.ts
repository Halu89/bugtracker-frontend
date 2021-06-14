import { LOGIN } from "./store/actionTypes";

const initialState = {
  user: undefined,
  projects: [],
  currentProject: undefined,
  issues: [],
};

const reducer =
  () =>
  (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
      case LOGIN:
        return { ...state, user: "New user" };
    }

    return state;
  };

export default reducer;
