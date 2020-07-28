import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
const Header = ({ currentUser, hidden }) => {
  function handleChange() {
    const header = document.querySelector(".header");
    const logoContainer = document.querySelector(".logo-container");
    const menuBtn = document.querySelector(".menu-btn");
    const options = document.querySelector(".options");
    const html = document.querySelector("html");
    const menuBtnBurger = document.querySelector(".menu-btn__burger");
    header.classList.toggle("active");
    logoContainer.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.classList.toggle("open");
    options.classList.toggle("active");
    menuBtnBurger.classList.toggle("active");
    html.classList.toggle("noscroll");
  }

  function handleLinkClickInsideHamburgerMenu() {
    const header = document.querySelector(".header");
    const logoContainer = document.querySelector(".logo-container");
    const menuBtn = document.querySelector(".menu-btn");
    const options = document.querySelector(".options");
    const html = document.querySelector("html");
    const menuBtnBurger = document.querySelector(".menu-btn__burger");
    if (header.classList.contains("active")) {
      header.classList.remove("active");
    }
    if (logoContainer.classList.contains("active")) {
      logoContainer.classList.remove("active");
    }
    if (menuBtn.classList.contains("open")) {
      menuBtn.classList.remove("open");
    }
    if (menuBtn.classList.contains("active")) {
      menuBtn.classList.remove("open");
    }
    if (options.classList.contains("active")) {
      options.classList.remove("active");
    }
    if (menuBtnBurger.classList.contains("active")) {
      menuBtnBurger.classList.remove("active");
    }
    if (html.classList.contains("active")) {
      html.classList.remove("noscroll");
    }
  }

  return (
    <div className="header wrapper">
      <figure>
        <h1>
          <Link className="logo-container" to="/">
            <Logo className="logo" />
          </Link>
        </h1>
      </figure>
      <div className="menu-btn" onClick={handleChange}>
        <div className="menu-btn__burger"></div>
      </div>
      <div className="options">
        <Link
          className="option"
          onClick={handleLinkClickInsideHamburgerMenu}
          to="/shop"
        >
          SHOP
        </Link>
        <Link
          className="option"
          onClick={handleLinkClickInsideHamburgerMenu}
          to="/contact"
        >
          CONTACT
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
              handleLinkClickInsideHamburgerMenu();
            }}
          >
            SIGN OUT
          </div>
        ) : (
          <Link
            className="option"
            to="/signin"
            onClick={handleLinkClickInsideHamburgerMenu}
          >
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropDown />}
      {/* {!hidden && <CartDropDown /> } */}
    </div>
  );
};

// This state in argument is the root reducer
// state.user.currentUser means state.root-reducer. => which gives us =>userReducer.currentUser
// before destructuring in below statement it was state now we de structured it  these values compare with root-reducer
const mapStateToProp = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProp)(Header);
