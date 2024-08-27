const initialState = {
  count: 0,
  tasbih: "",
  history: [],
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "RESET_COUNT":
      return {
        ...state,
        count: 0,
      };
    case "SELECT_TASBIH":
      return {
        ...state,
        tasbih: action.payload,
      };
    case "HISTORY":
      return {
        ...state,
        history:[
          ...state.history,
          `${action.payload.countValue} times ${action.payload.tasbih} - Time: ${action.payload.time}`,
        ]
      };
    default:
      return state;
  }
};

export default counterReducer;
