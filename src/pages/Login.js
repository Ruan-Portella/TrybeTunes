import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <section>
        {
          !isLoading
            ? <Loading /> : (
              <section>
                <input
                  type="text"
                  name="InputName"
                  data-testid="login-name-input"
                  value={ InputName }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ DisableButton }
                  onClick={ this.RedirectSearch }
                >
                  Entrar
                </button>
              </section>)
        }
        {
          OutroEstado && <Redirect to="/search" />
        }
      </section>
    );
  }
}

export default Login;
