import React, { useEffect } from 'react'
import axios from 'axios'

import Loader from "../../components/Loader";

import { useSelector, useDispatch } from "react-redux";

import getDataFromServe from "../../utils/getDataFromServe"
import { loadingSelector, newsDataSelector } from "../../store/newsList/newsListSelectors";

import List from "../../components/List"
import { toggleLoaderAction, setNewsDataAction } from "../../store/newsList/newsListAction";


const MainPage = () => {
  const dispatch = useDispatch()

  const newsData = useSelector(newsDataSelector)
  const loading = useSelector(loadingSelector)

  const totalAmountOffPages = 10;

  useEffect(() => {

    if( newsData !== null ) {
      return
    }

    dispatch( toggleLoaderAction() )

    const arrayOfUrls = []

    for(let i = 1; i <= totalAmountOffPages; ++i) {
      arrayOfUrls.push(`https://api.hnpwa.com/v0/news/${i}.json`)
    }

    const arrayOfPromisesWithData = arrayOfUrls.map( url => getDataFromServe(url) );

    axios.all([...arrayOfPromisesWithData])
      .then(axios.spread(function (...data) {

        const allCommentsData = data.reduce((acc, item) => {
          return [...acc, ...item]
        })

        dispatch( setNewsDataAction(allCommentsData) )
        dispatch( toggleLoaderAction() )
      }))
      .catch( error => console.log(`Ошибка: ${error}`) )

  }, [ dispatch, newsData ])

  return(
    <main>
      { loading &&  <Loader /> }
      { newsData && <List listData={newsData} /> }
    </main>
  )
}
export default MainPage