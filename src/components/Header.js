import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      names: '',
      isLoading: true,
    };
  }

  getUserPromisse = async () => {
    const response = await getUser();
    const data = await response;
    const { name } = data;
    this.setState({ isLoading: false, names: name });
  };

  render() {
    this.getUserPromisse();
    const { names, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        <div data-testid="header-user-name">
          {
            isLoading ? <Loading /> : names
          }
        </div>
      </header>
    );
  }
}

export default Header;
