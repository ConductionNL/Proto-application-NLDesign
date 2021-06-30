import React, {Component} from 'react';
import './App.css';
import Home from "./components/Home";
import {HomeCss} from "./components/utility/HomeStyling";
import ConfigContext from "./components/Context/Config";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {setCookie, eraseCookie, getCookie} from './components/utility/CookieHandler';

export default class App extends Component {

  constructor(props) {
    super();

    let code = null;
    let token = null;
    let organization = null;
    let api = null;
    let url = null;

    if (getCookie('code') !== null) {
      code = getCookie('code');
    }

    if (getCookie('token') !== null) {
      token = getCookie('token');
    }

    if (getCookie('organization') !== null) {
      organization = getCookie('organization');
    }

    if (window.location.href.includes('http://localhost')) {
      url = 'http://localhost:3000';
      api = 'http://localhost:83';
    }
    else
    {
      url = 'https://www.dashkube.com';
      api = 'https://api.dashkube.com/v1';
    }

    this.state = {
      url: url,
      api: api,
      code: code,
      token: token,
      organization: organization,
      organizations: null,
      organizationObject: null,
      eav: null,

      // We need some functions to change values on our state
      setUrl: (url) => {
        this.setState({url: url})
      },
      setApi: (api) => {
        this.setState({api: api})
      },
      setCode: (code) => {
        this.setState({code: code})
      },
      setToken: (token) => {
        this.setState({token: token})
      },
      setOrganization: (organization) => {
        this.setState({organization: organization})
      },
      setOrganizations: (organizations) => {
        this.setState({organizations: organizations})
      }
    }
  }
  componentDidMount() {
    if (getCookie('token') !== null) {
      let token = getCookie('token');

      this.setState({token: token});

      let url = this.state.api + '/organizations?code='+ token;

      fetch(url, { cache: 'no-cache'})
        .then(response => response.json())
        .then(this.handleOrganizations)
        .catch()

    }
  }

  render() {
    return (
      <ConfigContext.Provider value={ this.state }>
        <Router>
          <Switch>
            <Route path="/">
              <HomeCss />
              <Home />
              {/*<Maintenance />*/}
            </Route>
          </Switch>
        </Router>
      </ConfigContext.Provider>
    );
  }

}

function Logout(props) {
  eraseCookie('organization');
  eraseCookie('token');
  eraseCookie('username');

  window.gtag('event', 'logout');

  window.location = props.props.props.url;
}

function Login(props) {
  let urlParams = new URLSearchParams(window.location.search);

  if(urlParams.has('token')){

    if(urlParams.has('newUser')){
      setCookie('newUser', true, 1);
    }

    let code = urlParams.get('token');
    setCookie('token', code, 1);

    let url = props.props.props.api + '/organizations?code='+ getCookie('token');

    fetch(url, { cache: 'no-cache'})
      .then(response => response.json())
      .catch()

    return (
      <>
        <div className={"text-center"} style={{width: '100%'}}>
          <div id="loader" className="loader loader-lg mx-auto mt-5"></div>
        </div>
      </>
    );
  } else {
    window.location.href = 'https://id-vault.com/oauth/authorize?client_id=593867bc-9dfc-4f53-9ee9-abfb278bc42c&response_type=code&scopes=schema.person.email+schema.person.given_name+schema.person.family_name&state=12345&redirect_uri='+this.state.api+'/logins';
    return (
      <>
        <div className={"text-center"} style={{width: '100%'}}>
          <div id="loader" className="loader loader-lg mx-auto mt-5"></div>
        </div>
      </>
    );
  }
}


