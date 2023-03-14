import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  FavoriteSong = async () => {
    const { previewURL, TrackName, TrackID } = this.props;
    this.setState({ isLoading: true, checked: true });
    await addSong({ TrackName, previewURL, TrackID });
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
                  checked={ checked }
                  onClick={ this.FavoriteSong }
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
