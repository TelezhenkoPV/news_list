import './index.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import {
  toggleLoaderAction, setSortingValueAction, setNewsDataAction, setPageAction
} from '../../store/newsList/newsListAction'

import {
  loadingSelector, sortingValueSelector, newsDataSelector, pageSelector
} from '../../store/newsList/newsListSelectors'

import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../Loader'
import NewsItem from '../NewsItem'

import getDataFromServe from '../../utils/getDataFromServe'

const sortBy = require('lodash/sortBy')


const List = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const loadingInProgress = useSelector( loadingSelector )
  const sortingValue = useSelector( sortingValueSelector )
  const newsData = useSelector( newsDataSelector )
  const page = useSelector( pageSelector )

  const [ reversed, setReversed ] = useState( false )

  // initial data getting
  useEffect(() => {
    getMoreData()
  }, [page])

  // async getting data while scrolling page
  const getMoreData = async () => {
    dispatch ( toggleLoaderAction() )

    const newData = await getDataFromServe(`https://api.hnpwa.com/v0/news/${page}.json`)
    dispatch( setNewsDataAction([ ...newsData, ...newData ]) )
    dispatch ( toggleLoaderAction() )
  }

  // increment of value "page". Need it to send next request
  const LoadMorePosts = () => dispatch( setPageAction( 1 + page ) )

  // sorting of columns all types
  const onSort = (key) => {

    if( key === sortingValue ) {
      if ( reversed ) {
        dispatch( setNewsDataAction( sortBy(newsData, c => c[key]) ))
        setReversed( false )
      } else {
        dispatch( setNewsDataAction( sortBy(newsData, c => c[key]).reverse() ))
        setReversed( true )
      }
      return
    }

    dispatch( setSortingValueAction(key) )
    dispatch( setNewsDataAction( sortBy(newsData, c => c[key]) ))
  }

  // on "title click" we will change route and show comments of separete news item
  const openComments = (id) => {

    // we will send request on next page if user will come back after serfing comments of separete news item
    dispatch( setPageAction( 1 + page ) )
    history.push({
      pathname: `/news/${id}`
    })

  }

  return (
    <>
      { loadingInProgress && <Loader /> }

        <InfiniteScroll
        dataLength={newsData.length}
        next={LoadMorePosts}
        hasMore={true}
        >
          <div className="container is-fluid">
          <h1 className="title">News List</h1>
            <button className="btn btn-info mobile-content__btn" onClick={() => onSort('time')} >Sort by Data</button>
            <table className="table is-bordered is-hoverable is-fullwidth has-text-centered">
              <thead>
              <tr>
                <th className='pointer title-head' onClick={() => onSort('title')}>
                  Title
                  <i className="fas fa-sort"></i>
                </th>
                <th className='pointer desktop-content' onClick={() => onSort('url')}>
                  Url
                  <i className="fas fa-sort"></i>
                </th>
                <th className='pointer desktop-content' onClick={() => onSort('time')}>
                  Time
                  <i className="fas fa-sort"></i>
                </th>
              </tr>
              </thead>
              <tbody>
                {
                  newsData.map( newsItemData => {
                    return <NewsItem key={newsItemData.id} data={newsItemData} openComments={openComments}/>
                  })
                }
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
    </>
  )
}

export default List