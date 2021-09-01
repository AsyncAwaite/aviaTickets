import currencyUI from "./currency";
class FavoritesUI {
  constructor(currency) {
    this.container = document.querySelector("#dropdown1");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    
  }

  renderFavorites(favorites) {
    this.clearContainer();
    if (!favorites.length) { 
      
      return;
    }
    let fragment = ""; 
    favorites.forEach((favorite, index) => {
      const template = FavoritesUI.favoriteItemTemplate(favorite, index);
      fragment += template;
    })
   
    this.container.insertAdjacentHTML("afterbegin", fragment);
 
  }

  clearContainer() {
    this.container.innerHTML = "";
  }
  deleteFromFavories(e, favorites, tickets) {
    const favoriteIndex = Number(this.getFavoriteIndex(e));
    favorites.forEach((item, index, array) => {
      if(index === favoriteIndex) {
        array.splice(index, 1);
      }
    });
    
    this.renderFavorites(favorites)
  }

  static favoriteItemTemplate(ticket, index) {
    return `
    <div data-favorite="${index}" class="favorite-item  d-flex align-items-start">
      <img
        src=${ticket.airline_logo}
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center"
        >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${ticket.currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">
          Delete
        </a>
      </div>
    </div>
    `;
  }
  getFavoriteIndex(e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const favoriteItem = e.target.closest(".favorite-item ");     
      return favoriteItem.dataset.favorite;
    }
  }
}
const favoritesUI = new FavoritesUI(currencyUI);
export default favoritesUI;