import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../Components/Pagination/Pagination";
import Cousines from "./Cousines";
import axios from "axios";
import Shimmer from "./Shimmer";
import "../Pages/Restaurant.css";
import { getUserData, isUserAdmin } from "../utils/Auth";

function Restaurant() {
  const user_id = sessionStorage.getItem("username");
  const isAdmin = isUserAdmin();
  const [RestaurantCard, setRestaurantCard] = useState([]);
  const [location1, setLocation1] = useState("");
  const [query, setQuery] = useState("");
  const [name, namechange] = useState("");
  const [location, addresschange] = useState("");
  const [email, emailchange] = useState("");
  const [rating, ratingchange] = useState("");
  const [offers, changeoffers] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/restaurant`).then((res) => {
      setRestaurantCard(res.data);
    });
  }, []);

  const images = {
    location: "image/place.jpg",
  };

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Name";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (location === null || location === "") {
      isproceed = false;
      errormessage += " address";
    }
    if (rating === null || rating === "") {
      isproceed = false;
      errormessage += " Rating";
    }
    if (offers === null || offers === "") {
      isproceed = false;
      errormessage += " offers";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const empdata = { name, location, email, rating, images, offers };
    if (IsValidate()) {
      axios
        .post(`http://localhost:8000/api/v1/restaurant`, empdata)
        .then((res) => {
          toast.success("Saved successfully.");
        })
        .catch((err) => {
          toast.error("Failed:" + err.message);
        });
      navigate("/restaurant");
    }
  };

  return (
    <div>
      <div className="container row-12 covercard">
        <div className="col-12">
          <div className="d-flex justify-content-start">
            <div className="col-5">
              <select
                onChange={(event) => {
                  setLocation1(event.target.value);
                }}
                className="searchBar "
              >
                <option defaultValue>Filter By Location</option>

                <option value="mumbai">Mumbai</option>
                <option value="noida">Noida</option>
                <option value="gurgoan">Gurgoan</option>
                <option value="bangalore">Banglore</option>
              </select>
            </div>
            <div className="col-55 gap-3">
              <input
                type="search"
                placeholder="Restaurant name ..."
                className="searchBar  "
                onChange={(event) => setQuery(event.target.value)}
              ></input>
              <div className="col-555 gap-3">
                <button
                  className="offers-Restaurant primary padding-2"
                  onClick={() => {
                    const RestaurantCards = RestaurantCard.filter(
                      (res) => res.offers > 30
                    );
                    setRestaurantCard(RestaurantCards);
                  }}
                >
                  offers% Restaurant
                </button>
                <button
                  className="All-Restaurant"
                  onClick={() => {
                    const res = RestaurantCard;
                    axios
                      .get(`http://localhost:8000/api/v1/restaurant`)
                      .then((res) => {
                        setRestaurantCard(res.data);
                      });
                  }}
                >
                  All Restaurant
                </button>
              </div>
            </div>
          </div>
          {isAdmin ? (
            <Link
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addRestaurant"
            >
              <button className="btn button-89">Add Restaurant </button>
            </Link>
          ) : null}

          <div className="row cards">
            {RestaurantCard.length === 0
              ? ((
                  <div>
                    Currently don't have any Restaurant try again later !
                  </div>
                ),
                (<Shimmer />))
              : RestaurantCard.filter((RestaurantCard) => {
                  if (query === "" && location1 === "Filter By Location") {
                    //if query is empty
                    return RestaurantCard.name;
                  } else if (
                    RestaurantCard.name
                      .toLowerCase()
                      .includes(query.toLowerCase()) &&
                    (RestaurantCard.location
                      .toLowerCase()
                      .includes(location1.toLowerCase()) ||
                      location1 === "Filter By Location")
                  ) {
                    //returns filtered array
                    return RestaurantCard.name;
                  }
                }).map((restaurant, index) => (
                  <div className="col">
                    <div className="card" style={{ width: 17 + "rem" }}>
                      <button
                        type="button"
                        className="btn "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <img
                          src={restaurant.images.location}
                          className="cardimage card-img-top"
                          alt="restro_image"
                        />
                        <div className="card-body">
                          <p className="card-text fw-bolder">
                            {restaurant.name}{" "}
                            <span className="right-text">
                              {restaurant.rating}
                            </span>
                            <div className="offers-text">
                              {restaurant.offers > 0
                                ? restaurant.offers + "%Off"
                                : ""}
                            </div>
                          </p>
                        </div>
                      </button>
                      <Cousines />
                    </div>
                  </div>
                ))}
            {query !== "" &&
              RestaurantCard.length > 0 &&
              RestaurantCard.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(query.toLowerCase())
              ).length === 0 && (
                <>Currently, we don't have this Restaurant. Try again later!</>
              )}
          </div>
        </div>
      </div>

      {/* <Pagination /> */}
      <div
        className="modal fade "
        id="addRestaurant"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Restaurant
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        value={name}
                        onChange={(e) => namechange(e.target.value)}
                        type="text"
                        id="name"
                        placeholder="Restaurant Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    value={location}
                    onChange={(e) => addresschange(e.target.value)}
                    type="text"
                    id="location"
                    placeholder="Location"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    value={rating}
                    onChange={(e) => ratingchange(e.target.value)}
                    type="number"
                    id="rating"
                    placeholder="Ratings"
                    className="form-control"
                  />
                  <input
                    value={offers}
                    onChange={(e) => changeoffers(e.target.value)}
                    type="number"
                    id="offers"
                    placeholder="offers"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-primary" data-bs-dismiss="modal">
                  Save changes
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
