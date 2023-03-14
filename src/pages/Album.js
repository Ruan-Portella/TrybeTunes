import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      Musics: [],
      album: [],
    };
  }

  componentDidMount() {
    this.AlbumData();
  }

  AlbumData = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const response2 = response.slice(1);
    this.setState({
      Musics: response2,
      album: response[0],

    });
  };

  render() {
    const { Musics, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard
          Musics={ Musics }
          album={ album }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
