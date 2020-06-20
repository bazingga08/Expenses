// url to retrive necessary data
import { URL } from '../config.js';
// function to retrive the necessary information from the provided URL
export function getData(payload) {
  return function somename(dispatch, getState) {
    // making state to progress to show the Loader
    dispatch({
      type: "GET_DATA_IN_PROGRESS",
      payload: {}
    });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data) {
          // resetting the loader to necessary state after data recieved and assign recived data
          dispatch({
            type: "GET_DATA_IN_SUCCESS",
            payload: {
              data: data,
            }
          });
        } else {
          // setting the necessary state changesin case of fail to retrive data
          dispatch({
            type: "GET_DATA_IN_FAILURE",
            payload: {}
          });
        }
      });
  };
}

export function getStatsDummy(payload) {
}
