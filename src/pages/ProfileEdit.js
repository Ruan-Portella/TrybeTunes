import React from 'react';
import PropTypes from 'prop-types';
// import PropyTypes from 'prop-types';
import Header from '../components/Header';
import LoadingLogin from '../components/LoadingLogin';
import { getUser, updateUser } from '../services/userAPI';
import '../style/ProfileEdit.css'

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: '',
      Email: '',
      Description: '',
      Imagem: 'https://i.imgur.com/GdqTEm4.png',
      isLoading: false,
      ButtonDisable: true,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await getUser();

    this.setState({
      Name: response.name,
      Email:  `${response.name}@gmail.com`,
      Description: `Welcome, ${response.name}!`,
      isLoading: false,
      ButtonDisable: false });

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

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.FormValidate(this.state));
  };

  FormValidate = (response) => {
    const { Description, Email, Imagem, Name } = response;

    const Min = 3;

    const DescriptionTest = Description.length > Min;
    const EmailTest = Email.length > Min;
    const ImagemTest = Imagem.length > Min;
    const NameTest = Name.length > Min;

    const validations = DescriptionTest && EmailTest && ImagemTest && NameTest;

    this.setState({ ButtonDisable: !validations });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { Description, Email, Imagem, Name } = this.state;
    const { history } = this.props;
    const response = { description: Description,
      email: Email,
      image: Imagem,
      name: Name };
    await updateUser(response);
    history.push('/profile');
  };

  render() {
    const {
      Description,
      Email,
      Imagem,
      Name,
      isLoading,
      ButtonDisable,
    } = this.state;
    return (
      <section>
        <Header />
        {isLoading ? <LoadingLogin /> : (
          <div data-testid="page-profile-edit">
            <form>
             <section className='ProfileEditContent'>
            <section className='ImagemAlbumContentEdit'>
              <section className='ImagemALbumContentContentEdit'>
            <img
               className='ImagemProfileEdit'
                data-testid="profile-image"
                src={ Imagem }
                alt={ Name }
              />
              </section>
              </section>
              </section>
              <section className='FormProfileContentContent'>
              <section className='FormProfileContent'>
              <section className='FormProfileEditContent'>
                <section className='NameForm'>
              <label className='NameLabel'>
                <p>Nome:</p>
                <input
                  className='InputName'
                  name="Name"
                  id="profile-edit-input-name"
                  type="text"
                  value={ Name }
                  onChange={ this.handleChange }
                  data-testid="edit-input-name"
                />
              </label>
              </section>
                <section className='EmailForm'>
              <label className='EmailLabel'>
                <p>Email:</p>
                <input
                className='InputEmail'
                  name="Email"
                  id="profile-edit-input-email"
                  type="text"
                  value={ Email }
                  onChange={ this.handleChange }
                  data-testid="edit-input-email"
                />
              </label>
              </section>
                <section className='DescriptionForm'>
              <label className='DescriptionLabel'>
                <p>Descrição:</p>
                <textarea
                  maxLength='60'
                  className='InputDescription'
                  name="Description"
                  id="profile-edit-input-description"
                  type="text"
                  value={ Description }
                  onChange={ this.handleChange }
                  data-testid="edit-input-description"
                />
              </label>
              </section>
            <section className='FotoButton'>
              <section className='ImagemForm'>
              <label className='FotoLabel'>
                 <p>Foto:</p>
                <input
                  className='InputImagem'
                  name="Imagem"
                  id="profile-edit-input-image"
                  type="text"
                  value={ Imagem }
                  onChange={ this.handleChange }
                  data-testid="edit-input-image"
                />
              </label>
              </section>
              <section className='ButtonForm'>
              <button
                className='InputButton'
                disabled={ ButtonDisable }
                data-testid="edit-button-save"
                type="submit"
                onClick={ this.handleSubmit }
              >
                Salvar

              </button>
              </section>
              </section>
              </section>
              </section>
              </section>
            </form>
          </div>)}
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
