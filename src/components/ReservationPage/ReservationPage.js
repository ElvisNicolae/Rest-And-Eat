import "./ReservationPage.scss";
import "./CalendarStyling.scss";
import Calendar from 'react-calendar';
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import ReservationModal from "./ReservationModal/ReservationModal";
import { useQuery, useMutation, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const RESERVATIONDATA = gql`
  query getReservationData {
    reservationpage {
      data {
        attributes {
          heading,
          paragraph
        }
      }
    }
  }
`;

const MAKE_RESERVATION = gql`
  mutation createReservation($name: String!, $email: String!, $date: String!) {
    createReservation( data: { name: $name, email: $email, date: $date } ) {
      data {
        attributes {
          name
          email
          date
        }
      }
    }
  }
`;

const ReservationPage = () => {
  const location = useLocation();
  
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[location]);

  const { data } = useQuery(RESERVATIONDATA);
  const [ makeReservation, { data: makeReservationData } ] = useMutation(MAKE_RESERVATION);

  const [date, setDate] = useState(null);
  const [renderPickDate, setRenderPickDate] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [ inputName, setInputName ] = useState('');
  const [ inputEmail, setInputEmail ] = useState('');
  
  const handleOnClickDay = (day) => {
    setDate(`${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`); // date format: DD/MM/YYYY
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if(date) {
      makeReservation({
        variables: {name: inputName, email: inputEmail, date}
      });
      setRenderModal(true);
      setRenderPickDate(false);
    } else {
      setRenderPickDate(true);
    }
  }

  const currentDate = new Date();
  const twoMonthsAfterDate = new Date(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate());
  
  return (
    <main className="res-page">
      <div className="reservation-container">
        <div className="res-info">
          <h1 className="res-info__heading">
            { data ? data.reservationpage.data.attributes.heading : "Default Heading" }
          </h1>

          <ReactMarkdown className="res-info__paragraph">
            { data ? data.reservationpage.data.attributes.paragraph : "Default Paragraph" }
          </ReactMarkdown>

          <Link to='/menu'><button className="btn btn-secondary" type='button'> See the menu </button></Link>
        </div>

        <form className="res-form" onSubmit={(e) => { handleFormSubmit(e) }}>
          <h2 className="res-form__heading">Make a reservation</h2>

          <label className="res-form__label">
            Name
            <input 
              name='name' 
              value={inputName}
              onChange={(e) => { setInputName(e.target.value) }}
              className="res-form__input" 
              type="text" 
              placeholder="John Bill" 
              required
            />
          </label>

          <label className="res-form__label">
            Email
            <input 
              name='email' 
              value={inputEmail}
              onChange={(e) => { setInputEmail(e.target.value) }}
              className="res-form__input" 
              type="email" 
              placeholder="name@example.com" 
              required
            />
          </label>

          {renderPickDate ? <span className="res-form__span-err">You need to pick a date</span> : null}

          <Calendar 
            className='res-form__calendar'
            minDate={new Date()} 
            maxDate={twoMonthsAfterDate}
            minDetail='month'
            locale='en'
            onClickDay={(e) => { handleOnClickDay(e) }}
          />

          <button 
            type="submit" 
            className="btn btn-primary res-form__btn"
          > 
            Send 
          </button>
        </form>
      </div>
      { 
        renderModal ? 
          <ReservationModal 
            setRenderModal={setRenderModal} 
            resetInputName={setInputName}
            resetInputEmail={setInputEmail}
            name={inputName}
          /> 
        : null
      }
    </main>
  )
}

export default ReservationPage;
