import React, { useEffect } from 'react'
import $ from 'jquery'
import 'datatables.net'
import './index.css'

import NewsItem from "../NewsItem";

const List = ( { listData } ) => {

  useEffect( () => {
      $('#table_id').DataTable();
  }, [listData])

  return (
    <table id="table_id" className="display">
      <thead>
      <tr>
        <th>Domain</th>
        <th>Title</th>
        <th className='time'>Time</th>
      </tr>
      </thead>
      <tbody>
        {listData.map( comment => <NewsItem key={comment.id} data={comment}/>)}
      </tbody>
    </table>
  )

}

export default List