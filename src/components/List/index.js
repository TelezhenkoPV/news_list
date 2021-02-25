import './index.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../Loader'

import getDataFromServe from '../../utils/getDataFromServe'

import { toggleLoaderAction } from '../../store/newsList/newsListAction'
import { loadingSelector } from '../../store/newsList/newsListSelectors'

const sortBy = require('lodash/sortBy')


const List = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const [page, setPage] = useState( 1 )
  const loadingInProgress = useSelector( loadingSelector )

  const [ newsData, setNewsData ] = useState( [] )
  const [ sortingValue, setSortingValue ] = useState( 'title' )
  const [ reversed, setReversed ] = useState( false )

  useEffect(() => {
    getMoreData()
  }, [page])

  const getMoreData = async () => {
    dispatch ( toggleLoaderAction() )

    const newData = await getDataFromServe(`https://api.hnpwa.com/v0/news/${page}.json`)
    setNewsData((oldData) => [...oldData, ...newData])

    dispatch ( toggleLoaderAction() )
  }

  const LoadMorePosts = () => setPage(1 + page)

  // sorting of columns all types
  const onSort = (key) => {

    if( key === sortingValue ) {
      if ( reversed ) {
        setNewsData( sortBy(newsData, c => c[key]) )
        setReversed( false )
      } else {
        setNewsData( sortBy(newsData, c => c[key]).reverse() )
        setReversed( true )
      }
      return
    }

    setSortingValue(key)
    setNewsData(sortBy(newsData, c => c[key]))
  }

  const openComments = (id) => history.push({
      pathname: `/news/${id}`
    })

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
              { newsData.map( newsItem => {
                // parse date from seconds into readable view
                const date = new Date(+newsItem.time * 1000)

                return (
                  <tr key={newsItem.id.toString()}>
                    <td className='title pointer' data-id={newsItem.id} onClick={() => openComments(newsItem.id) }>{newsItem.title}</td>
                    <td className='desktop-content'>
                      <a className='url' target="_blank" rel="noreferrer" href={newsItem.url}>{newsItem.url}</a>
                    </td>
                    <td className='desktop-content time'>{ date.toDateString() }</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
    </>
  )
}

export default List