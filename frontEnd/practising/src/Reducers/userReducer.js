export const INITIAL_STATE = {
  username: "",
  email: "",
  name: "",
  admin: "",
  phoneNumber: "",
  birthday: "",
  userAvatar: "",
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, ...action.payload };

    case "GET_USER":
      return state;

    case "CHANGE_SINGLE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };

    default:
      return state;
  }
};
