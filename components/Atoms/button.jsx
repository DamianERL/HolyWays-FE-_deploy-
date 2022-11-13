import React from "react";

export default function Button({ children, style, ...props }) {
  return (
    <button
      {...props}
      className={`${
        style ? style : "bg-psecond hover:bg-primary/90"
      }text-white w-full text-sm font-bold rounded transition duration-300 `}
    >
      {children}
    </button>
  );
}
