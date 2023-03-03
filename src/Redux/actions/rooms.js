import axios from "axios";
import { GET_ROOMS_CITIES } from "../actions-types";

// REACT_APP_GET_ALL_ROOMS_CITIES=https://iberahotelsapi-production.up.railway.app/search/ ?city=buen
//citycheckinout = [  , checkin, ckecout]
//citycheckinout = [ city , checkin, ckecout]
const { REACT_APP_GET_ALL_ROOMS_CITIES } = process.env;

export function getRoomsCities(payload) {
  return async function (dispatch) {
    console.log('esto es payload: ', payload);
    try {
      if(!payload){
        console.log('esto es gallina',);
        let getAllCities = await axios.get(`${REACT_APP_GET_ALL_ROOMS_CITIES}`);
        return dispatch({
          type: GET_ROOMS_CITIES,
          payload: getAllCities.data,
        })
      } else {
        console.log('esto es huevo',);
        let getAllHotelsCity = await axios.get(`${REACT_APP_GET_ALL_ROOMS_CITIES}?city=${payload}`);
        return dispatch({
          type: GET_ROOMS_CITIES,
          payload: getAllHotelsCity.data,
        })
      } 
    } catch (error) {
      console.error(error);
    }
  };
}
