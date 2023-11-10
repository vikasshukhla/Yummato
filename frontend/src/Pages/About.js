// About.js
import React from "react";
import "./About.css"; // Import your CSS file for styling

const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to FoodDeliver, your go-to place for delicious food
          delivery. We are passionate about providing a wide range of
          mouthwatering dishes right to your doorstep.
        </p>
        <p>
          Our team of skilled chefs and delivery drivers work tirelessly to
          ensure that your food is fresh, hot, and delivered in a timely manner.
        </p>
        <p>
          At FoodDeliver, we take pride in our commitment to quality and
          customer satisfaction. We source the finest ingredients and prepare
          every dish with care and attention.
        </p>
        <p>
          Whether you're craving pizza, sushi, or a classic burger, we've got
          you covered. Explore our menu, place your order, and let us satisfy
          your cravings.
        </p>
      </div>
    </div>
  );
};

export default About;