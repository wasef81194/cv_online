import React from 'react';
import PhotoProfil from './../images/pp.jpg';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='profil'>
        <Link to="/test">Aller à la page de test</Link>
        <img src={PhotoProfil} alt="Photo de profil" />
        <h1>Alexandra WASEF</h1>
    </div>
  );
};

export default Home;