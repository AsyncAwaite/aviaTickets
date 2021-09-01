import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favorites from "./store/favorites";
import favoritesUI from "./views/favorites";

document.addEventListener("DOMContentLoaded", (e) => {
  const form = formUI.form;
  const tickets = ticketsUI.container; 
  favoritesUI.renderFavorites(favorites.favorites);
  // Events
  initApp();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
    favoritesUI.renderFavorites(favorites.favorites);
  });
  tickets.addEventListener("click", (e) => {
    favorites.create(ticketsUI.addToFavorites(e, locations.lastSearch));
    favoritesUI.renderFavorites(favorites.favorites);
  });

  favoritesUI.container.addEventListener('click', (e) => {
    e.preventDefault();
    favoritesUI.deleteFromFavories(e, favorites.favorites);
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;
    favoritesUI.renderFavorites(favorites.favorites);

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    
  }

});
