import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    to: '/',
    text: 'Homepage'
  },
  {
    to: '/about',
    text: 'About'
  },
  {
    to: '/profile/1',
    text: 'Profile1'
  },
  {
    to: '/contact',
    text: 'Contact'
  }
];

const isCurrent = (to, current) => {
  if (to === '/' && current === to) {
    return true;
  } else if (to !== '/' && current.includes(to)) {
    return true;
  }

  return false;
};

const HeaderLink = ({ to, text, current }) => (
  <li className={isCurrent(to, current) ? 'current' : ''}>
    <Link to={to}>{text}</Link>
  </li>
);

export default ({ isAuthenticated, current }) => (
  <header id="header">
    <Link to="/"><img src="/assets/logo.jpg" alt="logo"/></Link>
    <ul id="links">
      {links.map((link, index) => {
        const TheLink = <HeaderLink key={index} current={current} {...link} />;
        return TheLink;
      })}
    </ul>
  </header>
);