import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./OrderHistory.css";
import axios from "axios";
import { getUserData } from "../utils/Auth";
const OrderHistory = ({ id }) => {
  const location = useLocation();
  const { email } = getUserData();
  // const { date } = useParams();
  // const { orderData } = location.state || {};
  const [orderhistory, setOrderHistory] = useState([]);
  useEffect(() => {
    fetchOrderHistory();
  }, []);
  const user_id = sessionStorage.getItem("username");
  const fetchOrderHistory = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/order?emailId=${email}`
    );
    setOrderHistory(res.data);
  };
  return (
    <div>
      <h1 className="order-history-heading">Previous Orders </h1>
      {orderhistory.length === 0 ? (
        <p style={{ textAlign: "center" }}>No previous orders</p>
      ) : (
        <>
          {orderhistory.map((order, index) => (
            <div className="order-history">
              <h3 key={index}>Date : {order.date}</h3>
              <div className="order-details">
                <ul className="cart-items">
                  <h2 className="sub-heading"> Items</h2>
                  {order.orderData.cartItems.map((item, index) => (
                    <p key={index}>
                      {item.name} : {item.quantity}
                    </p>
                  ))}
                  <h2 className="sub-heading">
                    Total Price : {order.orderData.totalPrice}
                  </h2>
                </ul>

                <div className="form-data">
                  <h2 className="sub-heading">Address</h2>
                  <p>First Name: {order.orderData.formData.firstName}</p>
                  <p>Last Name: {order.orderData.formData.lastName}</p>
                  <p>Address: {order.orderData.formData.address}</p>
                  <p>City: {order.orderData.formData.city}</p>
                  <p>State: {order.orderData.formData.state}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default OrderHistory;
