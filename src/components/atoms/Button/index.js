import React from "react";

const Button = ({ title, onClick, loading }) => {
  if (loading) {
    return (
      <button className="btn btn-secondary mt-3" disabled>
        Loading...
      </button>
    );
  }
  return (
    <button className="btn btn-primary mt-3" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
