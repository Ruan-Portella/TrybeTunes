import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../style/Album.css'

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      Musics: [],
      Name: '',
      Collection: '',
      Image: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const response2 = response.slice(1, response.length);
    this.setState({ Musics: response2,
      Name: response[0].artistName,
      Collection: response[0].collectionName,
      Image: response[0].artworkUrl100,
    });
  }

  Remove = () => {

  };

  render() {
    const { Musics, Name, Collection, Image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className='AlbumArtistContent'>
        <section className='AlbumArtist'>
        <img src={Image} alt={Name}></img>
        <section className='AlbumNameContent'>
        <span className='NameAlbum' data-testid="artist-name">{Name}</span>
        <span className='CollectionAlbum' data-testid="album-name">{Collection}</span>
        </section>
        </section>
        <section className='Album'>
        {Musics.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            Remove={ () => this.Remove() }
          />))}
          </section>
          </section>
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
