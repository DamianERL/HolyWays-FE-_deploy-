import React, { useContext, useEffect, useState } from "react";
import Rupiah from "rupiah-format";
import { useRouter } from "next/router";

//component
import Button from "../../Atoms/button";
import Card from "../../Atoms/card";
import { UserContext } from "../../../app/store/userContext";
import { API } from "../../../config/api";

export default function Footer({setShowMLogin}) {
  const [state] = useContext(UserContext);
  const handleclick = () => setShowMLogin(true);
  const router = useRouter();
  const [data,setData]=useState([])



  useEffect(()=>{
    const getData =async(e)=>{
      try {
        const res =await API.get("/funds")
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    getData()
  },[])

  return (
    <>
      <div
        id="donateNow"
        className="flex-col justify-center items-center pt-[2rem]"
      >
        <p className=" font-bold text-3xl text-center text-primary">
          Donate Now
        </p>
        {/* <div className="flex" > */}

        <div className="grid md:grid-cols-4 my-[4rem] mx-[5rem] gap-[1rem] ">
            
          {data?.map((item, index) => (
            <Card key={index}>
              <div className="">
                <div className="">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[30rem]  rounded-t-xl  h-[20rem]"
                  />
                </div>
                <div className="m-4">
                  <p className="font-bold text-2xl overflow-hidden  h-[4rem] w-[19rem]">{item.name.substring(0, 44)}</p>
                  <p className=" w-[18rem] h-[3rem] overflow-hidden my-4">
                    {item.desc.substring(0, 73)}...
                  </p>
            
                  <div className="font-bold flex justify-between mt-8 ">
                    <p className=" ">{item?.donated == 0 ? "": Rupiah.convert(item?.donated)}</p>
                    <Button
                      onClick={
                        state.isLogin === true
                          ? () => router.push(`/fund/${item.id}`)
                          : handleclick
                      }
                      style="hover:bg-primary mb-4 hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-8 w-[7rem] bg-primary hover:bg-psecond/90"
                    >
                      <p className="">Donate</p>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
