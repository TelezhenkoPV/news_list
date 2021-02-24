import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import SeparateNewsPage from "../pages/SeparateNewsPage";

const MainRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainPage url='https://api.hnpwa.com/v0/news/' totalAmountOffPages='10' />} />
        <Route exact path="/news/:id" render={() => <SeparateNewsPage />} />
        <Route exact path="*" render={() => <NotFound />}/>
      </Switch>
    </>
  )
}

export default MainRoutes