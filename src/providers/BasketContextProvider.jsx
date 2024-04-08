import { useState } from 'react';
import BasketContext from '../context/BasketContext';



const BasketContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const addToBasket = (product) => {
    setProducts((prevState) => [...prevState, product]);
    console.log(products);
  };

  const removeFromBasket = (stockCode) => {
    const newProductsList = products.filter((product) => product.StockCode !== stockCode);
    setProducts(newProductsList);
  }

  return (
    <BasketContext.Provider
      value={{
        products,
        addToBasket,
        removeFromBasket
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
