import { todosRef } from "../config/firebase";
import { FETCH_User,FETCH_User_FULLFILL} from "./types";

export const fetchToDos = () => async dispatch => {
  dispatch({
    type: FETCH_User,   
  });
  todosRef.on("value", snapshot => {
    const data = [];
    snapshot.forEach(childSnapShot => {     
      const locker = {       
        FirstName: childSnapShot.val().account.firstName,
        SurName: childSnapShot.val().account.surname,
        Email:childSnapShot.val().account.email,
        RecidenceCity:childSnapShot.val().account.residenceCity,
        RecidenceCountry:childSnapShot.val().account.residenceCountry,
        LastActive:childSnapShot.val().lastActive,
      };
     data.push(locker);     
    });
    dispatch({
      type: FETCH_User_FULLFILL,
      payload: data
    });
  });
};