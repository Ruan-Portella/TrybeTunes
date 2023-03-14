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
    const { name, email, description, image } = information;
    return (
      <section>
        <div data-testid="page-profile">
          <Header />
          {isLoading ? <Loading /> : (
            <section>
              <h3>{name}</h3>
              <p>{email}</p>
              <span>{description}</span>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ name }
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </section>)}
        </div>
      </section>
    );
  }
}

export default Profile;
