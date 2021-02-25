import {SET_NEWS_DATA, TOGGLE_LOADER, SET_SORTING_TITLE } from "../actionTypes";

const initialStore = {
  loading: false,
  newsData: null,
}

const reducer = ( store = initialStore, action ) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return { ...store, loading: !store.loading}
    case SET_NEWS_DATA:
      return { ...store, newsData: [...action.payload] }
    default:
        return store
  }
}

export default reducer