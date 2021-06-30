import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getCookie, setCookie} from "./utility/CookieHandler";

// Import the context
import ConfigContext from "./Context/Config";

export default class Menu extends Component {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.state = {
      code: this.props.object.props.token,
      organization: this.props.object.props.organization,
      eav: null,
      user: null,
      organizations: null
    }

  }

  handleEav = (data) => {
    if (this.state.organizationObject != null) {
      data['id'] = this.state.organizationObject['id'];
      data['@id'] = this.state.organizationObject['@id'];
      this.setState({eav: data});
    }
  }

  handleWrc = (data) => {
    this.setState({organizationObject: data});
    let urlEAV = this.context.api + '/e_a_v_object_communications?code=' + this.state.code + '&componentCode=wrc&entityName=organizations&self=' + data['@id'];
    fetch(urlEAV)
      .then(response => response.json())
      .then(this.handleEav)
      .catch(function (error) {
        // toast.error('Could not get the EAV values of this organization, something went wrong!', {
        //   position: "bottom-right"
        // });
        console.log(error);
      })
  }

  componentDidMount() {
    if (this.state.organization != null) {
      let url = this.context.api + '/organizations/' + this.state.organization + '?code=' + this.state.code + '&organization=' + this.state.organization;
      fetch(url, { cache: 'force-cache'})
        .then(response => response.json())
        .then(data => this.handleWrc(data))
        .catch()
    }

    let url = this.context.api + '/jwts/user?code=' + this.state.code;
    fetch(url, { cache: 'force-cache'})
      .then(response => response.json())
      .then(data => this.setState({user: data}))
      .catch()

    url = this.context.api + '/organizations?code=' + this.state.code;
    fetch(url, { cache: 'force-cache'})
      .then(response => response.json())
      .then(data => this.setState({organizations: data}))
      .catch()
  }


  switchOrganization = (organization) => {
      setCookie('organization', organization, 1);
      this.props.object.switchOrganization(organization, getCookie('token'));
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-header-left navbar-expand-lg p-0">
          <ul className="navbar-nav page-navigation pl-md-3">
            <h3 className="title-menu d-flex d-lg-none">
              Menu
              <div className="close-menu"><i className="flaticon-cross"></i></div>
            </h3>
            {
              this.state.code != null &&
                <>
                  <li className="nav-item">
                    <Link hreflang="en" className={'nav-link'} to={'/dashboard'}>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link hreflang="en" className={'nav-link'}
                          to={{
                              pathname: '/dashboard/providers/add',
                              state: {
                                code: getCookie('token'),
                                organization: getCookie('organization')
                              }
                              }}>Providers</Link>
                  </li>
                  <li className="nav-item">
                    <Link hreflang="en" className={'nav-link'} to={`/dashboard/components`}>Software</Link>
                  </li>
                  <li className="nav-item">
                    <Link hreflang="en" className={'nav-link'} to={`/dashboard/services`}>Services</Link>
                  </li>
                  {
                    this.props.object.props.eav != null &&
                    this.props.object.props.eav['supplier'] != null &&
                    this.props.object.props.eav['supplier'] === true
                      ?
                      <li className="nav-item">
                        <Link hreflang="en" className={'nav-link'} to={'/dashboard/supplier'}>Supplier Dashboard</Link>
                      </li>
                      :
                      <>
                      </>
                  }
                  {
                    this.props.object.props.organizationObject !== null && this.props.object.props.organizationObject.id === "073741b3-f756-4767-aa5d-240f167ca89d" &&
                    <li className="nav-item">
                      <Link hreflang="en" className={'nav-link'} to={`/admin`}>Admin</Link>
                    </li>
                  }
                </>
            }
          </ul>
        </nav>
        <nav className="navbar navbar-header navbar-expand-lg p-0">
          <div className="container-fluid p-0">
            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              {
                this.state.code != null &&
                  <>
                    <li className="nav-item dropdown hidden-caret">
                      {/*eslint-disable-next-line*/}
                      <a hrefLang="en" href="#" className="dropdown-toggle" role="button" data-toggle="dropdown"
                         aria-haspopup="true" aria-expanded="false">
                        <span className={'d-flex'} style={{color: "white"}}><i className="fa fa-building mr-1 mt-auto mb-auto"></i>
                          {
                            this.props.object.props.organizationObject != null
                              ?
                              this.props.object.props.organizationObject['name']
                              :
                                <div className="loader loader-success loader-sm"></div>
                          }
                        </span>
                      </a>
                      <ul className="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown">
                        <li>
                          <div className="dropdown-title">Settings</div>
                        </li>
                        <li>
                          <Link
                            className={'see-all'}
                            to={{
                              pathname: '/dashboard/organizations/edit',
                              state: {
                                code: this.state.code,
                                organization: getCookie('organization')
                              }
                            }}
                          >
                            Edit <i className="fas fa-clipboard-check mt-auto mb-auto"></i> </Link>

                        </li>
                        <li>
                          <Link
                            className={'see-all'}
                            to={{
                              pathname: '/dashboard/users',
                              state: {
                                code: this.state.code,
                                organization: getCookie('organization')
                              }
                            }}
                          >
                            Users <i className="fas fa-users"></i>
                          </Link>

                        </li>
                        <li>
                          <Link hreflang="en" className={'see-all'} to={'/dashboard/providers'}>Providers<i className="fa fa-building"></i></Link>
                        </li>
                        <li>
                          <Link hreflang="en" className={'see-all'} to={'/dashboard/licenses'}>Licenses<i className="fa fa-drivers-license-o"></i></Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                          <div className="dropdown-title">Organizations</div>
                        </li>
                        <li>
                          <div className="notif-scroll scrollbar-outer">
                            <div className="notif-center">
                              {
                                this.state.organizations != null &&
                                Object.entries(this.state.organizations).slice(0,3).map(([key,value])=>{
                                  return (
                                    //eslint-disable-next-line
                                    <a hrefLang="en" onClick={() => {
                                      this.switchOrganization(value.id)
                                      window.location.href = this.context.url + '/dashboard'
                                    }} style={{cursor: "pointer"}}>
                                      <div className="notif-icon notif-primary">
                                        <i className="fa fa-building"></i>
                                      </div>
                                      <div className="notif-content">
                                        <span className="block">{value.name}</span>
                                        <span className="time">Select organization</span>
                                      </div>
                                    </a>
                                  );
                                })
                              }
                            </div>
                          </div>
                        </li>
                        <li>
                          <Link hreflang="en" className={'see-all'} to={'/dashboard/organizations'}>See all organizations<i className=" fa fa-angle-right"></i> </Link>
                        </li>
                        <li>
                          <Link
                            className={'see-all'}
                            to={{
                              pathname: '/dashboard/organizations/add',
                              state: {
                                code: this.state.code
                              }
                            }}
                          >
                            Add organization </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown hidden-caret">
                      {/*eslint-disable-next-line*/}
                      <a hrefLang="en" className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"
                         aria-expanded="false">
                        <div className="avatar-sm">
                          {
                            this.state.user != null
                              ?
                                <img alt={""} src={"https://eu.ui-avatars.com/api/?name="+this.state.user['given_name']+"+"+this.state.user['family_name']+"&background=808080&rounded=true&color=fff&bold=true"} className=" card-img-top rounded-circle border-white"/>
                              :
                                <img alt={""} src={"https://eu.ui-avatars.com/api/?name=?&background=808080&rounded=true&color=fff&bold=true"} className=" card-img-top rounded-circle border-white"/>

                          }
                        </div>
                      </a>
                      <ul className="dropdown-menu dropdown-user animated fadeIn">
                        <div className="dropdown-user-scroll scrollbar-outer">
                          <li>
                            <div className="user-box">
                              <div className="avatar-lg" data-toggle="dropdown" aria-expanded="false" id="userDropdown"
                                   role="button">
                                {
                                  this.state.user != null
                                    ?
                                    <img alt={""} src={"https://eu.ui-avatars.com/api/?name="+this.state.user['given_name']+"+"+this.state.user['family_name']+"&background=808080&rounded=true&color=fff&bold=true"} className=" card-img-top rounded-circle border-white"/>
                                    :
                                    <img alt={""} src={"https://eu.ui-avatars.com/api/?name=?&background=808080&rounded=true&color=fff&bold=true"} className=" card-img-top rounded-circle border-white"/>

                                }
                              </div>
                              <div className="u-text">
                                {
                                  this.state.user != null &&
                                  <h4 style={{textTransform: 'capitalize'}}>{this.state.user['fullName']}</h4>
                                }
                                {
                                  this.state.user != null &&
                                  <p className="text-muted">{this.state.user['email']}</p>
                                }
                                <a hrefLang="en"
                                  href="https://id-vault.com/dashboard"
                                  className="btn btn-xs btn-secondary btn-sm"
                                  target="_blank" rel={"noreferrer"}>View profile</a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-divider"></div>
                            <Link
                              className={'dropdown-item'}
                              to={{
                                pathname: '/dashboard/organizations/add',
                                state: {
                                  code: this.state.code
                                }
                              }}
                            >
                              Add organization </Link>
                          </li>
                          <li>
                            <div className="dropdown-divider"></div>
                            <Link hreflang="en" className={'dropdown-item'} to={'/dashboard/logout'}>Logout</Link>
                          </li>
                        </div>
                      </ul>
                    </li>
                  </>
              }
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

