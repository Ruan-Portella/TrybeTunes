import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { trackName } = this.props;
    const favorite = await getFavoriteSongs();
    this.setState({
      checked: favorite.some((song) => song.trackName === trackName),
      isLoading: false,
    });
  }

  FavoriteSong = async ({ target }) => {
    const { checked } = this.state;
    const { trackName, previewURL, TrackID } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ isLoading: true, checked: value });
    if (!checked) {
      await addSong({ TrackID, trackName, previewURL });
    } else {
      await removeSong({ TrackID, trackName, previewURL });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, checked } = this.state;
    const { previewURL, trackName, TrackID } = this.props;
    return (
      <section>
        {
          isLoading ? <Loading /> : (
            <section>
              <h3>{ trackName }</h3>
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
  trackName: PropTypes.string.isRequired,
  TrackID: PropTypes.number.isRequired,
};

export default MusicCard;
