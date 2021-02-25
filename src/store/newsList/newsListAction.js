import { TOGGLE_LOADER, SET_NEWS_DATA,SET_SORTING_VALUE, SET_PAGE } from "../actionTypes";

export const toggleLoaderAction = () => dispatch => {
  dispatch({ type: TOGGLE_LOADER })
}

export const setNewsDataAction = (newsData) => dispatch => {
  dispatch( {type: SET_NEWS_DATA, payload: newsData})
}

export const setSortingValueAction = (value) => dispatch => {
  dispatch( {type: SET_SORTING_VALUE, payload: value} )
}
export const setPageAction = (page) => dispatch => {
  dispatch( {type: SET_PAGE, payload: page} )
}