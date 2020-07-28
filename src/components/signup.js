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

const Signup = () => {
  const [openSignup, setopenSignup] = useState(false);

  const toggleButtonSignup = () => {
    setopenSignup(!openSignup);
  };

  return (
    <Fragment>
      <NavLink
        style={{ cursor: "context-menu", marginRight: 50 }}
        onClick={toggleButtonSignup}
      >
        Signup
      </NavLink>
      <Modal open={openSignup} toggle={toggleButtonSignup}>
        <ModalHeader>Signin</ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          Welcome 😃 Signup to continue
        </ModalBody>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="#username">Username</label>
              <FormInput id="#username" placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#email">Email</label>
              <FormInput type="email" id="#email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Password</label>
              <FormInput
                type="password"
                id="#password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#confirmPassword">Confirm Password</label>
              <FormInput
                type="password"
                id="#password"
                placeholder="Confirm Password"
              />
            </FormGroup>
            <FormGroup style={{ textAlign: "center" }}>
              <Button type="button" pill theme="success">
                Signup
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Signup;
