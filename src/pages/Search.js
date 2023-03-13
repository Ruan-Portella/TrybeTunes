import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      InputName: '',
      DisableButton: true,
      isLoading: true,
      album: false,
      InputNameSearched: '',
      albumName: [],
      array: false,
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

  SearchAlbum = async () => {
    const { InputName } = this.state;
    this.setState({ isLoading: false, InputNameSearched: InputName });
    const namemusic = InputName;
    const response = await searchAlbumsAPI(namemusic);
    this.setState({ InputName: '', isLoading: true, album: true, albumName: response });
    if (response.length === 0) {
      this.setState({ array: true });
    } else {
      this.setState({ array: false });
    }
  };

  render() {
    const { InputName, DisableButton, isLoading, album,
      InputNameSearched, albumName, array } = this.state;
    return (
      <section>
        <Header />
        <p data-testid="page-search" />
        {
          !isLoading
            ? <Loading /> : (
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
                  onClick={ this.SearchAlbum }
                >
                  Pesquisar

                </button>
              </label>
            )
        }
        {
          album && (
            <p>{`Resultado de álbuns de: ${InputNameSearched}`}</p>)
        }
        {
          array && (<p>Nenhum álbum foi encontrado</p>)
        }
        {
        }
        <ul>
          {albumName.map((albuns) => (
            <li key={ albuns.collectionId }>
              <Link
                data-testid={ `link-to-album-${albuns.collectionId}` }
                to={ `/album/${albuns.collectionId}` }
              >
                {albuns.collectionName}

              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Search;
