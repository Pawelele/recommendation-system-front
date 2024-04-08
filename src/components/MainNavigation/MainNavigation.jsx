import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import BasketContext from '../../context/BasketContext';

const MainNavigation = () => {
  const ctx = useContext(BasketContext);

  return (
    <header className={classes.wrapper}>
      <Link to="/"><div className={classes.logo}><h1 className={classes.title}>Super Shop</h1></div></Link>
      <nav className={classes.mainNav}>
        <ul>
          <li>
            <NavLink to="/">
              <button className={classes.button}>Main Page</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <button className={classes.button}>Products</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/basket">
              <button className={classes.button}>Basket {ctx.products.length}</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;