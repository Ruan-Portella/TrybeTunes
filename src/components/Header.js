import React from 'react';
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
        <p data-testid="header-user-name">
          {
            isLoading ? <Loading /> : names
          }
        </p>
      </header>
    );
  }
}

export default Header;
