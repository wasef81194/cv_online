import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Profil from './Profil';
import ModalExperience from './experience/Modal';

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (idExperience) => {
    setSelectedExperienceId(idExperience);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

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

  const formatDate = (dateString) => {
    if (!dateString) return 'Présent'; // Si la date est null ou vide
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

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

        <h2>Experiences</h2>
        <div className='experiences'>
          {apiData.experiences.map((experience, index) =>
            <div className='experience btn-experience'  onClick={() => handleClick(experience.id)}  key={index}>
              <div className='infos'>
                <div className='image'>
                  <img src={`../images/experiences/${experience.image.name}`} alt="Logo" />
                </div>
                <div className='info'>
                  <div className='job'>{experience.job}</div>
                  <div className='entreprise'>{experience.entreprise}</div>
                </div>
              </div>
              <div className='date'>
                <div className='start'>{formatDate(experience.dateStart)}</div>
                <div> - </div>
                <div className='end'>{formatDate(experience.dateEnd)}</div>
              </div>
            </div>
          )
          }
          <ModalExperience isOpen={isOpen} onClose={handleClose} idExperience={selectedExperienceId}>
          </ModalExperience>
        </div>
        </>
      )}
    </div>
  );
};

export default Home;

        