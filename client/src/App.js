import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './pages/Subscriptions';
import Stats from './pages/Stats';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Modal from './components/Modal';
import './App.css';
const API = require('./utils/API');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      subscriptions: [],
      firstname: '',
      lastname: '',
      email: '',
      income: 0,
      isShowingModal: false,
      modalMessage: '',
      button: '',
      subId: '',
    };
  }

  componentDidMount() {
    API.getUser().then(response => {
      if (response.data.result === 'no user') localStorage.setItem('isAuthenticated', false);
      this.updateUserInfo(response.data);
    });
  }

  updateUserInfo = userObject => {
    let authStatus = false;
    if (localStorage.getItem('isAuthenticated') === 'true') authStatus = true;
    this.setState({
      firstname: userObject.firstname,
      lastname: userObject.lastname,
      subscriptions: userObject.subscriptions,
      email: userObject.email,
      income: userObject.income,
      isAuthenticated: authStatus,
    });
  };

  userLogin = userInfo => {
    API.loginUser(userInfo)
      .then(response => {
        this.updateUserInfo(response.data);
      })
      .catch(err => {
        throw err;
      });
  };

  userLogout = (event, callback) => {
    event.preventDefault();
    if (this.isUserAuth) {
      API.logoutUser()
        .then(response => {
          this.setState({
            firstname: '',
            lastname: '',
            subscriptions: [],
            email: '',
            income: 0,
            isAuthenticated: false,
          });
          localStorage.setItem('isAuthenticated', false);
          localStorage.removeItem('subscriptions');
          localStorage.removeItem('yearlyTotal');
          localStorage.removeItem('monthlyTotal');
          localStorage.removeItem('ratio');
          localStorage.removeItem('chartData');
          localStorage.removeItem('subList');
        })
        .catch(err => {
          throw err;
        });
    }
    return callback();
  };

  isUserAuth = () => {
    return this.state.isAuthenticated;
  };

  handleModalClose = () => {
    this.setState({ isShowingModal: false });
    setTimeout(() => this.setState({ button: '' }), 1000);
  };

  triggerModal = (message, button) => {
    this.setState({
      isShowingModal: true,
      modalMessage: message,
      button,
    });
  };

  triggerDelete = (subName, subId) => {
    this.setState({
      isShowingModal: true,
      modalMessage: 'Please confirm you would like to delete ' + subName,
      subId: subId,
    });
  };

  updateAuthStatus = status => {
    this.setState({ isAuthenticated: status });
    localStorage.setItem('isAuthenticated', status);
  };

  addSub = (event, cb, subInfo) => {
    event.preventDefault();
    if (subInfo.name && subInfo.cost) {
      API.addSubscription(subInfo).then(response => {
        this.updateUserInfo(response.data);
      });
      return cb();
    } else {
      this.triggerModal('Please fill in all fields to submit', 'Close');
    }
  };

  removeSub = subId => {
    this.setState({ isShowingModal: false });
    API.deleteSubscription({ id: subId }).then(response => {
      this.updateUserInfo(response.data);
    });
  };

  render() {
    return (
      <Router>
        <div className='background-div'>
          <img
            className='background-div-image'
            src='/images/underwater-802092_1920.jpg'
            alt='underwater'
          />
        </div>
        <div className='container-fluid p-0'>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <SignIn
                  {...props}
                  triggerAlert={this.triggerModal}
                  isUserAuth={this.isUserAuth}
                  updateAuthStatus={this.updateAuthStatus}
                  updateUserInfo={this.updateUserInfo}
                />
              )}
            />
            <Route
              exact
              path='/sign-up'
              render={props => (
                <SignUp
                  {...props}
                  triggerAlert={this.triggerModal}
                  updateAuthStatus={this.updateAuthStatus}
                  updateUserInfo={this.updateUserInfo}
                  sendAlert={this.triggerModal}
                />
              )}
            />
            <ProtectedRoute exact path='/main'>
              <Navbar handleLogout={this.userLogout} page='main' />
              <Main
                subscriptions={this.state.subscriptions}
                addSub={this.addSub}
                removeSub={this.triggerDelete}
              />
            </ProtectedRoute>
            <ProtectedRoute exact path='/stats'>
              <Navbar handleLogout={this.userLogout} page='stats' />
              {this.state.isAuthenticated ? (
                <Stats subscriptions={this.state.subscriptions} income={this.state.income} />
              ) : null}
            </ProtectedRoute>
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Modal
          handleAlertClose={this.handleModalClose}
          isOpen={this.state.isShowingModal}
          body={this.state.modalMessage}
          buttonText={this.state.button}
          subId={this.state.subId}
          actionIfTrue={this.removeSub}
        />
      </Router>
    );
  }
}

function testAuth() {
  let authStatus = false;
  if (localStorage.getItem('isAuthenticated') === 'true') authStatus = true;
  return authStatus;
}

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        testAuth() ? (
          // this.props.isUserAuth() ? (
          children
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
}

export default App;
