import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingLogin from '../components/LoadingLogin';
import { getUser } from '../services/userAPI';
import '../style/Profile.css'
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
        <section data-testid="page-profile">
        </section>
          <Header />
          {isLoading ? <LoadingLogin /> : (
            <section>
              <img
               className='ImagemProfile'
                data-testid="profile-image"
                src={ image }
                alt={ name }
              />
              <section className='ProfilexContent'>
              <section className='FormProfile'>
              <label>
                Nome:
              <p>{name}</p>
              </label>
              <label>
                E-mail:
              <p>{email}</p>
              </label>
              <label>
                Descrição:  
              <p>{description}</p>
              </label>
              <Link className='LinkButton' to="/profile/edit">Editar perfil</Link>
            </section>
            </section>
            </section>)}
      </section>
    );
  }
}

export default Profile;
