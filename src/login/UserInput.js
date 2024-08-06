/*src/login/UserInput.js*/
import React from "react";

const UserInput = ({ type, placeholder, value, name, onChange }) => {
  return (
    <div className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default UserInput;