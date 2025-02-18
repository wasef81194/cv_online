import React, { useState} from 'react';
import ModalExperience from './experience/modal';

const Experiences = ({experiences}) => {
    const handleClick = (idExperience) => {
    setSelectedExperienceId(idExperience);
    setIsOpen(true);
    };
    const handleClose = () => setIsOpen(false);
    const [selectedExperienceId, setSelectedExperienceId] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const formatDate = (dateString) => {
        if (!dateString) return 'Présent'; // Si la date est null ou vide
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    };
    return (
        <div className='experiences'>
        {experiences.map((experience, index) =>
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
    );
};

export default Experiences;
