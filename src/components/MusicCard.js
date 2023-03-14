import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      dataList: [],
    };
  }

  async componentDidMount() {
    const data = await getFavoriteSongs();
    data.forEach(({ trackId }) => {
      this.setState((prevState) => ({
        dataList: [...prevState.dataList, trackId],
      }));
    });
  }

  FavoriteSong = async ({ music, trackId }) => {
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState((prevState) => ({
      dataList: [...prevState.dataList, trackId],
      isLoading: false,
    }));
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, dataList } = this.state;
    const { Musics, album } = this.props;
    return (
      <section>
        <h2 data-testid="artist-name">{ album.artistName }</h2>
        <p data-testid="album-name">{ album.collectionName }</p>
        { isLoading && <Loading />}
        { !isLoading && Musics.map(({ previewUrl, trackName, trackId }, index) => (
          <section key={ trackName }>
            <h3>{ trackName }</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                name="favorites-songs"
                checked={ dataList?.some((item) => item === trackId) }
                onChange={ () => this.FavoriteSong(Musics[index], trackId) }
              />
            </label>

          </section>))}
      </section>
    );
  }
}

MusicCard.propTypes = {
  Musics: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
};

export default MusicCard;
