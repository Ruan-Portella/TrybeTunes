import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewURL, TrackName } = this.props;
    return (
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
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewURL: PropTypes.string.isRequired,
  TrackName: PropTypes.string.isRequired,
};

export default MusicCard;
