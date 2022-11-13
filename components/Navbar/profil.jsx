import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/store/userContext";
import { API } from "../../config/api";
import Dropdown from "../Atoms/dropdown";

export default function Profil() {
  const [state,dispatch] = useContext(UserContext);
  const [modalProfil, setModalProfil] = useState(false);
  const [profils,setProfils] =useState("") 
  

  useEffect(()=>{
    const getData =async (e)=>{
      try {
        const res = await API.get("/get-user")
        setProfils(res.data.data)
      } catch (error) {
        console.log(error);

      }
    }
    getData()
  },[])

  const hadleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div>
      <img
       onClick={() => {
        setModalProfil(true);
      }}
        className="w-14 h-14 cursor-pointer  rounded-full"
        src={profils.image}
        alt=""
      />
      <Dropdown isVisible={modalProfil} onClose={() => setModalProfil(false)}>
        <div className=" flex justify-center items-center">
          <div className=" gap-4 flex flex-col ">
            <Link href="/profile">
              <div className="flex items-center">
                <img
                  src="https://res.cloudinary.com/fnxr/image/upload/v1665566973/profile_h4jscd.svg"
                  alt=""
                />
                <p className="m-2">Profil</p>
              </div>
            </Link>
            <Link href="/raise_fund">
              <div className="flex items-center">
                <img
                  src="https://res.cloudinary.com/fnxr/image/upload/v1667985974/Group_4_kjtpqi.svg"
                  alt=""
                />
                <p className="m-2">Raise Fund</p>
              </div>
              
            </Link>
            <div onClick={hadleLogout} className="flex items-center ">
              <img
                src="https://res.cloudinary.com/fnxr/image/upload/v1665402927/logout_1_d43eax.svg"
                alt=""
              />
              <p className="m-2">Logout</p>
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
