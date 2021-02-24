import React, { useEffect } from 'react'
import axios from 'axios'

import Loader from "../../components/Loader";

import { useSelector, useDispatch } from "react-redux";

import getDataFromServe from "../../utils/getDataFromServe"
import { loadingSelector, newsDataSelector } from "../../store/newsList/newsListSelectors";

import List from "../../components/List"
import { toggleLoaderAction, setNewsDataAction } from "../../store/newsList/newsListAction";


const MainPage = ( { url, totalAmountOffPages } ) => {
  const dispatch = useDispatch()

  const newsData = useSelector(newsDataSelector)
  const loading = useSelector(loadingSelector)

  useEffect(() => {

    // if we already get news list data - return
    if( newsData !== null ) {
      return
    }

    dispatch( toggleLoaderAction() )

    const arrayOfUrls = []

    // fill in array with urls with aim to view pagination and organize full sorting
    for(let i = 1; i <= +totalAmountOffPages; ++i) {
      arrayOfUrls.push(`${url}${i}.json`)
    }

    // sending requests on all urls, waiting responses and set upping data
    const arrayOfPromisesWithData = arrayOfUrls.map( url => getDataFromServe(url) );

    axios.all([...arrayOfPromisesWithData])
      .then(axios.spread(function (...data) {

        const allNewsData = data.reduce((acc, item) => {
          return [...acc, ...item]
        })

        dispatch( setNewsDataAction(allNewsData) )
        dispatch( toggleLoaderAction() )
      }))
      .catch( error => console.log(`Ошибка: ${error}`) )

  }, [ dispatch, newsData, url, totalAmountOffPages ])

  return(
    <main>
      { loading &&  <Loader /> }
      { newsData && <List listData={newsData} /> }
    </main>
  )
}
export default MainPage