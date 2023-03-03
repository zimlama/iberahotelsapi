import axios from "axios";
import { GET_ROOMS_CITIES } from "../actions-types";
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

import { GET_CLOUDINARY_IMG } from "../action-types";
import axios from "axios";
const { REACT_APP_CLOUDINARY_URL } = process.env;

export async function fileUpload(file) {
  console.log("uploading file");
  if (!file) return alert("No files to upload");

  const formData = new FormData();
  formData.append("upload_preset", "cinema");
  formData.append("file", file);
  try {
    const cloudResponse = await axios.post(REACT_APP_CLOUDINARY_URL, formData);
    console.log("file upload success");
    return cloudResponse.data.secure_url;
  } catch (error) {
    console.error(error);
  }
}

export function startUploadingFiles(payload) {
  return async function (dispatch) {
    try {
      let response = await fileUpload(payload[0]);
      dispatch({
        type: GET_CLOUDINARY_IMG,
        payload: response,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
