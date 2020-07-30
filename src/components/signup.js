import React, { useState, Fragment } from "react";
import {
  NavLink,
  Modal,
  ModalBody,
  Form,
  FormInput,
  FormGroup,
  Button,
  FormRadio,
} from "shards-react";

import { useFormik } from "formik";
import * as yup from "yup";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userAction";

import PropTypes from "prop-types";

const Signup = ({ signupUser, loading, UI }) => {
  const [openSignup, setopenSignup] = useState(false);

  const toggleButtonSignup = () => {
    setopenSignup(!openSignup);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .strict()
        .trim()
        .required("Name is required")
        .max(15, "Maximum 15 character is required")
        .min(5, "Minimum 5 character required"),
      email: yup
        .string(0)
        .email()
        .required("Email is required")
        .strict()
        .trim(),
      gender: yup.string().required("Must select one"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum of 6 length"),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .min(6, "Minimum of 6 length")
        .oneOf([yup.ref("password"), null], "Both must be same"),
    }),
    onSubmit: (useInputData) => {
      signupUser(useInputData);
    },
  });

  return (
    <Fragment>
      <NavLink
        style={{ cursor: "context-menu", marginRight: 50 }}
        onClick={toggleButtonSignup}
      >
        Signup
      </NavLink>
      <Modal open={openSignup} toggle={toggleButtonSignup}>
        <ModalBody style={{ height: "90%", textAlign: "center" }}>
          Welcome 😃 Signup to continue
        </ModalBody>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <label htmlFor="#username">Username</label>
              <FormInput
                id="#username"
                name="userName"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
              {formik.errors.userName ? (
                <span style={{ margin: "10px", color: "red" }}>
                  {formik.errors.userName}
                </span>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="#email">Email</label>
              <FormInput
                type="email"
                id="#email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <span style={{ margin: "10px", color: "red" }}>
                  {formik.errors.email}
                </span>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="#gender">Gender</label>
              <div>
                <FormRadio
                  inline
                  id="male"
                  type="radio"
                  value="male"
                  name="gender"
                  onChange={formik.handleChange}
                >
                  Male
                </FormRadio>
                <FormRadio
                  inline
                  id="female"
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={formik.handleChange}
                >
                  Female
                </FormRadio>
                <FormRadio
                  inline
                  id="other"
                  type="radio"
                  value="other"
                  name="gender"
                  onChange={formik.handleChange}
                >
                  Other
                </FormRadio>
              </div>
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Password</label>
              <FormInput
                type="password"
                id="#password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <span style={{ margin: "10px", color: "red" }}>
                  {formik.errors.password}
                </span>
              ) : null}
            </FormGroup>
            <FormGroup>
              <label htmlFor="#confirmPassword">Confirm Password</label>
              <FormInput
                type="password"
                id="#confirmpassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword ? (
                <span style={{ margin: "10px", color: "red" }}>
                  {formik.errors.confirmPassword}
                </span>
              ) : null}
            </FormGroup>
            <FormGroup style={{ textAlign: "center" }}>
              <Button pill theme="success">
                Signup
              </Button>
            </FormGroup>
            {UI.error ? (
              <div className="d-flex justify-content-center">
                <span
                  style={{ margin: "10px", color: "red", textAlign: "center" }}
                >
                  {UI.error.emailError || UI.error.errors}
                </span>
              </div>
            ) : (
              ""
            )}
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.UI.loading,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);
