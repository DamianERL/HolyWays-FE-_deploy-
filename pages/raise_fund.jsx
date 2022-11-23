import React, { useEffect, useState } from "react";
import Rupiah from "rupiah-format";
import { useRouter } from "next/router";
//component
import Navbar from "../components/Navbar/navbar";
import Layout from "../components/utils/layout";
import Card from "../components/Atoms/card";
import Button from "../components/Atoms/button";
import { API } from "../config/api";

export default function Fund() {
  const router = useRouter();

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async (e) => {
      try {

        const res =await API.get("/fundss")
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Layout title="raise fund">
        <Navbar />
        <div className="mt-[5rem] mx-[4rem] flex justify-between">
          <p className="ml-[7rem] font-bold text-4xl">My Raise </p>
          <div onClick={() => router.push(`form_fund`)}>
            <Button style="hover:bg-primary mb-4 hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond  w-[12rem] bg-primary  ">
              <p>Make Raise Fund</p>
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 ml-[12rem]  gap-12 pt-[2rem] pb-[2rem]">
          {data?.map((item) => (
            <div key={item.id} className=" w-[20rem] h-[33.7rem] ">
              <Card >
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className="w-[20rem]  rounded-t-md  h-[20rem]"
                  />
                </div>
                <div className="m-4">
                  <p className="font-bold h-[4rem] overflow-hidden text-2xl w-[19rem]">{item.name}</p>
                  <p className=" w-[18rem] h-[3rem] overflow-hidden my-4">
                    {item.desc.substring(0, 73)}...
                  </p>
                  <div className="font-bold flex justify-between mt-8 ">
                    <p className=" ">{Rupiah.convert(item?.donated)}</p>
                    <Button
                      onClick={() => router.push(`/my_fund/${item.id}`)}
                      style="hover:bg-primary mb-4 hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-8 w-[6.5rem] bg-primary hover:bg-psecond/90"
                    >
                      <p className="">View Fund</p>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
