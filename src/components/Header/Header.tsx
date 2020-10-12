import React from 'react';
import logo from './logo.svg';
import './Header.scss';

export type HeaderProps = {

};
const Header: React.FunctionComponent<HeaderProps> = props => (
  <header className="header" data-testid="headercomponent">
    <img src={logo} alt="Sauce Labs" className="logo" />
  </header>
);

export default Header;