import currencyUI from "../views/currency";

class Favorites {
  constructor(currency) {
    this.favorites = [];
    
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }
  

  async create(ticket) {
    if (!this.favorites.includes(ticket)) 
     this.favorites.push(ticket);
  }

  
}

const favorites = new Favorites(currencyUI);
export default favorites;
