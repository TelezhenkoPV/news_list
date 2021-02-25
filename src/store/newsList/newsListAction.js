import { TOGGLE_LOADER, SET_NEWS_DATA, SET_SORTING_TITLE } from "../actionTypes";

export const toggleLoaderAction = () => dispatch => {
  dispatch({ type: TOGGLE_LOADER })
}

export const setNewsDataAction = (commentsData) => dispatch => {
  dispatch( {type: SET_NEWS_DATA, payload: commentsData})
}