import { useEffect, useState } from "react";
import classes from "./ProductsView.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const ProductsView = () => {
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [color, setColor] = useState("#49c59c");
  const customerId = 15746;

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
    marginBottom: '100px'
  };

  useEffect(() => {
    setLoading(true);
    setResults([]);
    getRecommendedProducts();
    getProducts();

  }, [])

  const getRecommendedProducts = () => {
    fetch(`http://localhost:8001/recommend-products/id/${customerId}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json()
    })
    .then(data => {
      setError(null);
      setResults(data.recommendations);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    })
  }

  const getProducts = () => {
    fetch(`http://localhost:8001/random-products`)
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
                  <p className={classes.title}>{product.StockCode}</p>
                  <p className={classes.subtitle}>{product.Description}</p>
                  <p className={classes.subtitle}>Price: {product.UnitPrice}</p>
                </div>
              )
            })}
        </div>
      </div>
      <div className={classes.recommendationsWrapper}>
        <h1>Products recommended for you</h1>
        <div className={classes.resultsWrapper}>
          {results.length > 0 && results.map((result) => {
            return (
              <div className={classes.result} key={result.rec_stock_code}>
                <p className={classes.title}>{result.rec_stock_code}</p>
                <p className={classes.subtitle}>{result.rec_descr}</p>
              </div>
            )
          })}
        </div>
        {loading && <PropagateLoader
        loading={loading}
        cssOverride={override}
        color={color}
        size={20}
        aria-label="Loading Spinner"
        />}
        {error && !loading && <p>{error}</p>}
      </div>


    </div>
  )
}

export default ProductsView;