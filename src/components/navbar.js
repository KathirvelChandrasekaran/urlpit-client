import React, { useState, Fragment } from "react";
import logo from "../assets/logo.png";
import gear from "../assets/settings.svg";
import {
  Navbar,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Tooltip,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";

import { useFormik } from "formik";
import * as yup from "yup";

import { Avatar } from "antd";

import PropTypes from "prop-types";

import Signin from "./signin";
import Signup from "./signup";

import { connect } from "react-redux";
import { resetPassword } from "../redux/actions/userAction";

const NavbarApp = ({ user, resetPassword, UI, message }) => {
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

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string(0)
        .email()
        .required("Email is required")
        .strict()
        .trim(),
    }),
    onSubmit: (useInputData) => {
      resetPassword(useInputData);
    },
  });

  const profileFragment = !user.authenticated ? (
    <Fragment>
      <NavLink id="reset" onClick={toggle} style={{ marginRight: 30 }}>
        Recover Account
      </NavLink>
      <Modal open={open} toggle={toggle}>
        <ModalHeader>Reset your password</ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormInput
                type="email"
                name="email"
                id="Email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <span style={{ margin: "10px", color: "red" }}>
                  {formik.errors.email}
                </span>
              ) : null}
            </FormGroup>
            <FormGroup style={{ textAlign: "center" }}>
              <Button pill theme="success">
                Recover
              </Button>
            </FormGroup>
          </Form>
          {UI.error ? (
            <div className="d-flex justify-content-center">
              <span
                style={{ margin: "10px", color: "red", textAlign: "center" }}
              >
                {UI.error.emailError || (
                  <span style={{ color: "#29c474" }}>{UI.error} </span>
                )}
              </span>
            </div>
          ) : (
            ""
          )}
          {UI.loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </ModalBody>
      </Modal>
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
            <Avatar size="large" id="userImage" src={user.imageUrl} />
          </Col>
          <Col>
            <img
              src={gear}
              style={{ marginTop: 10, height: 20, width: 20 }}
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
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  message: state.UI.message,
});

export default connect(mapStateToProps, { resetPassword })(NavbarApp);
