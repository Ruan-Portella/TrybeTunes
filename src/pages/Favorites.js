import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="page-favorites" />
      </section>
    );
  }
}

export default Favorites;
