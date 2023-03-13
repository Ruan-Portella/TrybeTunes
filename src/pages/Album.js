import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="page-album" />
      </section>
    );
  }
}

export default Album;
