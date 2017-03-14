import React from 'react';
import {Link} from 'react-router';

function Header(props) {
  return (
    <div id="header">
      <Link to="/">
        <h1>Chess Game</h1>
      </Link>
      <h4>Play chess bla bla bla</h4>
    </div>
  );
}

export default Header;