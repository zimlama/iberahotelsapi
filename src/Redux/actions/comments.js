import axios from "axios";
import { CREATE_COMMENTS, GET_COMMENTS } from "../actions-types";

export default function createComments() {
  return async function (dispatch) {
    try {
      const newComment = await axios.post("", payload);
    } catch (err) {}
  };
}
