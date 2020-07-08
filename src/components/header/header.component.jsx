import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  const header = document.querySelector(".header");
  const logoContainer = document.querySelector(".logo-container");
  const menuBtn = document.querySelector(".menu-btn");
  const options = document.querySelector(".options");
  const html = document.querySelector("html");
  const menuBtnBurger = document.querySelector(".menu-btn__burger");
  function handleChange() {
    header.classList.toggle("active");
    logoContainer.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.classList.toggle("open");
    options.classList.toggle("active");
    menuBtnBurger.classList.toggle("active");
    html.classList.toggle("noscroll");
  }

  function handleLinkClickInsideHamburgerMenu() {
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
            <Logo className="logo"/>
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
            }}>SIGN OUT</div>
        ) : (
          <Link
            className="option"
            to="/signin"
            onClick={handleLinkClickInsideHamburgerMenu}
          >SIGN IN</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
