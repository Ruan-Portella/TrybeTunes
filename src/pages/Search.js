import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      InputName: '',
      DisableButton: true,
    };
  }

  handleChange = ({ target }) => {
    const min = 2;
    this.setState({ [target.name]: target.value });
    if (target.value.length >= min) {
      this.setState({ DisableButton: false });
    } else {
      this.setState({ DisableButton: true });
    }
  };

  render() {
    const { InputName, DisableButton } = this.state;
    return (
      <section>
        <Header />
        <p data-testid="page-search" />
        <label>
          <input
            data-testid="search-artist-input"
            type="text"
            name="InputName"
            value={ InputName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ DisableButton }
          >
            Pesquisar

          </button>
        </label>
      </section>
    );
  }
}

export default Search;
