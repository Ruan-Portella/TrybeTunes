import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="page-search" />
      </section>
    );
  }
}

export default Search;
