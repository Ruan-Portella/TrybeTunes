import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/Header.css'

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
    <section>
      <header data-testid="header-component" className='HeaderContentMain'>
        <section className='HeaderContentLinks'>
        <img src={'https://i.imgur.com/UnkuC4Y.png'} className='imageHeader' alt='logo' />
        <nav className='NavHeader'>
          <Link to="/search" data-testid="link-to-search" className='LinkHeader'>Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites" className='LinkHeader'>Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile" className='LinkHeader'>Profile</Link>
        </nav>
        <div data-testid="header-user-name" className='NameHeaderContent'>
          {
            isLoading ? <Loading /> : <h1>{`Olá, ${names.toUpperCase()}`}</h1>
          }
        </div>
        </section>
      </header>
      </section>
    );
  }
}

export default Header;
