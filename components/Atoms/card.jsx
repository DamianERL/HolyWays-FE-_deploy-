import React from "react";

export default function Card({ children }) {
  return (
    <div className='max-w bg-psecond hover:shadow-xl   rounded-t-xl cursor-auto hover:bg-primary/10   '>
      {children}
    </div>
  );
}
