import { useContext, useEffect, useState } from "react";
import classes from "./ProductsView.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import BasketContext from "../../context/BasketContext";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [color, setColor] = useState("#49c59c");
  const ctx = useContext(BasketContext);
  const customerId = 15746;


  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
    marginBottom: '100px'
  };

  useEffect(() => {
    setLoading(true);
    getProducts();

  }, [])

  const getProducts = () => {
    fetch(`http://localhost:8080/random-products`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json()
    })
    .then(data => {
      setError(null);
      setProducts(data);
    })
    .catch(error => {
      setError(error.message);
    })
  }


  return (
    <div className={classes.wrapper}>
      <div className={classes.productsWrapper}>
        <h1>Products</h1>
        <div className={classes.itemsWrapper}>
          {products.length > 0 && products.map((product) => {
              return (
                <div className={classes.product} key={product.StockCode}>
                  <img src={`https://gravatar.com/avatar/${product.Description}?d=retro&s=500`} className={classes.productImg} />
                  <div className={classes.productDescription}>
                    <p className={classes.title}>{product.StockCode}</p>
                    <p className={classes.subtitle}>{product.Description}</p>
                    <p className={classes.subtitle}>Price: {product.UnitPrice}</p>
                  </div>
                  <button className={classes.button} onClick={() => ctx.addToBasket(product)}>Add</button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ProductsView;