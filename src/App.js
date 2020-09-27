import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/me" component={Profile} />
        <Route exact path="/edit-profile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
