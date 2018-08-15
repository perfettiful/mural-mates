import React from "react";
import { Image, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuTabs = () => (
  <ul className="nav nav-tabs">
   <Dropdown.Menu>
              <Dropdown.Item>
                {/* {" "}
                {this.state.loggedIn ? (
                  <div>
                    <h3>Welcome Back, {this.state.profile.given_name}</h3>
                    <Image
                      src={this.state.profile.picture}
                      alt="profile"
                      avatar
                    />
                  </div>
                ) : (
                  <div>
                    <h4></h4>{" "}
                    <h4></h4>
                  </div>
                )} */}
              </Dropdown.Item>
            </Dropdown.Menu>
    <li className="nav-item">
      <Link
        to="/"
        className={
          window.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/about"
        className={
          window.location.pathname === "/about" ? "nav-link active" : "nav-link"
        }
      >
        About
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/blog"
        className={
          window.location.pathname === "/blog" ? "nav-link active" : "nav-link"
        }
      >
        Blog
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/contact"
        className={
          window.location.pathname === "/contact" ? "nav-link active" : "nav-link"
        }
      >
        Contact
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/contact/learn"
        className={
          window.location.pathname === "/contact/learn" ? "nav-link active" : "nav-link"
        }
      >
        Learn
      </Link>
    </li>
  </ul>
);

export default MenuTabs;
