import React from "react";

const Input = ({ label, state, setState, placeholder, type }) => {
  return (
    <div className="py-2">
      <p className="capitalize">{label}</p>
      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="border-b-4 border-0 w-full py-1 focus:outline-none opacity-40 focus:opacity-90 transition-all duration-200"
      />
    </div>
  );
};

export default Input;
