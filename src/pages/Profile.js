import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      information: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await getUser();
    this.setState({ information: response, isLoading: false });
  }

  render() {
    const { isLoading, information } = this.state;
    return (
      <section>
        <div data-testid="page-profile">
          <Header />
          {isLoading && <Loading />}
          <h3>{information.name}</h3>
          <p>{information.email}</p>
          <span>{information.description}</span>
          <img
            data-testid="profile-image"
            src={ information.image }
            alt={ information.name }
          />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </section>
    );
  }
}

export default Profile;
