import axios from "axios";
import { GET_ALL_AMENITIES } from "../actions-types";

const { REACT_APP_GET_ALL_AMENITIES } = process.env;

export function getAmenities() {
  return async function (dispatch) {
    try {
      const amenities = await axios.get(REACT_APP_GET_ALL_AMENITIES);
      console.log("aca esta amenities.data", amenities.data);
      return dispatch({ type: GET_ALL_AMENITIES, payload: amenities.data });
    } catch (error) {
      console.error(error);
    }
  };
}
