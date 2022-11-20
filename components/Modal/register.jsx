import React from "react";
//integrasi
import { useMutation } from "react-query";
import { API } from "../../config/api";
import swal from "sweetalert";
//component
import Input from "../Atoms/input";
import Button from "../Atoms/button";

//import
import { useState } from "react";

export default function Register({setShowModal,setShowMLogin}) {
  const [input, setInput] = useState({
    role:"user"
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const body = JSON.stringify(input);

      await API.post("/register", body);

      setShowModal(true)
      setShowMLogin(false)
      swal("Register Success");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className="p-8">
        <p className="text-primary font-bold text-4xl mt-1 mb-10 ">Register</p>
        <form
          onSubmit={(e) => handleRegister.mutate(e)}
          className="flex flex-col justify-center item-center"
        >
          <div className="w-[22rem]">
            <Input
              onChange={handleChange}
              placeholder="FULLNAME"
              name="name"
              type="text"
            />
            <Input
              onChange={handleChange}
              placeholder="EMAIL"
              type="email"
              name="email"
            />
            <Input
              onChange={handleChange}
              placeholder="PASSWORD"
              type="password"
              name="password"
            />
    
          </div>
          <Button style="hover:bg-primary mb-4 mt-8 hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-[3rem] bg-primary hover:bg-psecond/90">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}
