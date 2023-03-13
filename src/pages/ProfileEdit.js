import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="page-profile-edit" />
      </section>
    );
  }
}

export default ProfileEdit;
