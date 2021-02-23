import { combineReducers } from 'redux'
import newsList from './newsList/newsListReducer'

const rootReducer = combineReducers({
  newsList
})

export default rootReducer