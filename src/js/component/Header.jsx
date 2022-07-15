import React from 'react';
import '../../styles/Header.css';


//Este fichero crea el header y la conexión a la BBDD


const Header = (props) => {
    
    return(
      <div className='header'>
        <h1>{props.nombreApp} APP</h1>
        <h4>By Sergio Centenera</h4>
      </div>
    );
}



export default Header;