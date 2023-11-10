import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { getUserData } from "../utils/Auth";
import { toast } from "react-toastify";

const UserProfile = ({
  showProfileModal,
  setShowProfileModal,
  isEditing,
  setIsEditing,
}) => {
  const [userData, setUserData] = useState({});
  //   const [isEditing, setIsEditing] = useState(false);
  const [isProfileCreate, setIsProfileCreated] = useState(false);

  const { email } = getUserData();

  // Fetch user data from the API
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/profile/${email}`)
      .then((res) => {
        if (res?.data) {
          setUserData(res.data);
          setIsProfileCreated(true);
          setIsEditing(false);
        } else {
          setUserData({
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            gender: "",
            dob: "",
            phone: "",
            address: "",
            email: email,
          });
          setIsProfileCreated(false);
          setIsEditing(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setShowProfileModal(true);
  };

  const handleSaveClick = () => {
    axios
      .patch(`http://localhost:8000/api/v1/profile/${email}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        dob: userData.dob,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        email: userData.email,
      })
      .then((res) => {
        toast.success(`Profile Edited Successfully !`);
      })
      .catch((err) => {
        toast.error(`Failed To Edit Profile!`);
      });
    setShowProfileModal(false);
    setIsEditing(false);
  };

  const handleSubmitClick = () => {
    axios
      .post("http://localhost:8000/api/v1/profile", userData)
      .then((res) => {
        toast.success(`Profile Created Successfully !`);
      })
      .catch((err) => {
        toast.error(`Failed To Create Profile!`);
      });
    setShowProfileModal(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setIsEditing(false);
  };

  return (
    <Container>
      <Modal show={showProfileModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userData.firstName}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userData.lastName}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={userData.gender}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={userData.dob}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={userData.phone}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userData.address}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={userData.city}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={userData.state}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!isProfileCreate ? (
            <Button variant="primary" onClick={handleSubmitClick}>
              Submit
            </Button>
          ) : !isEditing ? (
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
          ) : (
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
