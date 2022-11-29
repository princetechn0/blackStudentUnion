import React, { Component, useEffect, useState } from "react";
import "../stylesheets/login.css";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { auth, logInWithEmailAndPassword } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const [user, loading, error] = useAuthState(auth);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (user) navigate("/login");
  }, [user, loading]);

  const validateInputs = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("failed");
      event.preventDefault();
      event.stopPropagation();
    } else {
      const eventDetails = {
        email: event.target[0].value,
        password: event.target[1].value,
      };
      onSubmit(eventDetails);
    }

    setValidated(true);
  };

  const onSubmit = (event) => {
    console.log("running");
    logInWithEmailAndPassword(event.email, event.password);
    formRef.current.reset();
  };
  return (
    <div className="container mt-5" style={{ width: "400px" }}>
      <h1 className="text-center"> Login</h1>

      <Form
        className="pt-2"
        noValidate
        validated={validated}
        onSubmit={validateInputs}
        ref={formRef}
      >
        <Form.Group controlId="validationCustom01">
          <Form.Label>UCI email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="peter@uci.edu"
            {...register("email", { required: "Enter uci email" })}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="Password"
            placeholder="Password"
            {...register("password", { required: "Enter password" })}
          />
        </Form.Group>
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </Form>

      <div className="text-center pt-5">
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
};

export default Login;
