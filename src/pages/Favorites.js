import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

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
        const loadedFavoriteSongs = await getFavoriteSongs();
        this.setState({
          musicFavorite: [...loadedFavoriteSongs],
        });
      },
    );
  };

  render() {
    const { isLoading, musicFavorite } = this.state;

    const mu = (
      musicFavorite.map((music) => (
        <li key={ music.trackName }>
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
        <div data-testid="page-favorites">
          {
            isLoading ? <Loading /> : (
              <ul>{mu}</ul>)
          }
        </div>
      </section>
    );
  }
}

export default Favorites;
