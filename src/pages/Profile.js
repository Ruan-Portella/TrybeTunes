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
      Imagem:'https://i.imgur.com/GdqTEm4.png',
      Email: '',
      Description: ''
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await getUser();
    
    this.setState({ Name: response.name, isLoading: false, Email: `${response.name}@gmail.com`,
    Description: `Welcome, ${response.name}!`});

    if (response.image.length > 1) {
      this.setState({ Imagem: response.image})
    }

    if (response.email.length > 1) {
      this.setState({Email: response.email})
    }

    if (response.description.length > 1) {
      this.setState({Description: response.description})
    }
  }

  render() {
    const { isLoading, Name, Imagem, Email, Description } = this.state;
    return (
      <section>
        <section data-testid="page-profile">
        </section>
          <Header />
          {isLoading ? <LoadingLogin /> : (
            <section>
             <section className='ProfilexContent'>
            <section className='ImagemAlbumContent'>
              <section className='ImagemALbumContentContent'>
             <img
               className='ImagemProfile'
                data-testid="profile-image"
                src={ Imagem }
                alt={ Name }
              />
              </section>
             </section>
             </section>
              <section className='teste'>
              <section className='FormProfile'>
              <section className='FormProfileTest'>
              <label className='NameProfileContent'>
                Nome:
              <p>{Name}</p>
              </label>
              <label className='EmailProfileContent'>
                E-mail:
              <p>{Email}</p>
              </label>
              <label className='DescriptionProfileContent'>
                Descrição:  
              <p>{Description}</p>
              </label>
              <Link className='LinkButton' to="/profile/edit">Editar perfil</Link>
            </section>
            </section>
            </section>
            </section>)}
      </section>
    );
  }
}

export default Profile;
