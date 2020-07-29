import React, { useState, Fragment } from "react";
import logo from "../assets/logo.png";
import gear from "../assets/settings.svg";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Tooltip,
  Container,
  Row,
  Col,
} from "shards-react";

import PropTypes from "prop-types";

import Signin from "./signin";
import Signup from "./signup";

import { connect } from "react-redux";
import { GetUserData } from "../redux/actions/userAction";

const NavbarApp = ({ user }) => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [collapseOpen, setCollapseOpne] = useState(false);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
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
    <Fragment>
      <Container>
        <Row>
          <Col>
            <img
              src={user.imageUrl}
              style={{ height: 30, width: 30, borderRadius: '50%' }}
              alt="User Image"
              id="userImage"
            />
          </Col>
          <Col>
            <img
              src={gear}
              style={{ height: 20, width: 20}}
              alt="settings"
            />
          </Col>
        </Row>
      </Container>
      <Tooltip open={open} target="#userImage" toggle={toggle}>
        It's {user.userName}
      </Tooltip>
    </Fragment>
  );

  return (
    <div>
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
