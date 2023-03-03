import axios from "axios";
import { GET_ALL_SERVICES } from "../actions-types";

const { REACT_APP_GET_ALL_SERVICES } = process.env;

export function getServices() {
  return async function (dispatch) {
    try {
      const services = await axios.get(REACT_APP_GET_ALL_SERVICES);

      return dispatch({ type: GET_ALL_SERVICES, payload: services.data });
    } catch (err) {
      console.error(err);
    }
  };
}
