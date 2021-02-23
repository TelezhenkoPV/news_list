import axios from 'axios'

// here we create same algorithm of processing errors for all requests

const getDataFromServe = ( url ) => {
  return axios(url)
    .then(response => response.data)
    .catch( error => console.log(`Ошибка: ${error}`) )
}

export default getDataFromServe