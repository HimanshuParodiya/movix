import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // we are creating SPA so when we go to next page page doesnot load so scroll position remaine same but we want whenever page location change we want scroll to top so thats why we are doing this
    window.scrollTo(0, 0);
  }, [location]);
  const controlNavBar = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        // when we scrolling downwords
        setShow("hide");
      } else {
        // when we scrolling upwords
        setShow("show");
      }
    } else {
      setShow("top");

      // this show hide is not working 2:48
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`); // navigating to search Result section
      setTimeout(() => {
        setShowSearch(false);
        setQuery("");
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header
      className={`header__container ${
        mobileMenu ? "header__mobileView" : ""
      } ${show}`}
    >
      <ContentWrapper>
        <div
          className="header__logo"
          onClick={() => {
            navigate("/");
            setMobileMenu(false);
          }}
        >
          <img src={logo} alt="App Logo" />
        </div>
        <ul className="header__menuItems">
          <li
            className="header__menuItem"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="header__menuItem"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            TV Shows
          </li>
          <li className="header__menuItem">
            <HiOutlineSearch />
          </li>
        </ul>
        <div className="header__mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="header__searchBar">
          <ContentWrapper>
            <div className="header__searchInput">
              <input
                value={query}
                type="text"
                placeholder="Search for a movie or tv show...."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                  setQuery("");
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
