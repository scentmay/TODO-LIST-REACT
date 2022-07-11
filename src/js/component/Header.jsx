import React from 'react';
import '../../styles/Header.css';

const Header = (props) => {
    return(
      <div className='header'>
        <h1>{props.nombreApp} APP</h1>
        <h4>By Sergio Centenera</h4>
      </div>
    );
}

export default Header;