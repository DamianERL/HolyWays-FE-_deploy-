import React from 'react'

export default function Input({ clas,style,children,...props}) {
  return (
    <>
      <input {...props} className={`${style ? style: ""}
    }  mb-3 px-4 py-2 w-full  bg-gray-400/40 rounded focus:outline-none focus:ring focus:ring-gray-400`}/>{children}
    </>
  )
}
