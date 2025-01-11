import React from "react";

const Button = ({ text, OnClick, blue, disabled, className = "" }) => {
  return (
    <div
      disabled={disabled}
      className={`${blue ? "btn btn-blue" : "btn"} ${className}`}
      onClick={OnClick}
    >
      {text}
    </div>
  );
};

export default Button;
