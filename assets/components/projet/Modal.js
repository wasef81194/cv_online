import React, { useState, useEffect, useCallback } from 'react';

const ModalProjet= ({ isOpen, onClose, idProjet }) => {
    const [apiDataProjet, setApiDataProjet] = useState(null);
    const [errorApi, setErrorApi] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        if (!isOpen) return; // Ne pas charger si la modale n'est pas ouverte
       
        try {
            const response = await fetch('/api/projet', {
                method: 'GET',
                headers: {
                    'idProjet': idProjet,
                    'Authorization': `${process.env.KEY_API}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const data = await response.json();
            setApiDataProjet(data);
            
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
            <dialog open className='modal modal-projet'>
                <div className='ctn-modal'>
                    <div>
                        <div className='close' onClick={onClose}><i className="bi bi-x-lg"></i></div>
                        {apiDataProjet && (
                            <div className='ctn-projet'>
                                <div className='infos-projet'>
                                    <div className='image'>
                                        <img src={`../images/projets/${apiDataProjet.images[0].name}`} alt="Logo" />
                                    </div>
                                    <div className='info-projet'> 
                                        <div>
                                            <h2>{apiDataProjet.name}</h2>
                                            <div className='ecole'>{apiDataProjet.ecole}</div>
                                        </div>
                                        <div className='date'>
                                        <div className='start'>{formatDate(apiDataProjet.dateStart)}</div>
                                        <div> - </div>
                                        <div className='end'>{formatDate(apiDataProjet.dateEnd)}</div>
                                    </div>
                                </div>
                                </div>
                                <div className='description' dangerouslySetInnerHTML={{ __html: apiDataProjet.description }}></div>
                            </div>
                        )}
                    </div>
                    {apiDataProjet.images?.length > 1 && (
                        <>
                        <h3>Aperçu du projet</h3>
                        <div className='medias-projet'>
                            {apiDataProjet.images.map((media, index) => {
                                // Ignorer le premier élément
                                if (index === 0) return null;

                                // Vérifier si c'est une image ou une vidéo
                                const isImage = media.name.match(/\.(jpeg|jpg|png|gif)$/i); // Vérifie l'extension du fichier

                                return isImage ? (
                                    // Si c'est une image
                                    <a target="_blank"  href={`../images/projets/${media.name}`}title="Voir l'image"className='image-projet'key={index}>
                                        <img src={`../images/projets/${media.name}`} alt={`Image ${index + 1}`} />
                                    </a>
                                ) : (
                                    // Si c'est une vidéo
                                    <div className='video-projet' key={index}>
                                        <video controls>
                                            <source src={`../images/projets/${media.name}`} type="video/mp4" />
                                            Votre navigateur ne supporte pas la lecture des vidéos.
                                        </video>
                                    </div>
                                );
                            })}
                        </div>
                        </>
                    )}


                </div>
            </dialog>
            )}
        </div>
    );
};

export default ModalProjet;
