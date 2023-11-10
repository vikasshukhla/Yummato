// Contact.js
import React from "react";
import "./Contact.css"; // Import your CSS file for styling

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="contact-map">
        <h2>Our Location</h2>
        {/* Replace the URL with your map embed code */}
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28521.83340268566!2d78.37122559999999!3d26.673151999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39769f83f91b96b9%3A0x2168341824b15730!2sHome!5e0!3m2!1sen!2sin!4v1697796568666!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
