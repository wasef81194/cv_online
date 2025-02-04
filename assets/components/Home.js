import React, { useState, useEffect }  from 'react';
import PhotoProfile from './../images/pp.png';
import PhotoCover from './../images/cover.png';
import Verified from './../images/verified.png';
import { Link } from 'react-router-dom';
const Home = () => {
  console.log(process.env.KEY_API);
  
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profil', {
          method: 'GET',
          headers: {
            'Authorization': 'dsAefdcxsE62dse589esf4s', // Inclure la clé API dans le header
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='profile'>
        {apiData ? (
          <p>Données de l'API : {JSON.stringify(apiData)}</p>
        ) : (
          <p>Chargement des données...</p>
        )}
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
            <p>Je suis developpeuse web full stack</p>
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

export default Home;