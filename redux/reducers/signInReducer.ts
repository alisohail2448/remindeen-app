const initialState = {
    phone: "",
  };
  
  const signInReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_SIGNIN_PHONE":
        return {
          ...state,
          phone: action.payload,
        };
      case "REMOVE_SIGNIN_PHONE":
        return {
          ...state,
          phone: "",
        };
      default:
        return state;
    }
  };
  
  export default signInReducer;
  