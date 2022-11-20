import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import swal from "sweetalert";
import Rupiah from "rupiah-format";
//component
import Navbar from "../components/Navbar/navbar";
import Layout from "../components/utils/layout";
import Input from "../components/Atoms/input";
import Button from "../components/Atoms/button";
import { API } from "../config/api";
export default function Form_fund() {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [input, setInput] = useState("");

  console.log("thist trigrer",preview);
  console.log("data create",input);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(e.target.files[0].name);
    }
  };
  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      
      const formData = new FormData();
      formData.set("name", input.name);
      formData.set("desc", input.desc);
      formData.set("goals", input.goals);
      formData.set("imagename", input.image);
      if (preview) {
        formData.set("image", input?.image, input?.image?.name);
      }
      console.log("set image",formData);
      const res = await API.post("/fund", formData);
      swal("success Raise Fund ");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Layout title="Form Fund">
        <Navbar />
        <form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className=" mx-[10rem] my-[3rem]"
        >
          <p className="text-3xl font-bold mb-8 ">Make Raise Fund</p>
          <Input onChange={handleChange} name="name" placeholder="Title" />
          <div className="grid col-span-4">
            <label
              className="bg-primary w-[10rem] mt-4 mb-8 h-10 hover:bg-fontPrimary/90 text-white  pt-2 text-center text-xs font-bold transition duration-300 rounded"
              htmlFor="imageProfil"
            >
              <div className="text-white">
                {preview ? preview : "Attach Image"}
              </div>
            </label>
            <Input
              id="imageProfil"
              hidden
              onChange={handleChange}
              type="file"
              name="image"
            />
          </div>
          <Input
            name="goals"
            type="number"
            onChange={handleChange}
            placeholder="Goals Donation"
          />
          <textarea
            onChange={handleChange}
            name="desc"
            maxlength="844"
            placeholder="description"
            className="resize-none px-4 py-2 bg-gray-400/40 rounded focus:outline-none focus:ring  focus:ring-violet-300 w-full h-[10rem] "
          ></textarea>
          <div className="flex justify-end mt-4">
            <Button style="hover:bg-primary   hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-8 w-[7.5rem] bg-primary hover:bg-psecond/90">
              <p className="">Donate</p>
            </Button>
          </div>
        </form>
      </Layout>
    </>
  );
}
