import { FETCH_User, FETCH_User_FULLFILL } from "../actions/types";

const initialState = {
  isFetching: false,
  errorMessage: '',
  UserData: [{       
    FirstName: '',
    SurName: '',
    Email:'',
    RecidenceCity:'',
    RecidenceCountry:'',
    LastActive:'',
  }]
};


export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_User:
      return { ...state, isFetching: true, errorMessage: '' };
    case FETCH_User_FULLFILL:
      return { ...state, isFetching: false, UserData: action.payload };
    default:
     return state;
  }
};