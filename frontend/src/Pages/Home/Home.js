import "./Home.css";
import diverse from "../../images/diverse.jpg";
import fresh from "../../images/fresh.jpg";
import place from "../../images/place.jpg";
import HomeBody from "./HomeBody";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [OfferCard, setOfferCard] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3003/offers`).then((res) => {
      setOfferCard(res.data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row covercard">
        <div className="col-12">
          <h2 className="text-center text-dark pt-2 fw-bold">
            Eat Healthy and Delicious Anytime, Anywhere At Your Place
          </h2>
          <div className="row offerCard">
            <h2>Upcoming Exciting Offers</h2>
            {OfferCard.map((offers, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={offers.image}
                    className="card-img-top"
                    alt="restaurant_image"
                  />
                  <div className="card-body">
                    <p className="card-title fw-bold">{offers.name}</p>
                    <p className="couponCode">USE: {offers.couponCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row cards">
            <div className="col-md-4">
              <div className="card">
                <img src={diverse} className="card-img-top" alt="diverse_food" />
                <div className="card-body">
                  <p className="card-text fw-bold">
                    Diversity - A lot of food choices according to taste, region, festivals. We provide you plenty of meal options.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-2">
                <img src={fresh} className="card-img-top" alt="fresh_food" />
                <div className="card-body">
                  <p className="card-text fw-bold">
                    Freshness - Get fresh food of your choice. Our fresh food focuses on what really matters - saving our guests time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={place} className="card-img-top" alt="food_delivery" />
                <div className="card-body">
                  <p className="card-text fw-bold">
                    On Time - Get food on time at your place. In this busy era, we are here to deliver your food at your place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row covercard mt-5">
        <h2 className="mx-5 my-2 fw-bold">Top Rated Restaurants</h2>
        <HomeBody />
      </div>
    </div>
  );
};

export default Home;