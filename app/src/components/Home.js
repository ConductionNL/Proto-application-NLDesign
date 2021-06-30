import React, {Component} from 'react';
import {getCookie, setCookie} from "./utility/CookieHandler";
import ReactTooltip from 'react-tooltip';
import CookieConsent from "react-cookie-consent";
import {
  BrowserRouter as Router, Link, Route, Switch,
} from "react-router-dom";
import ConfigContext from "./Context/Config";
import HomePage from "./HomePage";

export default class Home extends Component {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      packages: []
    }
  }

  componentDidMount() {
    let url = this.context.api + '/applications';
    fetch(url, { cache: 'force-cache'})
      .then(response => response.json())
      .then(data => this.setState({applications: data}))
      .catch()

    url = this.context.api + '/info/artifact_list/';
    fetch(url, { cache: 'force-cache'})
      .then(response => response.json())
      .then(data => this.setState({packages: data['packages']}))
      .catch()
  }

  render() {

    return (
        <>
          <Router>
            <ReactTooltip place="top" type="dark" effect="solid"/>
            <nav className="navbar navbar-reverse navbar-expand-lg">
              <div className="container">
                <Link hreflang="en" className="navbar-brand smooth" to={'/'}>Dashkube</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto align-items-lg-center">

                    <li className="nav-item">
                      <a hrefLang="en" href={this.context.url + '/documentation'} className="nav-link">
                        Documentation
                      </a>
                    </li>
                    {
                      getCookie('token') != null
                        ?
                        <>
                          <li className="nav-item">
                            <a hrefLang="en" className={'nav-link'} href={this.context.url + '/dashboard'}>Dashboard</a>
                          </li>
                          <li className="nav-item">
                            <a hrefLang="en" className={'nav-link'} href={this.context.url + '/dashboard/logout'}>Logout</a>
                          </li>
                        </>
                        :
                        <>
                          <li className="nav-item"><a hrefLang="en"
                            href={'https://id-vault.com/oauth/authorize?client_id=593867bc-9dfc-4f53-9ee9-abfb278bc42c&response_type=code&scopes=schema.person.email+schema.person.given_name+schema.person.family_name&state=12345&redirect_uri=' + this.context.api + '/logins'}
                            className="nav-link">Register</a></li>
                          <li className="nav-item"><a hrefLang="en"
                            href={'https://id-vault.com/oauth/authorize?client_id=593867bc-9dfc-4f53-9ee9-abfb278bc42c&response_type=code&scopes=schema.person.email+schema.person.given_name+schema.person.family_name&state=12345&redirect_uri=' + this.context.api + '/logins'}
                            className="nav-link">Login</a></li>
                        </>
                    }
                  </ul>
                </div>
              </div>
            </nav>

            <Switch>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>

            <footer>
              <div className="container">
                <div className="row">
                  <div className="col-md-9">
                    <h3 className="text-capitalize">About Conduction</h3>
                    <div className="pr-lg-5">
                      <p>Conduction is an Amsterdam-based company that specializes in Open Source GovTech solutions for the European Ecosystem. We strongly believe in international standards and modern design principles. <a hrefLang="en"
                          href="https://www.conduction.nl/">Read more</a></p>

                      <p>DashKube tries to bring this theory into practice and helps developers and organizations easily setup and configure a Kubernetes environment for their cloud instances</p>

                      <p>
                        <a hrefLang="en" className="text-white" href={this.context.api + "/documents/terms.pdf"} target="_blank" rel={'noreferrer'}>Terms and conditions</a>
                      </p>

                      <p>&copy; 2021 with <i className="fas fa-heart text-danger"></i> from <a hrefLang="en"
                        href="https://www.conduction.nl/"
                        target="_blank" rel={'noreferrer'}>conduction</a></p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    {/*<h3 className="text-capitalize">newsletter</h3>*/}
                    {/*<div className="pr-lg-5">*/}
                    {/*  <p>click here to subscribe to our newsletter!</p>*/}
                    {/*</div>*/}
                    {/*<form action="{{ path('app_frontend_newsletter') }}">*/}
                    {/*  <div className="form-row">*/}
                    {/*    <div className="col-4">*/}
                    {/*      <button type="submit" className="btn btn-lg btn-demo mr-3">*/}
                    {/*        <span>subscribe</span></button>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</form>*/}
                    <div style={{marginTop: "20px"}}>
                      <h3 className="text-capitalize">Contact:</h3>
                      <p className={'mb-0'}>Conduction B.V</p>
                      <p className={'mb-0'}>info@dashkube.com</p>
                      <p className={'mb-0'}>+31 (0)85 3036840</p>
                      <p className={'mb-0'}>Lauriergracht 14h</p>
                      <p className={'mb-0'}>1016 RL Amsterdam</p>
                      <p className={'mb-0'}>CoC: 76741850</p>
                      <p className={'mb-0'}>Vat: NL860784241B01</p>
                    </div>
                    <div style={{marginTop: '20px'}} className="d-flex justify-content-between">

                      <div className={'text-center'}>
                        <a hrefLang="en" target={"_blank"} href='https://twitter.com/conduction_nl' rel={'noreferrer'}>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-primary" style={{width: '40px', height: '40px', lineHeight: '39px'}}>
                            <i style={{fontSize: "large", marginTop: '10px'}} className="fab fa-twitter text-primary ml-0" />
                          </div>
                        </a>
                      </div>
                      <div className={'text-center'}>
                        <a hrefLang="en" target={"_blank"} href='https://www.facebook.com/conductionnl/' rel={'noreferrer'}>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-primary" style={{width: '40px', height: '40px', lineHeight: '39px'}}>
                            <i style={{fontSize: "large", marginTop: '10px'}} className="fab fa-facebook-f text-primary ml-0" />
                          </div>
                        </a>
                      </div>
                      <div className={'text-center'}>
                        <a hrefLang="en" target={"_blank"} href='https://www.instagram.com/conduction_nl/' rel={'noreferrer'}>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-primary" style={{width: '40px', height: '40px', lineHeight: '39px'}}>
                            <i style={{fontSize: "large", marginTop: '10px'}} className="fab fa-instagram text-primary ml-0" />
                          </div>
                        </a>
                      </div>
                      <div className={'text-center'}>
                        <a hrefLang="en" target={"_blank"} href='https://www.linkedin.com/company/conduction/about/' rel={'noreferrer'}>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-primary" style={{width: '40px', height: '40px', lineHeight: '39px'}}>
                            <i style={{fontSize: "large", marginTop: '10px'}} className="fab fa-linkedin text-primary ml-0" />
                          </div>
                        </a>
                      </div>
                      <div className={'text-center'}>
                        <a hrefLang="en" target={"_blank"} href='https://github.com/ConductionNL' rel={'noreferrer'}>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-primary" style={{width: '40px', height: '40px', lineHeight: '39px'}}>
                            <i style={{fontSize: "large", marginTop: '10px'}} className="fab fa-github text-primary ml-0" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </Router>
          {
            getCookie('cookieConsent') == null &&
              <CookieConsent
                onAccept={() => {
                  setCookie('cookieConsent', 'true', 1000);
                }}
              >
                This website uses cookies to improve your user experience. By accepting and closing the
                cookie information banner when first visiting the page you consent to our use of cookies.
              </CookieConsent>
          }
        </>
    );
  }

}
