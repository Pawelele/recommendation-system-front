import { useContext, useEffect, useState, useCallback } from "react";
import classes from "./ProductsView.module.css";
import BasketContext from "../../context/BasketContext";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [color, setColor] = useState("#49c59c");
  const ctx = useContext(BasketContext);
  const customerId = 15746;

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
    marginBottom: "100px",
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch(`http://localhost:8080/random-products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        setError(null);
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.productsWrapper}>
        <h1>Products</h1>
        <div className={classes.itemsWrapper}>
          {products.length > 0 &&
            products.map((product, index) => {
              return (
                <div className={classes.product} key={product.StockCode}>
                  <div className={classes.productImgWrapper}>
                    <img
                      src={`static/images/${product.Description}.jpg`}
                      className={`${classes.productImg} `}
                      alt={product.Description}
                      onError={(event) => {
                        event.target.src = `static/images/default.png`;
                        event.onerror = null;
                      }}
                    />
                  </div>
                  <div className={classes.productDescription}>
                    {/* <p className={classes.title}>{product.StockCode}</p> */}
                    <p className={classes.subtitle}>{product.Description}</p>
                    <p className={classes.price}>{product.UnitPrice} USD</p>
                    <button
                      className={classes.button}
                      onClick={() => ctx.addToBasket(product)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
