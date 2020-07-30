import React, { useState, Fragment } from "react";
import {
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormInput,
  FormGroup,
  Button,
} from "shards-react";


import { useFormik } from "formik";
import * as yup from "yup";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

const Signin = ({ loginUser, loading, UI }) => {
  const [openSignin, setopenSignin] = useState(false);

  const toggleButtonSignin = () => {
    setopenSignin(!openSignin);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string(0)
        .email()
        .required("Email is required")
        .strict()
        .trim(),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum of 6 length"),
    }),
    onSubmit: (useInputdata) => {
      loginUser(useInputdata);
    },
  });

  return (
    <Fragment>
      <NavLink style={{ marginRight: 30 }} onClick={toggleButtonSignin}>
        Signin
      </NavLink>
      <Modal open={openSignin} toggle={toggleButtonSignin}>
        <ModalHeader>Signin</ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <span>👋</span> Hello there! Sign in to continue
        </ModalBody>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <label htmlFor="username">Email</label>
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
            <FormGroup>
              <label htmlFor="password">Password</label>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <span style={{ margin: "10px", color: "red" }}>
                  {formik.errors.password}
                </span>
              ) : null}
            </FormGroup>
            <FormGroup style={{ textAlign: "center" }}>
              <Button pill theme="success">
                Signin
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

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.UI.loading,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(Signin);
