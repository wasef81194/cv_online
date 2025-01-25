import React from 'react';
import PhotoProfile from './../images/pp.png';
import PhotoCover from './../images/cover.png';
import Verified from './../images/verified.png';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='profile'>
        {/* <Link to="/test">Aller à la page de test</Link> */}
        <div className='cover'>
          <img src={PhotoCover} alt="Cover picture" />
        </div>
        <div className='info-profile'>
          <div className='pp'>
            <img className="img-pp" src={PhotoProfile} alt="Profile picture" />
            <img className="img-verified" src={Verified} alt="" />
          </div>
          <div className='empty'></div>
          <div className='info'>
            <h1>Alexandra Wasef</h1>
            <p>Je suis developpeuse web Full Stack</p>
          </div>
        </div>
    </div>
  );
};

export default Home;