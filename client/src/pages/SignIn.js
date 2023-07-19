import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import SignInLogo from '../components/SignInLogo';

const API = require('../utils/API');

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.username) {
      this.props.triggerAlert('Please enter your user name', 'Close');
    } else if (!this.state.password) {
      this.props.triggerAlert('Please enter your password', 'Close');
    } else {
      this.login(this.state);
    }
  }

  login(user) {
    API.loginUser(user)
      .then(response => {
        if (response.status === 200) {
          this.props.updateAuthStatus(true);
          this.props.updateUserInfo(response.data);
          this.props.history.push('/main');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.triggerAlert('Your user name or password is incorrect', 'try again');
        throw err;
      });
  }

  guestRoute() {
    const guest = { username: 'guest', password: 'guest' };
    this.login(guest);
  }

  render() {
    return (
      <div className='row'>
        <div className='splash'>
          <div className='Submarine-big'>Submarine</div>
          <SignInLogo />
        </div>
        <div className='col-lg-5' id='sign-in-form'>
          <div className='form-container'>
            <form>
              <div className='dive-in'>
                <h2>Dive In!</h2>
              </div>
              <div className='form-group'>
                <label htmlFor='formGroupExampleInput'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleChange}
                  name='username'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  name='password'
                />
              </div>
              <button className='buttons' onClick={this.handleSubmit}>
                Log In
              </button>
              <Link className='sign-up-link' to={'/sign-up'}>
                Not a member? Sign up!
              </Link>
              <div className='guest-link'>
                <Link onClick={() => this.guestRoute()} to={'/main'}>
                  Try out as a guest!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
