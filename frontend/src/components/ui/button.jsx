// frontend/src/components/ui/button.jsx
import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
