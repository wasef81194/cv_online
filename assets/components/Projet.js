import React, { useState} from 'react';
import ModalProjet from './projet/Modal';


const Projets = ({projets}) => {
    const handleClick = (idProjet) => {
    setSelectedProjetId(idProjet);
    setIsOpen(true);
    };
    const handleClose = () => setIsOpen(false);
    const [selectedProjetId, setSelectedProjetId] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const formatDate = (dateString) => {
        if (!dateString) return "Aujourd'hui"; // Si la date est null ou vide
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    };
    return (
        <div className='projets'>
        {projets.sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart)).map((projet, index) =>
        <div className='projet btn-projet'  onClick={() => handleClick(projet.id)}  key={index}>
            <div className='infos'>
            <div className='image'>
                <img src={`../images/projets/${projet.images[0].name}`} alt="Logo" />
            </div>
            <div className='info'>
                <div className='name'>{projet.name}</div>
                <div className='ecole'>{projet.ecole}</div>
            </div>
            </div>
            <div className='date'>
            <div className='start'>{formatDate(projet.dateStart)}</div>
            <div> - </div>
            <div className='end'>{formatDate(projet.dateEnd)}</div>
            </div>
        </div>
        )
        }
        <ModalProjet isOpen={isOpen} onClose={handleClose} idProjet={selectedProjetId}>
        </ModalProjet>
    </div>
    );
};

export default Projets;
