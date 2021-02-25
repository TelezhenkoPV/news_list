import React from 'react'

const NewsItem = ( { data, openComments } ) => {

  const { id, time, title, url  } = data

  // converd seconds into date
  const date = new Date(+time * 1000)

  return (
      <tr>
        <td className='title pointer' onClick={() => openComments(id) }>{title}</td>
        <td className='desktop-content'>
          <a className='url' target="_blank" rel="noreferrer" href={url}>{url}</a>
        </td>
        <td className='desktop-content time'>{ date.toDateString() }</td>
      </tr>
  )
}

export default NewsItem