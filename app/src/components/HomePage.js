import React, {Component} from 'react';
import CountUp from 'react-countup';
import {
  BrowserRouter as Router, Link,
} from "react-router-dom";
import ConfigContext from "./Context/Config";
export default class HomePage extends Component {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      packages: []
    }
  }

  componentDidMount() {
    window.gtag('event', 'page_view', {
      page_title: 'Dashkube homepage',
      page_location: 'Dashkube homepage',
      page_path: '/'
    })

    let url = this.context.api + '/commonground';
    fetch(url, {cache: 'no-cache'})
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => this.setState({applications: data['applications']}))
      .catch(error => {
        console.log(error);
      })

    url = this.context.api + '/info/artifact_list/';
    fetch(url, {cache: 'no-cache'})
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error handling request: ' + response.statusText);
        }
      })
      .then(data => this.setState({packages: data['packages']}))
      .catch(error => {
        console.log(error);
      })
  }

  render() {

    return (
      <Router>
        <div className="hero-wrapper" id="top">
          <div className="hero">
            <div className="container flex-column flex-lg-row">
              <div className="text text-center text-lg-left">
                {/*<a hrefLang="en" href="#" className="headline">*/}
                {/*  <div className="badge badge-danger">new</div>*/}
                {/*  we now support openstack <i className="fas fa-chevron-right"></i>*/}
                {/*</a>*/}
                <h1>One user-friendly Dashboard<br/>to set up all your (open source) ecosystems easily from scratch.
                </h1>
                <p className="lead">
                  This Kubernetes oriented Dashboard helps anyone getting started with Kubernetes. The Kubernetes management tool speeds up your cloud environment and the Dashboard helps to install and customize applications and components with just one click!
                </p>
                <div className="cta">
                  <a hrefLang="en" className="btn btn-lg btn-warning btn-icon icon-right"
                     href={'https://id-vault.com/oauth/authorize?client_id=593867bc-9dfc-4f53-9ee9-abfb278bc42c&response_type=code&scopes=schema.person.email+schema.person.given_name+schema.person.family_name&state=12345&redirect_uri=' + this.context.api + '/logins'}>Try
                    it, its free!</a> &nbsp;
                </div>
              </div>
              <div className="imgbox">
                <img alt="" src="./images/screens/dashboard.jpg" className="imgpreview"/>
                {/*<img src="./images/screens/providers.jpg" className="imgpreview" />*/}
                {/*<img src="./images/screens/catalogue.jpg" className="imgpreview" />*/}
                {/*<img src="./images/screens/cluster.jpg" className="imgpreview" />*/}
              </div>
            </div>
          </div>
        </div>

        <div className="callout container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div
                    className="text-job text-muted text-14" style={{marginBottom: "20px"}} >
                    Getting started with Kubernetes should not be difficult. Check out whats’s currently available!
                  </div>
                </div>

              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-6 col-12 mb-4 mb-lg-0">
                  <div className="h1 mb-0 font-weight-bold"><span
                    className="font-weight-500">Software currently available:</span>
                  </div>
                </div>
                {/*<div className="col-12 col-sm-4 col-md-2 mb-4 mb-md-0 text-center">*/}
                {/*  <div className="h2 font-weight-bold">26</div>*/}
                {/*  <div*/}
                {/*    className="text-uppercase font-weight-bold ls-2 text-primary">Suppliers</div>*/}
                {/*</div>*/}
                <>
                  {
                    this.state.applications.length === 0 &&
                    <div className="col-12 col-sm-4 col-md-2 col-xl-3 mb-4 mb-md-0 text-center">
                      <a href={'/commonground'} style={{textDecoration: "none"}}>
                        <div className="h2 font-weight-bold" style={{color: "black"}}><CountUp end={this.state.applications.length} /></div>
                        <div
                          className="text-uppercase font-weight-bold ls-2 text-primary">Applications</div>
                      </a>
                    </div>
                  }
                  {
                    this.state.applications.length > 0 &&
                    <div className="col-12 col-sm-4 col-md-2 col-xl-3 mb-4 mb-md-0 text-center">
                      <a href={'/commonground'} style={{textDecoration: "none"}}>
                        <div className="h2 font-weight-bold" style={{color: "black"}}><CountUp end={this.state.applications.length} /></div>
                        <div
                          className="text-uppercase font-weight-bold ls-2 text-primary">Applications</div>
                      </a>
                    </div>
                  }
                  {
                    this.state.packages.length === 0 &&
                    <div className="col-12 col-sm-4 col-md-2 col-xl-3 text-center">
                      <a href={'/artifacthub'} style={{textDecoration: "none"}}>
                        <div className="h2 font-weight-bold" style={{color: "black"}}><CountUp end={this.state.packages} /></div>
                        <div
                          className="text-uppercase font-weight-bold ls-2 text-primary">Packages</div>
                      </a>
                    </div>
                  }
                  {
                    this.state.packages.length !== 0 &&
                    <div className="col-12 col-sm-4 col-md-2 col-xl-3 text-center">
                      <a href={'/artifacthub'} style={{textDecoration: "none"}}>
                        <div className="h2 font-weight-bold" style={{color: "black"}}><CountUp end={this.state.packages} /></div>
                        <div
                          className="text-uppercase font-weight-bold ls-2 text-primary">Packages</div>
                      </a>
                    </div>
                  }
                </>
              </div>
            </div>
          </div>
        </div>

        <section id="demo">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="subtitle">
                  Run your Cloud ecosystem without any coding knowledge
                </div>
                <h2 className="title">
                  Awesome <span className="text-primary">Features</span> &amp;
                  Amazing <span className="text-primary">Stability</span>
                </h2>
                <p className="lead">
                  Don’t go by our word, check out our awesome demos and verify yourself.<br/>
                  Save 1000s of hours of designing and coding work as we already did that for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-skew">
          <div className="container">
            <div className="row mb-5 text-center">
              <div className="col-lg-10 offset-lg-1">
                <h2>Give yourself the <span className="text-primary">choice</span> where to host your cloud ecosystem
                </h2>
                <p className="lead">This Kubernetes management tool will not restrict you to choose where to host your cloud system. The choice between privacy and price is yours.
                  You can make use of the premium Dutch/ European partner Fuga or the international platforms of Digital Ocean, Google, or Amazon.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="features">
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-mobile-alt"></i>
                    </div>
                    <h5>Set up your cloud environment(s)</h5>
                    <p>Use our easy wizard to set up one or more haven environments.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    <h5>Compliancy</h5>
                    <p>All environments comply with European governmental standards (such as gaia-x) and privacy
                      standards (such as GDPR).</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fab fa-html5"></i>
                    </div>
                    <h5>100+ Components</h5>
                    <p>Choose from among a wide range of free open source components available through the Common Ground
                      app store.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-fire"></i>
                    </div>
                    <h5>One button installation</h5>
                    <p>Install any checklist compliant installation with the push of a button.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-check"></i>
                    </div>
                    <h5>Run multiple environments</h5>
                    <p>Does your organization manage environments for other organizations? Manage them all from one
                      dashboard.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                    <h5>No need to tender</h5>
                    <p>The pricing modal allows you to keep your hosting well below European tender requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="container mt--8 pb-5">

            <div className="d-flex flex-column justify-content-lg-center align-items-center px-3 mt-5">
              <div className="text-center">
                <h4>Read all the awesome features</h4>
              </div>
              <div className={'text-center'}>
                <a href="#home" data-toggle="collapse" data-target={"#featureTable"}>
                  <div className="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white"
                       style={{width: '40px', height: '40px', lineHeight: '39px'}}>
                    <i className="fas fa-chevron-down text-white ml-0"/>
                  </div>
                </a>
              </div>
            </div>
            <p className="card-category collapse" id={"featureTable"}>
              <div className="row row-grid justify-content-center">
                <div className="col-lg-10">
                  <div className="table-responsive">
                    <table className="table mt-5">
                      <thead>
                      <tr>
                        <th className="px-0 bg-transparent" scope="col" style={{width: '80px'}}>
                          <span className="font-weight-700">Features</span>
                        </th>
                        <th className="text-center bg-transparent" scope="col" style={{width: '80px'}}>Free</th>
                        <th className="text-center bg-transparent" scope="col" style={{width: '80px'}}>Premium</th>
                        <th className="text-center bg-transparent" scope="col" style={{width: '80px'}}>Enterprise</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td className="px-0" style={{width: '40%'}}>
                          <p>
                            Manage your cloud cluster
                            <a href="#home" data-toggle="collapse" data-target={"#manage"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"manage"}>Creating, Updating and removing
                            cloud clusters</p>
                        </td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center" rowSpan={'7'}>
                          <span className="text-sm">Starting at 5 clusters</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            One button installation
                            <a href="#home" data-toggle="collapse" data-target={"#oneButton"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"oneButton"}>Install any package on
                            artifact hub straight from our ui, including popular packages such as wordpress and
                            drupal</p>
                        </td>
                        <td className="text-center"><span
                          className="text-sm">Limited to 30 installations per cluster</span></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">Application bundles</td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">Advanced Metrics</td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Kubernetes integration
                            <a href="#home" data-toggle="collapse" data-target={"#kubernetesIntegration"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"kubernetesIntegration"}>Don't have an
                            advanced kubernetes provider? Don't worry! Simply connect your cluster based n a
                            kubeconfig</p>
                        </td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Google cloud, Amazon AWS, Azure AKS an Openstack integration
                            <a href="#home" data-toggle="collapse" data-target={"#providersIntegration"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"providersIntegration"}>Manage any detail
                            of your providers simply and intuitively from your dashboard, combine providers without a
                            worry or migrate from on to the other</p>
                        </td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Asynchronous task queuing
                            <a href="#home" data-toggle="collapse" data-target={"#taskQueue"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"taskQueue"}>All actions are taken
                            through our asynchronous task pool, meaning that you can start either 1 or a 1000 clusters
                            without worry</p>
                        </td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Full helm control
                            <a href="#home" data-toggle="collapse" data-target={"#helmControl"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"helmControl"}>Manage your Helm settings,
                            values and secrets directly form the dashboard</p>
                        </td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Single Sign On to applications
                            <a href="#home" data-toggle="collapse" data-target={"#singleSign"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"singleSign"}>Use OpenId Connect to
                            achieve single sign on to applications on your cluster</p>
                        </td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Resource overview
                            <a href="#home" data-toggle="collapse" data-target={"#resourceOverview"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"resourceOverview"}>Managing helm
                            deployments, pods, services, secrets, namespaces directly from your dashboard</p>
                        </td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            User Access and Management
                            <a href="#home" data-toggle="collapse" data-target={"#userAccess"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"userAccess"}>Determine and manage who
                            can do what on your cloud</p>
                        </td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Continuous integration and deployment
                            <a href="#home" data-toggle="collapse" data-target={"#contIntergration"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"contIntergration"}>Automatically keep
                            your cluster op to date with the newest releases or development</p>
                        </td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Full node and pod access
                            <a href="#home" data-toggle="collapse" data-target={"#podAccess"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"podAccess"}>Look into the logs or give
                            direct CLI style commands from the interface</p>
                        </td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Security Checks
                            <a href="#home" data-toggle="collapse" data-target={"#securityCheck"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"securityCheck"}>We will check if any of
                            your packages contains security alerts and notify you immediately</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            3rd party Access and Support
                            <a href="#home" data-toggle="collapse" data-target={"#3rdParty"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"3rdParty"}>Allow your supplier access to
                            specific parts of your ecosystem to deliver on service agreements</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Available for this tier" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-check text-success"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            All features available as API
                            <a href="#home" data-toggle="collapse" data-target={"#apiFeature"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"apiFeature"}>Access any feature of
                            Dashkube through our OAS 3 rest API</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Powerful Alerts
                            <a href="#home" data-toggle="collapse" data-target={"#powerfulAlerts"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"powerfulAlerts"}>Receive text messages
                            when something is wrong with your cluster</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Monthly Usage reports
                            <a href="#home" data-toggle="collapse" data-target={"#monthlyAlert"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"monthlyAlert"}>Receive a monthly report
                            on your clusters usage and problems</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Pre DPM certification
                            <a href="#home" data-toggle="collapse" data-target={"#certification"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"certification"}>Receive a monthly
                            pre-audit report on how well your cloud cluster is doing on security settings</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            TPM scans
                            <a href="#home" data-toggle="collapse" data-target={"#scans"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"scans"}>Receive a monthly pre-audit
                            report on how well your cloud cluster is doing on security settings</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            Haven compliance certification
                            <a href="#home" data-toggle="collapse" data-target={"#haven"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"haven"}>Receive a weakly certificate of
                            compliance to the governmental haven standard</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      <tr>
                        <td className="px-0">
                          <p>
                            NLX integration
                            <a href="#home" data-toggle="collapse" data-target={"#integration"}><span
                              className="fa fa-angle-down ml-2 text-black"/></a>
                          </p>
                          <p className="card-category collapse text-muted" id={"integration"}>Manage your NLX gateways
                            directly from the dashboard</p>
                        </td>
                        <td className="text-center"><p style={{fontSize: '1.5rem'}}
                                                       data-tip="Not available for this tier"> - </p></td>
                        <td className="text-center"><i data-tip="Planned functionality" style={{fontSize: '1.5rem'}}
                                                       className="fas fa-hard-hat text-warning"/></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </p>
          </div>
        </section>

        <section id="components" className="section-design section-design-right" style={{display: 'none'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 pr-lg-5 pr-0">
                <div className="badge badge-primary mb-3">Clean Components</div>
                <h2>Focus on your <span
                  className="text-primary">goal</span>, let <span
                  className="text-primary">Atlantis</span>
                  help you to <span
                    className="text-primary">design </span>the dashboard</h2>
                <p
                  className="lead">Designing the dashboard from scratch without being based on a concept makes your time
                  run out just to think of what components you need. Atlantis has many components and layouts that you
                  need to save your development time, go to bed early.</p>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="abs-images">
                  <img src="./images/screens/providers.jpg" alt="user flow"
                       className="img-fluid rounded dark-shadow"/>
                  <img src="./images/screens/dashboard.jpg" alt="user flow"
                       className="img-fluid rounded dark-shadow"/>
                  <img src="./images/screens/cluster.jp" alt="user flow"
                       className="img-fluid rounded dark-shadow"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="try" className="section-circle-background">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h2>Want to try it first?</h2>
                <p
                  className="lead">Our premium dutch partner Fuga offers a 14 day free trial for your environment.</p>
                <div className="mt-4">
                  <a hrefLang="en"
                    href={'https://id-vault.com/oauth/authorize?client_id=593867bc-9dfc-4f53-9ee9-abfb278bc42c&response_type=code&scopes=schema.person.email+schema.person.given_name+schema.person.family_name&state=12345&redirect_uri=' + this.context.api + '/logins'}
                    className="btn btn-lg btn-demo mr-3">Start your trial</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="support-us" className="support-us">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 d-none d-lg-block pr-lg-5 pr-sm-0">
                <div className="d-flex align-items-center h-100 justify-content-center abs-images-2">
                  <img src="./images/screens/dashboard.jpg" alt=""
                       className="img-fluid rounded dark-shadow"/>
                  <img src="./images/screens/cluster.jpg" alt=""
                       className="img-fluid rounded dark-shadow"/>
                  <img src="./images/screens/providers.jpg" alt=""
                       className="img-fluid rounded dark-shadow"/>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <h2><span
                  className="text-primary">Use immediately</span>,<br/> don't develop.
                </h2>
                <p
                  className="lead">Dashkube allows you to focus on quickly bringing your ecosystem up and running
                  without the need to learn kubernetes.</p>
                <ul className="list-icons">
                  <li>
              <span className="card-icon bg-primary text-white">
                <i className="fas fa-box-open"></i>
              </span>
                    <span>Deploy applications in minutes.</span>
                  </li>
                  <li>
              <span className="card-icon bg-primary text-white">
                <i className="fas fa-fire"></i>
              </span>
                    <span>Get real time insight through the cockpit.</span>
                  </li>
                  <li>
              <span className="card-icon bg-primary text-white">
                <i className="fas fa-stopwatch"></i>
              </span>
                    <span>Auto scale your environment up and down in emergencies.</span>
                  </li>
                  <li>
              <span className="card-icon bg-primary text-white">
                <i className="fas fa-heart"></i>
              </span>
                    <span>Automatically deploy security fixes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="before-footer">
          <div className="container">
            <div className="card long-shadow">
              <div className="card-body p-45">
                <div className="row align-items-center mb-2">
                  <div className="col-md-1 d-flex">
                    <div className="card-icon bg-primary text-white mb-2">
                      <i className="fas fa-heart"></i>
                    </div>
                  </div>
                  <div className="col-md-11 d-flex">
                    <h2>Start your open source GovTech journey</h2>
                  </div>
                  <div className="col-md-9 d-flex">
                    <div>
                      <p className="lead">Dashkube is a generic cloud solution, but we have a special place in our heart
                        and some pretty nifty tooling specifically for public code projects.</p>
                    </div>
                  </div>
                  <div className="col-md-3 text-right">
                    <a hrefLang="en" href="/commonground" className="btn btn-primary btn-lg btn-block mb-2">Commonground</a>
                    {/*<Link to="/gaia-x" className="btn btn-primary btn-lg btn-block">Gaia-x</Link>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Router>

    );
  }

}
