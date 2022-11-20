////package&&stateG
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../config/api";
import rupiah from "rupiah-format";
import moment from "moment";
import { BsPencilSquare } from "react-icons/bs";

//component
import Navbar from "../components/Navbar/navbar";
import Layout from "../components/utils/layout";
import swal from "sweetalert";

export default function Profil() {
  const [dataT, setTransaction] = useState([]);
  const [profils, setProfils] = useState("");

  //
  const [preview, setPreview] = useState(null);
  console.log("data", preview);
  const [profile, setProfile] = useState("");

  console.log("pres1", profile);



  const edit = async (e) => {
    try {
      const formData = new FormData();
      formData.set("name", profils.name);
      formData.set("email", profils.email);
      formData.set("phone", profils.phone);
      formData.set("imagename", profile.image);
      if (preview) {
        formData.set("image", profile?.image[0], profile?.image[0]?.name);
      }
      await API.patch("/user", formData);
      getData();
      swal("success");
      console.log("check", res);
    } catch (error) {
      console.log(error);
    }
  };

  const [change, setChange] = useState(false)

  const handleChangex = (e) => {
    setProfils({
      ...profils,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    setChange(true)

    console.log(change);

    if (e.target.type === "file") {
      setPreview(e.target.files[0].name);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(e.target.files[0].name);
    }
  };
  const getData = async (e) => {
    try {
      const res = await API.get("/get-user");
      // console.log(res);
      setProfils({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        image: res.data.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
                  name="image"
                  hidden
                  onChange={handleChange}
                  id="imageProfil"
                  type="file"
                />

                <label htmlFor="imageProfil">
                  <div className="w-[12rem] p-[0.4rem] shadow-xl  bg-red-500/50 object-center object-cover rounded-md h-[15rem]" >

                  <img
                    className="w-44 shadow-xl  bg-primary/50 object-center object-cover rounded-md h-56"
                    src={profils.image}
                    alt=""
                    />
                    </div>
                </label>
                <div>
                  <div>
                    <p className="text-fontPrimary font-extrabold text-lg">
                      Full Name
                    </p>
                    <label htmlFor="name" className="flex">
                      <input
                        type="text"
                        onChange={handleChangex}
                        id="name"
                        name="name"
                        className="  outline-none font-normal bg-bgground text-lg"
                        defaultValue={profils.name}
                      />
                      <BsPencilSquare />
                    </label>
                  </div>
                  <div>
                    <p className="font-extrabold text-fontPrimary text-lg">
                      Email
                    </p>
                    <label htmlFor="email" className="flex">
                      <input
                        id="email"
                        onChange={handleChangex}
                        name="email"
                        type="email"
                        className="font-normal  outline-none bg-bgground text-lg"
                        defaultValue={profils.email}
                        placeholder="email"
                      />
                      <BsPencilSquare />
                    </label>
                  </div>
                  <div className="">
                    <p className="  font-extrabold text-lg">Phone</p>
                    <label className="flex  " htmlFor="phone">
                      <input
                        onChange={handleChangex}
                        id="phone"
                        name="phone"
                        className="w-full  outline-none bg-bgground"
                        defaultValue={profils.phone}
                        placeholde=" phone number"
                      />
                      <BsPencilSquare />
                    </label>
                  </div>
                </div>
              </div>
              {profile || change ? 
              (
                <div className="  mb-4 flex  h-[2rem] justify-center items-center hover:text-p active:bg-psecond/90 active:text-primary/90 text-psecond  mt-4 rounded-md w-[9rem] bg-primary hover:primary">
                  <p className="text-lg font-medium" onClick={edit}>
                    Edit Profile
                  </p>
                </div>
              )
              :
              ""
            
            
            
            
            
            }
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
