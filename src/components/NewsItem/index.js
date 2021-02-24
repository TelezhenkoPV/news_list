import React  from 'react'
import { useHistory } from 'react-router'


const NewsItem = ( { data }) => {

  const { time, title, url, id } = data
  const history = useHistory()

  // parse date from seconds into readable view
  const date = new Date(+time * 1000)

  const onClickHandler = () => {
    history.push({
      pathname: `/news/${id}`
    })
  }

  return (
    <tr key={id}>
      <td className='url'><a target='_blank' rel='noreferrer' href={url}>{url}</a></td>
      <td onClick={onClickHandler}><h4 className='title'>{title}</h4></td>
      <td className='date'><span>{ date.toDateString() }</span></td>
    </tr>
  )

}

export default NewsItem