import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="page-profile" />
      </section>
    );
  }
}

export default Profile;
