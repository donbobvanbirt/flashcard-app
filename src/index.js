import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import AllCards from './components/AllCards'
import Test from './components/Test'

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={AllCards} />

      <Route path='/test' component={Test}/>

    </Route>
  </Router>,
  document.getElementById('root')
);
