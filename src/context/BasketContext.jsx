import { createContext } from 'react';

const BasketContext = createContext({
  products: [],
  addToBasket: (product) => {},
  removeFromBasket: (stockCode) => {}
});

export default BasketContext;