import React, { useState} from 'react';

const Diplomes = ({diplomes}) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Présent'; // Si la date est null ou vide
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    };
    return (
    <div className='diplomes'>
        {diplomes.map((diplome, index) =>
        <div className='diplome' key={index}>
            <div className='infos'>
            <div className='image'>
                <img src={`../images/diplomes/${diplome.image.name}`} alt="Logo" />
            </div>
            <div className='info'>
                <div className='name'>{diplome.name}</div>
                <div className='ecole'>{diplome.ecole}</div>
                <div className='description'>{diplome.description}</div>
            </div>
            </div>
            <div className='date'>
            <div className='start'>{formatDate(diplome.dateStart)}</div>
            <div> - </div>
            <div className='end'>{formatDate(diplome.dateEnd)}</div>
            </div>
        </div>
        )
        }
    </div>
    );
};

export default Diplomes;
