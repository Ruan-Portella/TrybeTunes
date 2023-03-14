import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
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
