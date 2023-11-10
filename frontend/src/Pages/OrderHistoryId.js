import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderHistory.css";
import axios from "axios";
import { Modal, Button, Image } from "react-bootstrap";
const OrderHistoryId = () => {
  const { id } = useParams();
  const [orderhistory, setOrderHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/order/${id}`);
    setOrderHistory(res.data);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div>
        <h1 className="order-history-heading"> Order Summary </h1>
        <div className="order-history">
          <h3>Date : {orderhistory?.date}</h3>
          <div className="order-details">
            <ul className="cart-items">
              <h2 className="sub-heading"> Items</h2>
              {orderhistory?.orderData?.cartItems.map((item) => (
                <p>
                  {item.name} : {item.quantity}
                </p>
              ))}
              <h2 className="sub-heading">
                Total Price : {orderhistory?.orderData?.totalPrice}
              </h2>
            </ul>

            <div className="form-data">
              <h2 className="sub-heading">Address</h2>
              <p>First Name: {orderhistory?.orderData?.formData?.firstName}</p>
              <p>Last Name: {orderhistory?.orderData?.formData?.lastName}</p>
              <p>Address: {orderhistory?.orderData?.formData?.address}</p>
              <p>City: {orderhistory?.orderData?.formData?.city}</p>
              <p>State: {orderhistory?.orderData?.formData?.state}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showPopup} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="d-flex justify-content-center text-underline text-success"><u>Congratulation </u>🎉🎉</div>
          <div className="mt-3">
            We are Preparing your order.It will delivered in 30 mins.
          </div>{" "}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            ok
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default OrderHistoryId;
