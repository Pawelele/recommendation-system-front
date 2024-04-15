import { useContext, useEffect, useState } from "react";
import classes from "./BasketView.module.css";
import BasketContext from "../../context/BasketContext";
import PropagateLoader from "react-spinners/PropagateLoader";

const BasketView = () => {
  const ctx = useContext(BasketContext);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const customerId = 15746;
  const [color, setColor] = useState("#342e37");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
    marginBottom: "100px",
  };

  useEffect(() => {
    setLoading(true);
    setResults([]);
    getRecommendedProducts();
  }, []);

  const getRecommendedProducts = () => {
    fetch(`http://localhost:8080/recommend-products/id/${customerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        setError(null);
        setResults(data.recommendations);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.productsWrapper}>
        <h1>Your basket</h1>
        <div className={classes.itemsWrapper}>
          {ctx.products &&
            ctx.products.length > 0 &&
            ctx.products.map((product) => {
              return (
                <div
                  className={classes.product}
                  key={product.StockCode || product.rec_stock_code}
                >
                  <div className={classes.productImgWrapper}>
                  <img
                      src={`static/images/${product.Description || product.rec_descr}.jpg`}
                      className={classes.productImg}
                      alt={product.Description}
                      onError={event => {
                        event.target.src = `static/images/default.png`
                        event.onerror = null
                      }}
                    />
                  </div>
                  <div className={classes.productDescription}>
                    {/* <p className={classes.title}>{product.StockCode}</p> */}
                    <p className={classes.subtitle}>
                      {product.Description || product.rec_descr}
                    </p>
                    <p className={classes.subtitle}>
                      {product.UnitPrice || product.rec_price} USD
                    </p>
                    <button
                      className={classes.removeButton}
                      onClick={() => {
                        console.log(product);
                        ctx.removeFromBasket(product.StockCode||product.rec_stock_code)}}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={classes.recommendationsWrapper}>
        <h1>Products recommended for you</h1>
        <div className={classes.resultsWrapper}>
          {results &&
            results.length > 0 &&
            results.map((result) => {
              return (
                <div
                  className={classes.resultRecommendation}
                  key={result.rec_stock_code}
                >
                   <img
                      src={`static/images/${result.rec_descr}.jpg`}
                      className={classes.productImgRecommendation}
                      alt={result.rec_descr}
                      onError={event => {
                        event.target.src = `static/images/default.png`
                        event.onerror = null
                      }}
                    />
                 
                  <div className={classes.bodyRecommendationWrapper}>
                    <div className={classes.resultDescription}>
                      {/* <p className={classes.title}>{result.rec_stock_code}</p> */}
                      <p className={classes.subtitle}>{result.rec_descr}</p>
                    </div>
                    <button
                      className={classes.button}
                      onClick={() => {
                        console.log(result);
                        ctx.addToBasket(result);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {loading && (
          <PropagateLoader
            loading={loading}
            cssOverride={override}
            color={color}
            size={20}
            aria-label="Loading Spinner"
          />
        )}
        {error && !loading && <p>{error}</p>}
      </div>
    </div>
  );
};

export default BasketView;
