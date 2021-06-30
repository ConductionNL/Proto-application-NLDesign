import React, {Component} from 'react';

// Import the context
import ConfigContext from "./Context/Config";

export default class Footer extends Component {
  static contextType = ConfigContext;

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <a hrefLang="nl" className="nav-link" href="https://www.conduction.nl">Conduction</a>
              </li>
              <li className="nav-item">
                <a hrefLang="en" className="nav-link" href="/documentation" >Help</a>
              </li>
              {/*<li className="nav-item">*/}
              {/*  <a hrefLang="en" className="nav-link" href="#licences">Licences</a>*/}
              {/*</li>*/}
              <li className="nav-item">
                <a hrefLang="en" className="nav-link" href={this.context.api + "/documents/terms.pdf"} rel={"noreferrer"} target="_blank">Terms and conditions</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }
}

