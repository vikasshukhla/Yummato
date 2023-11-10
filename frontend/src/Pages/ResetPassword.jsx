import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const params = useParams();
  const token = params.token;
  const navigate=useNavigate();

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    // Here, you would make an API call to reset the password with 'password' and 'confirmPassword' values.
    // You can use Axios, Fetch, or any other library for making the API call.
    // In this example, we'll just display a success message.
    axios
      .patch(`http://localhost:8000/api/v1/reset-password`, {
        newPass: password,
        resetLink: token,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        navigate('/login')
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        
      });
  };

  return (
    <div className="container min-vh-100">
      <div className="password-reset-form">
        <Form>
          <h2>Reset Password</h2>
          {message && <Alert variant="success">{message}</Alert>}
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleResetPassword}
            disabled={password !== confirmPassword || password.length < 8}
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
