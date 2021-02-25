import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import InfiniteScroll from 'react-infinite-scroll-component'






export default function ProductsScroll() {

  const dispatch = useDispatch()

  const [page, setPage] = useState(0)
  const [cards, setCards] = useState([])
  const [filteredProductsQuantity, setFilteredProductsQuantity] = useState(0)

  useEffect(() => {
    setPage(1)
    setCards([])
    page !== 0 && getMoreData()
    // eslint-disable-next-line
  }, [params])

  useEffect(() => {
    page !== 0 && getMoreData()
    // eslint-disable-next-line
  }, [page])

  const getMoreData = () => {
    const urlData = getUrlParams(params)

    for (const key in urlData) {
      urlData[key] = urlData[key].split(',')
    }

    urlData.startPage = page
    urlData.perPage = 3

    dispatch(setFilterActualFiltersParamsAction(urlData))

    const queryString = objToQueryString(urlData, '/api/products/filter?')

    setTimeout(() => {
      axios(queryString)
        .then((response) => {
          setCards((oldCards) => [...oldCards, ...response.data.products])
          setFilteredProductsQuantity(response.data.productsQuantity)
        })
        .catch((e) => {
          dispatch(
            notificate({
              variant: 'error',
              data: e,
            })
          )
        })
    }, 200)
  }

  const LoadMorePosts = () => {
    setPage(1 + page)
  }

  return (
    <InfiniteScroll
      className={classes.root}
      style={{ overflow: 'unset' }}
      dataLength={cards.length}
      next={LoadMorePosts}
      hasMore={filteredProductsQuantity > cards.length}
      loader={<CircularProgress />}
      endMessage={
        <p className={classes.noItems_text}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {cards.map((item) => (
        <ProductCard
          key={item._id}
          element={item}
          onClickAddProduct={onClickAddProduct}
        />
      ))}
    </InfiniteScroll>
  )
}