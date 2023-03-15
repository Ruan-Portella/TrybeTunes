import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingLogin from '../components/LoadingLogin';
import '../style/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      InputName: '',
      isLoading: true,
      OutroEstado: false,
      DisableButton: true,
    };
  }

  handleChange = ({ target }) => {
    const min = 3;
    this.setState({ [target.name]: target.value });
    if (target.value.length >= min) {
      this.setState({ DisableButton: false });
    } else {
      this.setState({ DisableButton: true });
    }
  };

  RedirectSearch = async () => {
    const { InputName } = this.state;
    this.setState({ isLoading: false });
    await createUser({ name: InputName });
    this.setState({ isLoading: true, OutroEstado: true });
  };

  render() {
    const { InputName, DisableButton, isLoading, OutroEstado } = this.state;
    return (
      <div data-testid="page-login">
        {
          !isLoading
            ? <LoadingLogin /> : (
           <section className='Login'>  
            <section className='LoginContentMain'>
              <img src={'https://i.imgur.com/UnkuC4Y.png'} className='imageLogin' alt='logo' />
              <section className='LoginContent'>
                <input
                  type="text"
                  name="InputName"
                  data-testid="login-name-input"
                  value={ InputName }
                  onChange={ this.handleChange }
                  className='TextLogin'
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ DisableButton }
                  onClick={ this.RedirectSearch }
                  className="ButtonLogin"
                >
                  Entrar
                </button>
                </section>
              </section>
              </section> )
        }
        {
          OutroEstado && <Redirect to="/search" />
        }
      </div>
    );
  }
}

export default Login;
