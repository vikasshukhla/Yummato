// src/components/Stepper.js
import React from 'react';

const Stepper = ({ steps, activeStep, setActiveStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className={`step ${activeStep === index ? 'active' : ''}`}>
          {step}
          {index < steps.length - 1 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;