import React, { useState } from 'react';
import PhotoProfile from './../images/pp.png';
import PhotoCover from './../images/cover.png';
import Verified from './../images/verified.png';

const Profil = ({apiData}) => {
  // État pour gérer l'ouverture de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Valeur du formulaire
  const [phoneNumber, setPhoneNumber] = useState('');
  const [messageErrorPhoneNumber, setMessageErrorPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [societe, setSociete] = useState('');
  const [message, setMessage] = useState('');
  const [contentBtn, setContentBtn] = useState(<span><i className="bi bi-check-lg"></i> Valider </span>);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

    // Fonction pour ouvrir la modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
      setRequestMessage("");
      setIsModalOpen(false);
    };
    
  const verifiedPhoneNumber = (phone) => {
    const phoneRegex = /^[+]?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;
    if (!phoneRegex.test(phone)) {
      return false;
    }
    else{
      return true;
    }
  }
 
  const resetForm = () => {
    setPhoneNumber("");
    setMessageErrorPhoneNumber("");
    setName("");
    setSociete("");
    setMessage("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const contentBtnDefault = contentBtn;
    //Chargement du btn 
    setContentBtn(<span> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Chargement... </span>);
    setDisabledBtn(true);

    
    if (phoneNumber.length === 0) {
      // Si le numéro est incorrect
      setMessageErrorPhoneNumber("Merci d'entrer un numero de téléphone.");
      setContentBtn(contentBtnDefault);
      setDisabledBtn(false);
      return;
    }
    // Expression régulière pour valider un numéro de téléphone (exemple : format international ou local)
    else if(!verifiedPhoneNumber(phoneNumber)) {
      // Si le numéro est incorrect
      setMessageErrorPhoneNumber("Numéro de téléphone invalide. Veuillez entrer un numéro correct.");
      //Chargement du btn 
      setContentBtn(contentBtnDefault);
      setDisabledBtn(false);
      return;
    } 


    const requestOptions = {
      method: "POST", 
      headers: {
        'Authorization': `${process.env.KEY_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: name,
          societe : societe,
          phoneNumber : phoneNumber,
          message: message,
      }),
    };

    fetch('api/remind', requestOptions)
      .then(data => data.json())
      .then((data) => {
        setRequestMessage({
          text : data.success,
          class : 'alert-success'
        });
        setContentBtn(contentBtnDefault);
        setDisabledBtn(false);
        resetForm();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setRequestMessage({
          text:  error.error,
          class: 'alert-danger',
        });
      })
   console.log("Envoyer");
  }

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
        <a href="mailto:votreadresse@mail.fr" className='message btn btn-white'>
          <i className="bi bi-envelope-at"></i> 
          Message
        </a>
        <div onClick={openModal} className='call btn btn-black'>
          <i className="bi bi-voicemail"></i>
          Appeler
        </div>
      </div>
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className='parent-modal'>
        <dialog open className='modal modal-call'>
          <div className="ctn-modal">
          <div className='close' onClick={closeModal}><i className="bi bi-x-lg"></i></div>
            <form className='form-call' onSubmit={handleSubmit}>
              <h3>Demande d'être rappeler</h3>
              <div className='flex-col'>
                {requestMessage && (
                  <div className={'requestMessage '+requestMessage.class}>{requestMessage.text}</div>
                )}
                <div className='flex'>
                  <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder='Nom'></input>
                  <input type="text" onChange={e => setSociete(e.target.value)} value={societe} placeholder='Societe'></input>
                </div>
                <div>
                <div className='flex'>
                  <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder='Votre numéro *'></input>
                </div>
                {messageErrorPhoneNumber && (
                  <div className='error-input'>{messageErrorPhoneNumber}</div>
                )}
                </div>
                <div className='flex'>
                <textarea onChange={e => setMessage(e.target.value)} value={message} placeholder='Message'></textarea>
                </div>
                <button type="submit" value="Envoyer" disabled={disabledBtn} className="btn btn-send mt-3 mb-3">{contentBtn}</button>
              </div>
            </form>
          </div>
        </dialog>
        </div>
      )}
  </div>
  );
};

export default Profil;
