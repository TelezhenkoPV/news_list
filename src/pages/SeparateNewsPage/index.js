import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import getDataFromServe from "../../utils/getDataFromServe";

import { toggleLoaderAction } from "../../store/newsList/newsListAction";
import { loadingSelector } from "../../store/newsList/newsListSelectors";
import Loader from "../../components/Loader";

const SeparateNewsPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const loadingInProgress = useSelector(loadingSelector)

  const [ commentsData, setCommentsData ] = useState(null)

  useEffect(() => {
    dispatch(toggleLoaderAction())

    async function fetchData() {
      const response = await getDataFromServe(`https://api.hnpwa.com/v0/item/${id}.json`);

      const data = response.comments.map( userCommentData => {

        const date = new Date(+userCommentData.time * 1000)

        return (
          <li key={userCommentData.id}>
            <h5>User: {userCommentData.user}</h5>
            <div>
              {parse(userCommentData.content)}
            </div>
            <span>{ date.toDateString() }</span>
          </li>
        )

      })

      setCommentsData(data)
    }

    fetchData();


    dispatch(toggleLoaderAction())
  }, [ dispatch, id ])

  const onClickHandler = () => {
    history.push({
      pathname: `/`
    })
  }

  return (
    <>
      { loadingInProgress && <Loader /> }
      <button onClick={ onClickHandler }>Back on main page</button>
      <ul>
        { commentsData }
      </ul>
    </>
  )
}

export default SeparateNewsPage