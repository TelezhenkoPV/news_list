import React, { useEffect, useState } from 'react'
import NewsItem from "../NewsItem";
import './index.css'

const sortBy = require('lodash/sortBy');


const List = ( { listData } ) => {

  const [ newsData, setNewsData ] = useState( listData )
  const [ sortingValue, setSortingValue ] = useState( 'title' )
  const [ reversed, setReversed ] = useState( false )

  const onSort = (key) => {
    console.log('key', key)
    console.log('sortingValue', sortingValue)

    if( key === sortingValue ) {
      console.log('try')
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

  return (
    <div className="container is-fluid">
      <h1 className="title mt-5">News List</h1>
      <table className="table is-bordered is-hoverable is-fullwidth has-text-centered">
        <thead>
          <tr>
            <th onClick={() => onSort('title')}>
              Title
              <i className="fas fa-sort"></i>
            </th>
            <th onClick={() => onSort('url')}>
              Url
              <i className="fas fa-sort"></i>
            </th>
            <th onClick={() => onSort('time')}>
              Time
              <i className="fas fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          { newsData.map(function(newsItem) {
            return (
              <tr key={newsItem.id.toString()}>
                <td className='title' >{newsItem.title}</td>
                <td><a className='url' target="_blank" rel="noreferrer" href={newsItem.url}>{newsItem.url}</a></td>
                <td>{newsItem.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  )
}

export default List