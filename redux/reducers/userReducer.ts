const initialState = {
    _id: null, 
    name: "",
    phone: "",
    email: "",
    designation: "", 
    mosqueName: "",
    mosqueArea: "",
    password: "",
    role: "", 
    users: [], 
    upi: {
      id: "",
      qr: "",
    },
    profilePic: "",
    messages: [], 
  };


  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_SPATIAL_USER":
        return {
          ...state,
          ...action.payload,
        };
      case "ADD_MESSAGE":
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      case "UPDATE_UPI":
        return {
          ...state,
          upi: {
            ...state.upi,
            ...action.payload,
          },
        };
      case "ADD_USER":
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case "RESET_SPATIAL_USER":
        return initialState;
      default:
        return state;
    }
  };
  
  export default userReducer