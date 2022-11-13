import React from "react";
//component
import Input from "../Atoms/input";
import Button from "../Atoms/button";
//import
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../app/store/userContext";
import swal from "sweetalert";

//integrasi
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function Login() {
  const [state, dispatch] = useContext(UserContext);
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const body = JSON.stringify(input);

      const response = await API.post("/login", body);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      // if (response?.data.data.role === "patner") {
      //   router.push("/");
      // }

      swal(`Login success  `);
    } catch (error) {}
  });

  return (
    <div>
      <div className="  p-8">
        <p className=" font-bold text-4xl mt-1 mb-10 text-primary ">Login</p>
        <form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="flex flex-col justify-center item-center"
        >
          <div className="w-[22rem]">
            <Input onChange={handleChange} placeholder="EMAIL" name="email" />
            <Input
              style="mt-3  "
              type="password"
              onChange={handleChange}
              placeholder="PASSWORD"
              name="password"
            />
            <Button
              type="submit"
              // style="h-10 mt-5  bg-fontPrimary hover:bg-fontPrimary/90"
              style="hover:bg-primary mb-4 mt-4 hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-[3rem] bg-primary hover:bg-psecond/90"
            >
              login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
