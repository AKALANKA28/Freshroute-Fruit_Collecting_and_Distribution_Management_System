import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "./navbar.css";
import { getCart } from "../../features/user/userSlice";
const Navbar2 = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [initialScroll, setInitialScroll] = useState(true);
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);

      if (initialScroll && scrollTop > 0) {
        setInitialScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialScroll]);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Check if user is logged in based on the token stored in localStorage
  const isUserLoggedIn = localStorage.getItem("token");


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="product-header">
      <nav className="nav">
        <div className="nav-logo">
          <a href="/">FreshRoute.</a>
        </div>
        <ul className="nav-menu">
          <li className="nav-list">
            <a href="/">Home</a>
          </li>
          <li className="nav-list">
            <a href="/about">About</a>
          </li>
          <li className="nav-list">
            <a href="/shop">Shop</a>
          </li>
          <li className="nav-list">
            <a href="/contact">Contact</a>
          </li>
          <li >
            {isUserLoggedIn ? (
              <div>
              <Link to="">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar
                    alt={authState?.user?.name}
                    src="/static/images/avatar/1.jpg"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Link>
              <Link to="/cart">
              <Badge className="cart-badge"
                  badgeContent={cartState?.length ? cartState?.length : 0}
                >
                  <i className="fa fa-shopping-cart shopping-cart-icon"></i>
                </Badge>
              </Link>
              {/* <button onClick={handleLogout} className='nav-login'>Logout</button> */}
            </div>
            ) : (
              <button onClick={handleLogIn} className="nav-login">
                Log In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar2;
