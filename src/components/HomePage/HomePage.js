import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./HomePage.scss";
import AboutUs from './AboutUs';
import saladmeat from '../../images/saladmeat.png';
import foodplateblack from '../../images/foodplateblack.png';
import salad from '../../images/salad.png';
import { useQuery, gql } from "@apollo/client";

const HOMEPAGE = gql`
  query GetHomePageData {
    homepage {
      data {
        attributes {
          header_heading,
          header_paragraph,
          popular_dishes_heading,
          popular_dishes_paragraph,
          populardishes {
            data {
              attributes {
                dish_name, 
                dish_ingredients,
                dish_url,
                dish_price
              }
            }
          }
        }
      }
    }
  }
`;

const HomePage = () => {
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[location]);

  const { data } = useQuery(HOMEPAGE);

  const renderPopDishesList = data && data.homepage.data.attributes.populardishes.data.map((elm, index) => {
    return (
      <li className='pop-dishes__dish' key={index}>
        <div className='pop-dishes__dish-img'>
          <img src={elm.attributes.dish_url} alt="ewq" />
        </div>
        
        <div className="pop-dishes__dish-name-price">
          <div className='pop-dishes__dish-name'>{elm.attributes.dish_name}</div>
          <span className='pop-dishes__dish-price'><strong>{elm.attributes.dish_price}</strong>$</span>
        </div>
        
        <p className='pop-dishes__dish-ingredients'>
          {elm.attributes.dish_ingredients}
        </p>
      </li>
    );
  })

  return (
    <main className='home'>
      <section className='home-header'>
        <div className="home-header__container">
          <div className="home-header__text-container">
            <h1 className='home-header__heading'>
              {data ? data.homepage.data.attributes.header_heading : "Default Heading"}
            </h1>
            <p className='home-header__paragraph'>
              {data ? data.homepage.data.attributes.header_paragraph : "Deafult paragraph"}
            </p>
            <Link to='/menu'><button type='button' className='btn btn-primary home-header__btn'> Check Menu </button></Link>
          </div>
          
          <div className="home-header__imgs">
            <img
              className='home-header__img' 
              src={saladmeat} 
              alt="" 
            />
            <img
              className='home-header__img' 
              src={salad} 
              alt="" 
            />
            <img
              className='home-header__img' 
              src={foodplateblack} 
              alt="" 
            />
          </div>
        </div>
      </section>

      <AboutUs />

      <section className='pop-dishes'>
        <h2 className='pop-dishes__heading'>
          {data ? data.homepage.data.attributes.popular_dishes_heading : "Deafult Heading"}
        </h2>
        <p className='pop-dishes__paragraph'>
          {data ? data.homepage.data.attributes.popular_dishes_paragraph : "Deafult paragraph"}
        </p>

        <ul className="pop-dishes__dish-list">
          { renderPopDishesList }
        </ul>
      </section>  

      <Link to='/reservation'><button className='btn btn-secondary btn-make-reservation'> Make a Reservation </button></Link>
    </main>
  )
}

export default HomePage