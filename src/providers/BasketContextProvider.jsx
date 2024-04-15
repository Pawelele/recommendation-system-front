import { useState } from "react";
import BasketContext from "../context/BasketContext";

const BasketContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const addToBasket = (product) => {
    const items = [...new Set([...products, product])];
    setProducts(items);
  };

  const removeFromBasket = (stockCode) => {
    const newProductsList = products.filter((product) => {
      if (product.StockCode) {
        return product.StockCode !== stockCode;
      } else if (product.rec_stock_code) {
        return product.rec_stock_code !== stockCode;
      }
    });
    setProducts(newProductsList);
  };

  return (
    <BasketContext.Provider
      value={{
        products,
        addToBasket,
        removeFromBasket,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
