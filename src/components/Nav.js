import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(target) {
    this.props.onPageChange(target);
    this.props.onUpdate();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand">Carousell Reddit</span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={this.props.current === 'Home' ? 'nav-item active' : 'nav-item'}>
              <span className="nav-link" onClick={() => {this.handleNavClick('Home')}}>Home</span>
            </li>
            <li className={this.props.current === 'Topics' ? 'nav-item active' : 'nav-item'}>
              <span className="nav-link" onClick={() => {this.handleNavClick('Topics')}}>Topic Management</span>
            </li>
          </ul>
        </div>
        <span className="navbar-text">Hi! User</span>
      </nav>
    );
  }
}
