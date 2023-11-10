import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormCheck, Container, Button, Modal, Form } from "react-bootstrap";
import { getUserData } from "../utils/Auth";
import axios from "axios";
import Stepper from "../Components/stepper/Stepper";

import "./OrderSummary.css";

const OrderSummary = () => {
  const location = useLocation();
  const { email } = getUserData();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems;
  const totalPrice = location.state?.totalPrice;
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Food Item", "Address", "Payment"];

  const [savedAddresses, setSavedAddresses] = useState([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    if (cartItems === undefined) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/profile/${email}`)
      .then((res) => {
        if (res.data) setSavedAddresses([...savedAddresses, res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCheckoutClick = (event) => {
    // Combine form data and cart items with total price
    const orderData = {
      cartItems,
      totalPrice,
      formData,
    };

    const Address = savedAddresses.find(
      (address) => address._id === selectedAddress
    );
    orderData.formData = {
      firstName: Address?.firstName,
      lastName: Address?.lastName,
      address: Address?.address,
      city: Address?.city,
      state: Address?.state,
    };

    const date = new Date().toISOString().slice(0, 10);
    storeOrderHistory(date, orderData);
  };

  const storeOrderHistory = async (date, orderData) => {
    const orderEntry = {
      date,
      orderData,
      emailId: email,
    };
    await axios
      .post("http://localhost:8000/api/v1/order", orderEntry)
      .then((res) => {
        setId(res?.data?._id);
        navigate(`/orderhistory/${res?.data?._id}`);
        toast.success("Order Placed successfully!");
      });
  };

  const handleAddAddressClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmitAddress = () => {
    addressData._id = id;
    setSavedAddresses([...savedAddresses, addressData]);
    setSelectedAddress(addressData._id);
    setShowProfileModal(false);
    setId((prev) => prev + 1);
  };

  return (
    <>
      <div className="order-summary">
        <h1>Order Summary</h1>
        <div className="Stepper-container">
          <Stepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          {activeStep === 0 && (
            <div className="step-content">
              <h2>Food Items</h2>
              {/* Your Food Item Form */}
              <>
                <div className="order-items">
                  {cartItems?.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={`image/${item.image}`} alt="{item.name}" />
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="totalprice">
                  <p>
                    <h4>Total Price: {totalPrice}</h4>
                  </p>
                </div>
              </>
            </div>
          )}
          {activeStep === 1 && (
            <div className="step-content">
              <h2>Address</h2>
              <button
                className="float-end mb-3"
                onClick={handleAddAddressClick}
              >
                Add Address
              </button>
              {/* Your Address Form */}
              {savedAddresses &&
                savedAddresses?.map((address) => {
                  return (
                    <div className="d-flex gap-3" key={address._id}>
                      <input
                        type="radio"
                        id={`radio${address._id}`}
                        name="address"
                        value={address._id}
                        checked={selectedAddress === address._id}
                        onChange={() => {
                          setSelectedAddress(address._id);
                        }}
                      />
                      <label
                        htmlFor={`radio${address._id}`}
                        className="address"
                      >
                        <h1>
                          {address.firstName} {address.lastName}
                        </h1>
                        <p>{address.address}</p>
                        <p>
                          {address.city}, {address.state}
                        </p>
                      </label>
                    </div>
                  );
                })}
            </div>
          )}
          {activeStep === 2 && (
            <div className="step-content">
              <h2>Payment</h2>
              {/* Your Payment Form */}
              <div>
                <div className="font-weight-bol mb-3">
                  Choose Payment Option
                </div>
                <div key={`default-radio`} className="mb-3">
                  <FormCheck
                    checked
                    label="Cash On Delivery"
                    name="group1"
                    type="radio"
                    id={`radio 1`}
                    className="custom-radio"
                  />
                  <FormCheck
                    disabled
                    label="Credit/Debit Card"
                    name="group1"
                    type="radio"
                    id={`radio 2`}
                    className="custom-radio"
                  />
                  <FormCheck
                    disabled
                    label="UPI (Google pay/Phone pay/Paytm)"
                    type="radio"
                    id={`radio 3`}
                    className="custom-radio"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="buttons">
            {activeStep > 0 && (
              <button onClick={() => setActiveStep(activeStep - 1)}>
                Previous
              </button>
            )}
            {activeStep < steps.length - 1 && (
              <button
                onClick={() => {
                  if (activeStep !== 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    if (selectedAddress !== "") {
                      setActiveStep(activeStep + 1);
                    } else {
                      toast.warning("Please select address");
                    }
                  }
                }}
              >
                Next
              </button>
            )}
            {activeStep === steps.length - 1 && (
              <button onClick={handleCheckoutClick}>Confirm Checkout</button>
            )}
          </div>
        </div>
      </div>
      <Container>
        <Modal show={showProfileModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={addressData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={addressData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={addressData.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={addressData.state}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitAddress}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default OrderSummary;
