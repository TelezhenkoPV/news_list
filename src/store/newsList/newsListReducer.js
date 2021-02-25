import {SET_NEWS_DATA, TOGGLE_LOADER, SET_SORTING_VALUE, SET_PAGE } from "../actionTypes";

const initialStore = {
  loading: false,
  newsData: [],
  sortingValue: 'title',
  page: 1,
}

const reducer = ( store = initialStore, action ) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return { ...store, loading: !store.loading}
    case SET_NEWS_DATA:
      return { ...store, newsData: [...action.payload] }
    case SET_SORTING_VALUE:
      return { ...store, sortingValue: action.payload }
    case SET_PAGE:
      return { ...store, page: action.payload }
    default:
        return store
  }
}

export default reducer