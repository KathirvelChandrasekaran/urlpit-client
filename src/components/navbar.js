import React, { useState, Fragment } from "react";
import logo from "../assets/logo.png";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
} from "shards-react";

import PropTypes from "prop-types";

import Signin from "./signin";
import Signup from "./signup";

import { connect } from "react-redux";
import { GetUserData } from "../redux/actions/userAction";

const NavbarApp = ({ user, image }) => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [collapseOpen, setCollapseOpne] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };

  const toggleNavbar = () => {
    setCollapseOpne(!collapseOpen);
  };

  const profileFragment = !user.authenticated ? (
    <Fragment>
      <NavItem>
        <Signin></Signin>
      </NavItem>
      <NavItem>
        <Signup></Signup>
      </NavItem>
    </Fragment>
  ) : (
    <Fragment>{/* <img src={image} alt="User Image" /> */}</Fragment>
  );

  return (
    <div>
      {console.log(user)}

      <Navbar type="dark" theme="dark" expand="md">
        <NavbarBrand>
          <img
            src={logo}
            alt="Logo"
            style={{ height: 30, marginLeft: 50 }}
          ></img>
        </NavbarBrand>
        <NavbarBrand>URL Pit</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse open={collapseOpen} navbar>
          <Nav navbar className="ml-auto">
            {profileFragment}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavbarApp.propTypes = {
  GetuserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { GetUserData })(NavbarApp);
