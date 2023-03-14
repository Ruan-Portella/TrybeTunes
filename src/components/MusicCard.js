import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const { TrackName } = this.props;
    const favorite = await getFavoriteSongs();
    if (favorite.some((song) => song.trackName === TrackName)) {
      this.setState({
        checked: true,
        isLoading: false,
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  FavoriteSong = async ({ target }) => {
    const { TrackName, previewURL, TrackID } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ isLoading: true, checked: value });
    await addSong({ TrackID, TrackName, previewURL });
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, checked } = this.state;
    const { previewURL, TrackName, TrackID } = this.props;
    return (
      <section>
        {
          isLoading ? <Loading /> : (
            <section>
              <h3>{ TrackName }</h3>
              <audio data-testid="audio-component" src={ previewURL } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label data-testid={ `checkbox-music-${TrackID}` }>
                Favorita
                <input
                  type="checkbox"
                  name="checked"
                  checked={ checked }
                  onChange={ this.FavoriteSong }
                />
              </label>
            </section>)
        }
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewURL: PropTypes.string.isRequired,
  TrackName: PropTypes.string.isRequired,
  TrackID: PropTypes.number.isRequired,
};

export default MusicCard;
