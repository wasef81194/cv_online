import React from 'react';
import PhotoProfile from './../images/pp.png';
import PhotoCover from './../images/cover.png';
import Verified from './../images/verified.png';

const Profil = ({apiData}) => {
  return (
    <div className='profile'>
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
        <h1>{apiData.lastname} {apiData.firstname}</h1>
        <p>{apiData.job}</p>
      </div>
      <div className='contact'>
        <div className='message btn btn-white'>
          <i className="bi bi-envelope-at"></i> 
          Message
        </div>
        <div className='call btn btn-black'>
          <i className="bi bi-voicemail"></i>
          Appeler
        </div>
      </div>
    </div>
  </div>
  );
};

export default Profil;
