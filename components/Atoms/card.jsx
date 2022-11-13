import React from "react";

export default function Card({ children }) {
  return (
    <div className='max-w bg-psecond shadow-md rounded-t-xl hover:bg-primary/30   cursor-pointer'>
      {children}
    </div>
  );
}
