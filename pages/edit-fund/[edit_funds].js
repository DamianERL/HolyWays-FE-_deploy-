import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../../components/Atoms/button";
import Input from "../../components/Atoms/input";
import Navbar from "../../components/Navbar/navbar";
import { API } from "../../config/api";
import Layout from "../../components/utils/layout";
import { useMutation } from "react-query";
import swal from "sweetalert";

export default function Editfund() {
  const router = useRouter();
  const id = router.query.edit_funds;

  const [preview, setPreview] = useState(null);
  const [input, setInput] = useState("");

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

  const handlseSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("name", input.name);
      formData.set("goals", input.goals);
      formData.set("desc", input.desc);
      if (preview) {
        formData.set("image", input?.image, input?.image?.name);
      }
      const res = await API.patch(`/fund/${id}`, formData);
      swal("edit fund success");
    } catch (error) {}
  });

  useEffect(() => {
    const getData = async (e) => {
      try {
        const res = await API.get(`/fund/${id}`);
        setInput({
          name: res.data.data.name,
          goals: res.data.data.goals,
          image: res.data.data.image,
          desc: res.data.data.desc,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Layout title="edit-product">
        <Navbar />
        <div className="mx-[5rem] my-[3rem]">
          <p className="font-bold text-4xl">Edit Funds</p>
          <div className="mx-[3rem]   mt-[4rem]">
            <form
              onSubmit={(e) => handlseSubmit.mutate(e)}
              className=" mx-[4rem] my-[3rem]"
            >
              <Input
                defaultValue={input.name}
                onChange={handleChange}
                name="name"
                placeholder="Title"
              />
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
                  defaultValue={input.image}
                  id="imageProfil"
                  hidden
                  onChange={handleChange}
                  type="file"
                  name="image"
                />
              </div>
              <Input
                defaultValue={input.goals}
                name="goals"
                type="number"
                onChange={handleChange}
                placeholder="Goals Donation"
              />
              <textarea
                defaultValue={input.desc}
                onChange={handleChange}
                name="desc"
                maxlength="844"
                placeholder="description"
                className="resize-none px-4 py-2 bg-gray-400/40 rounded focus:outline-none focus:ring  focus:ring-gray-400 w-full h-[10rem] "
              ></textarea>
              <div className="flex justify-end mt-4">
                <Button style="hover:bg-primary   hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-8 w-[7.5rem] bg-primary hover:bg-psecond/90">
                  <p className="">Edit Fund</p>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
