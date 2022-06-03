import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import "./ReservationModal.scss";

const ReservationModal = ({setRenderModal, name, resetInputName, resetInputEmail}) => {

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'hidden'; // so that users cannot scroll
  }, []);

  const handleCloseModalClick = (e) => {
    document.querySelector('body').style.overflowY = 'visible';
    e.target.style.display = 'none';

    resetInputName('');
    resetInputEmail('');
    setRenderModal(false);
  }

  window.addEventListener('click', (e) => {
    if(e.target.className === 'reservation-modal') {
      handleCloseModalClick(e);
    }
  })

  return ReactDOM.createPortal(
    <div className='reservation-modal'>
      <div className="reservation-modal__content">
        Thank you {name}! <br />
        You have made a successful reservation!

        <p 
          className="reservation-modal__close-modal"
          aria-label='close the modal'
          onClick = {handleCloseModalClick}
        >
          X
        </p>
      </div>
    </div>,
    document.querySelector('#reservation-modal')
  );
}

export default ReservationModal;
