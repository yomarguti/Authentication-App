import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/me/:token?" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
