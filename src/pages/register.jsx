import React, { Component, useEffect, useState } from "react";
import "../stylesheets/register.css";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { auth, registerWithEmailAndPassword } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const email_re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const register = () => {
    console.log(email, password);
    if (!email.includes("@uci.edu") || !email.toLowerCase().match(email_re)) {
      alert("Please enter UCI email");
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (user) navigate("/login");
  }, [user, loading]);

  return (
    <div className="container mt-5" style={{ width: "400px" }}>
      <h1 className="text-center">Register</h1>
      <div className="register">
        <div className="register__container">
          <input
            id="email"
            type="email"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="peter@uci.edu"
            pattern=".+@uci\.edu"
            required
          />
          <input
            id="password"
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={register} className="register__btn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
