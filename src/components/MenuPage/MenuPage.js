import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./MenuPage.scss";
import { useQuery, gql } from "@apollo/client";

const DISHES = gql`
  query GetDishes {
    dishes(pagination: { limit: 15 }) {
      data {
        attributes {
          dish_name,
          dish_ingredients,
          dish_price,
          dish_url,
          dish_tag
        }
      }
    }
  }
`;

const MenuPage = () => {
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[location]);

  const { data } = useQuery(DISHES);

  const [ selectedFilter, setSelectedFilter ] = useState('all');
  
  const renderDishes = data && data.dishes.data.map((elm, index ) => {
    if(elm.attributes.dish_tag == selectedFilter || selectedFilter == 'all') {
      return (
        <div key={index} className="menu-dish">
          <div className="menu-dish__img">
            <img src={elm.attributes.dish_url} alt={elm.attributes.dish_name} />
          </div>
          <div className="menu-dish__name-price">
            <div className='menu-dish__name'>{elm.attributes.dish_name}</div>
            <span className='menu-dish__price'><strong>{elm.attributes.dish_price}</strong>$</span>
          </div>
          <p className="menu-dish__ingredients">
            {elm.attributes.dish_ingredients}
          </p>
        </div>
      )
    }
  });

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  }

  return (
    <main className="menu">
      <ul className="menu-filters">
        <li onClick={ () => { handleFilterClick('all') } } className="menu-filters__filter menu-filters__filter--selected">All Dishes</li>
        <li onClick={ () => { handleFilterClick('food') } } className="menu-filters__filter">Food</li>
        <li onClick={ () => { handleFilterClick('drink') } } className="menu-filters__filter">Drinks</li>
        <li onClick={ () => { handleFilterClick('dessert') } } className="menu-filters__filter">Desserts</li>
      </ul>

      <div className="menu-dish-grid">
        { renderDishes }
      </div>
        
    </main>
  )
}

export default MenuPage;
