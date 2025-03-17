import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Profil from './Profil';
import Experiences from './Exeprience';
import Diplomes from './Dimplome';

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
        <Profil apiData={apiData} />
        <div className='ctn-aboutme'>
          <div className='aboutme'>
            <h2>À propos de moi</h2>
            <div className='text' dangerouslySetInnerHTML={{ __html: apiData.aboutMe }} />
          </div>
          <div className='infos'>
              {apiData.personalInfos.map((personalInfo, index) =>
                <div className='info' key={index}>
                  <div className='text-info'>
                    <div className='title'>{personalInfo.name}</div>
                    {personalInfo.link ? (
                      <a href={personalInfo.link} target="_blank" className='value'>{personalInfo.value}  <i className="bi bi-arrow-up-right"></i></a>
                    ) : 
                      <div className='value'>{personalInfo.value}</div>
                    }
                  </div>
                </div>
              )
              }
          </div>
        </div>
        <h2 className='titleDiplomes'>Diplômes</h2>
          <Diplomes diplomes={apiData.diplomes}></Diplomes>
          
        <h2 className='titleExperience'>Experiences</h2>
          <Experiences experiences={apiData.experiences}></Experiences>
        
        
        </>
      )}
    </div>
  );
};

export default Home;

        