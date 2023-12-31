/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import {createRestaurantItemTemplate} from '../templates/template-creator';

const FavoritePage = {
  async render() {
    return `
    <div class="content">
      <h2 class="content__heading">Your Favorite Restaurant</h2>
      <div id="restaurants" class="restaurants">
 
      </div>
    </div>
  `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = `
      Favorite Restaurants is empty.
      `;
    }

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default FavoritePage;
