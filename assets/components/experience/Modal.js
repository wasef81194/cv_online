import React, { useState, useEffect, useCallback } from 'react';

const ModalExperience = ({ isOpen, onClose, idExperience }) => {
    const [apiDataExperience, setApiDataExperience] = useState(null);
    const [errorApi, setErrorApi] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        if (!isOpen) return; // Ne pas charger si la modale n'est pas ouverte
       
        try {
            const response = await fetch('/api/experience', {
                method: 'GET',
                headers: {
                    'idExperience': idExperience,
                    'Authorization': `${process.env.KEY_API}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const data = await response.json();
            setApiDataExperience(data);
            
        } catch (error) {
            setErrorApi(error.message);
        } finally {
            setIsLoading(false);
            
        }
    }, [isOpen]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Présent'; // Si la date est null ou vide
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      };

    if (!isOpen) return null;

    return (
        <div className='parent-modal'>
            {isLoading ? (
                <p className='loader'>Chargement...</p>
            ) : errorApi ? (
                <p className='error'>Erreur : {errorApi} <button onClick={onClose}>fermer</button></p>
            ) : (
            <dialog open className='modal modal-experience'>
                <div className='ctn-modal'>
                        <div>
                            <div className='close' onClick={onClose}><i class="bi bi-x-lg"></i></div>
                            {apiDataExperience && (
                                <div className='ctn-experience'>
                                    <div className='info-experience'>
                                        <div className='image'>
                                            <img src={`../images/experiences/${apiDataExperience.image.name}`} alt="Logo" />
                                        </div>
                                        <div className='info-job'> 
                                            <div>
                                                <h2>{apiDataExperience.job}</h2>
                                                <div className='entreprise'>{apiDataExperience.entreprise}</div>
                                            </div>
                                            <div className='date'>
                                            <div className='start'>{formatDate(apiDataExperience.dateStart)}</div>
                                            <div> - </div>
                                            <div className='end'>{formatDate(apiDataExperience.dateEnd)}</div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='description' dangerouslySetInnerHTML={{ __html: apiDataExperience.description }}></div>
                                </div>
                            )}
                        </div>
                    
                </div>
            </dialog>
            )}
        </div>
    );
};

export default ModalExperience;
