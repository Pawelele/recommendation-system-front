import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import BasketContext from "../../context/BasketContext";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Badge from "@mui/material/Badge";

const MainNavigation = () => {
  const ctx = useContext(BasketContext);

  return (
    <header className={classes.wrapper}>
      <Link to="/">
        <div className={classes.logo}>
          <img
            src={"static/logo2.png"}
            className={classes.productImg}
            alt={"logo"}
          />
        </div>
      </Link>
      <nav className={classes.mainNav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <HomeIcon fontSize="large" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <InventoryIcon fontSize="large" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/basket"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <Badge
                sx={{
                  "& .MuiBadge-badge": { background: "#FAC296" },
                }}
                badgeContent={ctx.products.length}
                color="info"
              >
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <UploadFileIcon fontSize="large" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
