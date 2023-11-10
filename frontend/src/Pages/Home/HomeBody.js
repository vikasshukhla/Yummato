import { useEffect, useState } from "react";
import axios from "axios";
import Cousines from "../Cousines";
import Shimmer from "../Shimmer";

function HomeBody() {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/restaurant`).then((res) => {
      setRestaurantData(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        {restaurantData.length === 0 ? (
          <div className="col">
            Currently, we don't have any restaurants. Please try again later.
            <Shimmer />
          </div>
        ) : (
          restaurantData
            .filter((restaurant) => restaurant.rating >= 4)
            .map((restaurant, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img
                      src={restaurant.images.location}
                      className="card-img-top"
                      alt="Restaurant"
                    />
                    <div className="card-body d-flex justify-content-around">
                      <p className="card-title fw-bold">
                        {restaurant.name}{" "}
                        <span className="badge bg-info">
                          {restaurant.rating}
                        </span>
                      </p>
                      <div className="offers-text">
                        {restaurant.offers > 0
                          ? restaurant.offers + "% Off"
                          : ""}
                      </div>
                    </div>
                  </button>
                  <Cousines />
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default HomeBody;
