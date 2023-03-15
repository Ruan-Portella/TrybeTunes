import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../style/MusicCard.css'

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isfavorite: false,
    };
  }

  async componentDidMount() {
    const { trackName } = this.props;
    const favorite = await getFavoriteSongs();
    this.setState({
      isfavorite: favorite.some((song) => song.trackName === trackName),
      isLoading: false,
    });
  }

  FavoriteSong = async ({ target }) => {
    const { checked } = target;
    const { trackName, previewUrl, trackId, Remove } = this.props;
    this.setState({ isLoading: true, [target.name]: checked });
    if (checked) {
      await addSong({ trackId, trackName, previewUrl });
    } else {
      Remove();
      await removeSong({ trackId, trackName, previewUrl });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, isfavorite } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    return (
      <section>
        {
          isLoading ? <Loading /> : (
            <section className='MusicCardContent'>
              <h3>{ trackName }</h3>
              <audio className='MusicCardAudio'data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label data-testid={ `checkbox-music-${trackId}` }>
                <input
                  type="checkbox"
                  name="isfavorite"
                  checked={ isfavorite }
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
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  Remove: PropTypes.func.isRequired,
};

export default MusicCard;
