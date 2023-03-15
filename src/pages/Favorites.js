import React from 'react';
import Header from '../components/Header';
import LoadingLogin from '../components/LoadingLogin';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../style/Favorites.css'

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      musicFavorite: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.FavoritesSongs();
    this.setState({ isLoading: false });
  }

  FavoritesSongs = async () => {
    this.setState(
      async () => {
        this.setState({ isLoading: true })
        const loadedFavoriteSongs = await getFavoriteSongs();
        this.setState({
          musicFavorite: [...loadedFavoriteSongs,],
          isLoading: false
        });
      },
    );
  };

  render() {
    const { isLoading, musicFavorite } = this.state;

    const mu = (
      musicFavorite.map((music) => ( 
        <li key={ music.trackName } className='LiContentMain'>
          <MusicCard
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            Remove={ () => this.FavoritesSongs() }
          />
        </li>)));
    return (
      <section>
        <Header />
        <section data-testid="page-favorites">
          {
            isLoading ? <LoadingLogin /> : (
              <section>
                <section className='FavoriteContent'>
              <h2>Músicas Favoritas</h2>
                </section>
              <section className='FavoriteMain'>
              <ul><section className='FavoritesLiContent'>{mu}</section></ul>
              </section>
              </section>)
          }
        </section>
      </section>
    );
  }
}

export default Favorites;
