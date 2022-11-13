////package&&stateG
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../config/api";
import rupiah from "rupiah-format";
import moment from "moment";

//component
import Navbar from "../components/Navbar/navbar";
import Layout from "../components/utils/layout";
import swal from "sweetalert";

export default function Profil() {
  const [profils, setProfils] = useState("");
  const [preImage, setpreImage] = useState(null);


  const [dataT, setTransaction] = useState([]);

  const handleChange = (e) => {
    try {
      setProfils({
        ...profils,
        [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
      });
      if (e.target.type === "file") {
        setpreImage(e.target.files[0].name);
      }

      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
      const formData = new FormData();
      formData.set("name", "coba");
      formData.set("imagename", profils.image);
      if (preImage) {
        formData.set("image", profils?.image[0], profils?.image[0]?.name);
      }
      API.patch("/user", formData,config);
      swal(`Edit Profil success  `);
    } catch (error) {}
  };

  useEffect(() => {
    const getData = async (e) => {
      try {
        const res = await API.get("/get-user");
        // console.log(res);
        setProfils(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getTransaction = async (e) => {
      try {
        const res = await API.get("/transactions");
        setTransaction(res.data.data);
        // console.log("oke",res);
      } catch (error) {
        console.log(error);
      }
    };
    getTransaction();
  }, []);

  return (
    <>
      <Layout title="profil">
        <Navbar />
        <div>
          <div className="grid md:grid-cols-2 md:mx-32 md:my-12 ">
            <div className="">
              <p className=" font-extrabold text-3xl font-font_a mb-5">
                My Profile
              </p>
              <div className="flex gap-8">
                <input
                  type="file"
                  onChange={handleChange}
                  name="image"
                  hidden
                  id="image_profil"
                />
                <label htmlFor="image_profil">
                  <img
                    className="w-44 object-center object-cover rounded-md h-56"
                    src={profils.image}
                    alt=""
                  />
                </label>
                <div>
                  <div>
                    <p className="text-fontPrimary font-extrabold text-lg">
                      Full Name
                    </p>
                    <p className="font-normal text-lg">{profils.name}</p>
                  </div>
                  <div>
                    <p className="font-extrabold text-fontPrimary text-lg">
                      Email
                    </p>
                    <p className="font-normal text-lg">{profils.email}</p>
                  </div>
                  <p className="text-black font-extrabold text-lg">Phone</p>
                  <p className="font-normal text-lg">{profils.phone}</p>
                </div>
              </div>
            </div>
            <div>
              <p className=" ml-40 font-extrabold text-4xl font-font_a mb-5">
                History Order
              </p>
              <div className="overflow-y-auto scrollbar-hide h-[17rem]">
                {dataT?.map((item, index) => (
                  <div key={index} className="mb-2 grid justify-end">
                    <div className="grid grid-cols-2   w-96 bg-white rounded-md p-2">
                      <div className="">
                        <p className="font-font_a font-extrabold text-lg">
                          {item.fund.name}
                        </p>
                        <div className="flex">
                          <p className="text-sm font-bold">
                            {moment(item.created_at).format("dddd")}
                          </p>
                          <p>
                            , {moment(item.created_at).format("Do MMM  YY ")}
                          </p>
                        </div>
                        <p className="font-fontred">
                          {rupiah.convert(item.donate)}
                        </p>
                      </div>
                      <div className="grid justify-end">
                        <div>
                          <p
                            className={
                              item.status == "success"
                                ? "bg-green-300/40 p-2 text-center rounded font-medium text-xs"
                                : "bg-yellow-300/40 p-2 text-center rounded font-medium text-xs"
                            }
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
