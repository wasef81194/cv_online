import React, { useState, useEffect, useCallback } from 'react';
import PhotoProfile from './../images/pp.png';
import PhotoCover from './../images/cover.png';
import Verified from './../images/verified.png';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/profil', {
        method: 'GET',
        headers: {
          'Authorization': `${process.env.KEY_API}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      setApiData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      // setTimeout(() => setIsLoading(false), 1000); // Délai court pour 
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Chargement
  if (isLoading) return <Loader></Loader>
  //Erreur
  if (error) return <p>Erreur : {error}</p>;

  //Page
  return (
    <div className='home'>
      {apiData && (
        <>
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
        <div className='ctn-aboutme'>
          <div className='aboutme'>
            <h2>À propos de moi</h2>
            <div className='text' dangerouslySetInnerHTML={{ __html: apiData.aboutMe }} />

          </div>
          <div className='infos'>
              <div className='title'>Localisation</div>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default Home;

        