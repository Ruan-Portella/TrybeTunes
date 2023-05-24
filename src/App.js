import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="TrybeTunes/" component={ Login } />
        <Route exact path="TrybeTunes/search" component={ Search } />
        <Route
          exact
          path="TrybeTunes/album/:id"
          component={ Album }
        />
        <Route exact path="TrybeTunes/favorites" component={ Favorites } />
        <Route exact path="TrybeTunes/profile" component={ Profile } />
        <Route exact path="TrybeTunes/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />

      </Switch>
    );
  }
}

export default App;
