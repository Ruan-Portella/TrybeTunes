import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingLogin from '../components/LoadingLogin';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/Search.css'

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
      this.setState({ array: true, album: false });
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
        <section data-testid="page-search" className='SearchContent'>
        {
          !isLoading
            ? <LoadingLogin /> : (
            <section className='SearchMain'>
              <label>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="InputName"
                  className='SearchInput'
                  value={ InputName }
                  placeholder='Digite a Sua Pesquisa'
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  className='SearchButton'
                  data-testid="search-artist-button"
                  disabled={ DisableButton }
                  onClick={ this.SearchAlbum }
                >
                  Pesquisar

                </button>
              </label>
              </section>
            )
        }
        </section>
        <section className='SearchedAlbum'>
        {
          album && (
            <section className='AlbumName'>
            <p>{`Resultado de álbuns de: ${InputNameSearched.toUpperCase()}`}</p>
            </section>)
        }
        {
          
          array && (
          <section className='AlbumName'>
            <p>Nenhum álbum foi encontrado</p>
          </section>)
        }
        {
        }
        <section className='AlbumContent'>
        <ul>
          <section className='LiAlgumContent'>
          {albumName.map((albuns) => (
            <section className='LiContent'>
            <li key={ albuns.collectionId }>
              <Link
                data-testid={ `link-to-album-${albuns.collectionId}` }
                to={ `/album/${albuns.collectionId}` }
              >
                <img className='ImageAlbum'src={albuns.artworkUrl100} alt={albuns.collectionName}></img>
              </Link>
              <p className='NameAlbumSearch'>{albuns.collectionName}</p>
              <p className='NameAlbumSearch'>{albuns.artistName}</p>
            </li>
            </section>
          ))}
          </section>
        </ul>
        </section>
        </section>
      </section>
    );
  }
}

export default Search;
