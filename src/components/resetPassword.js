import React, { Fragment, useState } from "react";
import {
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

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { resetPassword } from "../redux/actions/userAction";

const ResetPassword = ({ resetPassword, UI }) => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
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
  return (
    <Fragment>
      <span id="reset" onClick={toggle}>
        Reset Password
      </span>
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
                Reset
              </Button>
            </FormGroup>
          </Form>
          {UI.error ? (
            <div className="d-flex justify-content-center">
              <span
                style={{ margin: "10px", color: "red", textAlign: "center" }}
              >
                {UI.error.message}
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
    </Fragment>
  );
};

ResetPassword.propTypes = {
  UI: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
