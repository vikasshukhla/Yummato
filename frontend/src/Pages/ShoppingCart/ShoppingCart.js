import React, { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShoppingCart.css";
import { toast } from "react-toastify";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { getUserData } from "../../utils/Auth";
import { useSearchParams } from "react-router-dom";

const ShoppingCart = () => {
  // const ctx = useContext(AuthContext);
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchParams] = useSearchParams();
  const cuisine = searchParams.get("cuisine");

  // const res= useMemo(() => location.state.cuisine === "All" ? "" : location.state.cuisine,[])
  let res = "";
  try {
    if (cuisine) {
      res = cuisine;
    } else {
      res = location.state.cuisine === "All" ? "" : location.state.cuisine;
    }
  } catch {
    res = "";
  }
  const [searchData, setSearchData] = useState(res);
  const [search, setSearch] = useState(searchData === "" ? false : true);
  const [result, setResult] = useState([]);

  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [productState, setProductState] = useState([]);

  const data = getUserData();
  useEffect(() => {
    async function fetchData() {
      //await axios.get(`http://localhost:3003/db`).then((res) => {
      await axios.get(`http://localhost:8000/api/v1/products`).then((res) => {
        //setProducts(res.data.products);
        setProducts(res.data);
        //setCoupons(res.data.coupons);
        setResult(
          res.data.filter(
            (product) =>
              product.name
                .toLowerCase()
                .startsWith(searchData.trim().toLowerCase()) ||
              product.cuisine
                .toLowerCase()
                .startsWith(searchData.trim().toLowerCase())
          )
        );
      });
      await axios.get(`http://localhost:8000/api/v1/coupons`).then((res) => {
        setCoupons(res.data);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/cart`, {
        headers: {
          "x-user-email": `${data?.email}`,
        },
      })
      .then((res) => {
        const newdata = res.data.cartItem.map((item) => ({
          cuisine: item.product.cuisine,
          image: item.product.image,
          name: item.product.name,
          price: item.product.price,
          id: item.product._id,
          quantity: item.quantity,
        }));
        setCartItems(newdata);
        setProductState(
          newdata.map((item) => {
            return item.id;
          })
        );
      });
  }, []);

  const navigate = useNavigate();

  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  const checkProductIdInCart = (productId) => {
    return productState.includes(productId);
  };

  const addToCart = (productId) => {
    axios.patch(
      `http://localhost:8000/api/v1/cart/${productId}`,
      {},
      {
        headers: {
          "x-user-email": `${data?.email}`,
        },
      }
    );
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    const existingItem = cartItems.find(
      (item) => item.id === selectedProduct.id
    );
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === selectedProduct.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...selectedProduct, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
      toast.info("New item added to the cart!", { toastId: 1 });
      setProductState((prevState) => [...prevState, productId]);
    }
  };

  const subQuantity = (key, newQuantity) => {
    const updatedCartItems = cartItems.map((item, index) => {
      if (index === key) {
        if (newQuantity === 0) {
          axios.delete(`http://localhost:8000/api/v1/cart/${item.id}`, {
            headers: {
              "x-user-email": `${data?.email}`,
            },
          });
          setProductState((prevState) =>
            prevState.filter((id) => id !== item.id)
          );
          return null; // Remove the item from the cart
        }
        axios.delete(`http://localhost:8000/api/v1/cart/${item.id}`, {
          headers: {
            "x-user-email": `${data?.email}`,
          },
        });
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems.filter((item) => item !== null));
    setCouponCode("");
    setAppliedCoupon("");
  };

  const addQuantity = (key, newQuantity) => {
    const updatedCartItems = cartItems.map((item, index) => {
      if (index === key) {
        axios.patch(
          `http://localhost:8000/api/v1/cart/${item.id}`,
          {},
          {
            headers: {
              "x-user-email": `${data?.email}`,
            },
          }
        );
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems.filter((item) => item !== null));
    setCouponCode("");
    setAppliedCoupon("");
  };

  useEffect(() => {
    // Calculate the total price whenever cart items or coupon code changes
    const calculateTotalPrice = () => {
      let totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // Apply coupon discount if a valid coupon code is applied
      if (appliedCoupon === "SALE10") {
        const discount = totalPrice * 0.1;
        totalPrice -= discount;
      }
      if (appliedCoupon === "SALE20") {
        const discount = totalPrice * 0.2;
        totalPrice -= discount;
      }
      if (appliedCoupon === "SALE30") {
        const discount = totalPrice * 0.3;
        totalPrice -= discount;
      }
      if (appliedCoupon === "SALE40") {
        const discount = totalPrice * 0.4;
        totalPrice -= discount;
      }
      if (appliedCoupon === "INDI50") {
        const discount = totalPrice * 0.5;
        totalPrice -= discount;
      }
      if (appliedCoupon === "RAKSHA50") {
        const discount = totalPrice * 0.5;
        totalPrice -= discount;
      }
      if (appliedCoupon === "DIWALI40") {
        const discount = totalPrice * 0.4;
        totalPrice -= discount;
      }
      setTotalPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [cartItems, appliedCoupon]);

  const applyCoupon = () => {
    if (appliedCoupon) {
      toast.error("Coupon code already applied");
    } else if (coupons.find((coupon) => coupon.code === couponCode)) {
      setAppliedCoupon(couponCode);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };
  // const removeCoupon = () => {
  //   setAppliedCoupon("");
  // };
  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal1 = () => {
    handleCheckout();
    setIsModalOpen(false);
  };
  const checkout = () => {
    openModal();
    closeCart();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
    } else {
      navigate("/ordersummary", { state: { cartItems, totalPrice } });
    }
  };

  return (
    <div className={`shoppingcontainer ${isCartOpen ? "active" : ""}`}>
      <header>
        <h1>Your Food Cart</h1>
        <div className="shopping" onClick={openCart}>
          <img src="image/shopping.svg" alt="Shopping Cart" />
          <span className="quantity">{cartItems?.length}</span>
        </div>
      </header>
      <input
        type="search"
        placeholder={"cuisine or name "}
        aria-label="Search"
        className="searchBar"
        value={searchData}
        onChange={(e) => {
          setSearchData(e.target.value);
          setSearch(true);
          let searchResult = products.filter(
            (product) =>
              product.name.toLowerCase().startsWith(searchData.toLowerCase()) ||
              product.cuisine.toLowerCase().startsWith(searchData.toLowerCase())
          );
          setResult(searchResult);
        }}
      />
      <div className="shoppinglist">
        {search === false || searchData === ""
          ? products.map((product, index) => (
              <div className="item" key={product.id}>
                <img
                  src={`image/${product.image}`}
                  alt={product.name}
                  height="120px"
                />
                <div className="title">{product.name}</div>
                <div className="price">{product.price.toLocaleString()}/-</div>
                <button
                  style={{
                    backgroundColor: checkProductIdInCart(product.id)
                      ? "#013220"
                      : "#1c1f25",
                  }}
                  disabled={checkProductIdInCart(product.id)}
                  onClick={() => addToCart(product.id)}
                >
                  {checkProductIdInCart(product.id)
                    ? "Added To Cart"
                    : "Add To Cart"}
                </button>
              </div>
            ))
          : result.map((product, index) => (
              <div className="item" key={product.id}>
                <img src={`image/${product.image}`} alt={product.name} />
                <div className="title">{product.name}</div>
                <div className="price">{product.price.toLocaleString()}/-</div>
                <button
                  style={{
                    backgroundColor: checkProductIdInCart(product.id)
                      ? "#013220"
                      : "#1c1f25",
                  }}
                  disabled={checkProductIdInCart(product.id)}
                  onClick={() => addToCart(product.id)}
                >
                  {checkProductIdInCart(product.id)
                    ? "Added To Cart"
                    : "Add To Cart"}
                </button>
              </div>
            ))}
      </div>
      <div className="shoppingcard">
        <div className="closeShopping" onClick={closeCart}>
          <img src="image/Close.png" alt="Shopping Cart" />
        </div>
        <h1>Cart</h1>
        <ul className="shoppinglistCard">
          {cartItems.length === 0 ? (
            <>{toast.info("Please add items to cart!", { toastId: 1 })}</>
          ) : (
            cartItems.map((item, index) => (
              <li key={index}>
                <div>
                  <img src={`image/${item.image}`} alt={item.name} />
                </div>
                <div>{item.name}</div>
                <div>{item.price.toLocaleString()}</div>
                <div>
                  <button onClick={() => subQuantity(index, item.quantity - 1)}>
                    -
                  </button>
                  <div className="count">{item.quantity}</div>
                  <button onClick={() => addQuantity(index, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="checkOut">
          <div className="total">{totalPrice.toLocaleString()}</div>

          <button
            className="checkoutButton"
            disabled={cartItems.length === 0}
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="OrderSummarymodal ">
          <div className="OrderSummarymodalContent">
            <div onClick={closeModal}>
              <img src="image/Close.png" alt="Shopping Cart" />
            </div>
            <h2>Order Details</h2>
            <p className="quantity">
              <b>Quantity</b>
            </p>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div>
                    <img src={`image/${item.image}`} alt={item.name} />
                  </div>
                  <div>{item.name} </div>
                  <div>{item.price.toLocaleString()} </div>
                  <div> {item.quantity}</div>
                </li>
              ))}
            </ul>
            <div className="modalActions">
              <div>Total Price: {totalPrice.toLocaleString()}</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={appliedCoupon}
                  style={{
                    padding: "8px",
                    border: "1px solid ",
                    borderRadius: "4px",
                    marginRight: "8px",
                    width: "200px",
                  }}
                />
                <button
                  onClick={applyCoupon}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: " none",
                    borderRadius: "4px",
                    marginTop: "10px",
                  }}
                >
                  Apply
                </button>
              </div>
              <button
                onClick={closeModal1}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ffa500",
                  color: "white",
                  border: " none",
                  borderRadius: "4px",
                  fontSize: "20px",
                }}
              >
                Confirm CheckOut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShoppingCart;
