//package
import React, { useEffect, useState } from "react";
import Rupiah from "rupiah-format";
import moment from "moment";
import { useRouter } from "next/router";

//component
import Layout from "../../components/utils/layout";
import Navbar from "../../components/Navbar/navbar";
import Button from "../../components/Atoms/button";
import { API } from "../../config/api";
import Payment from "../../components/Modal/payment";
import Footer from "../../components/pages/detail-fund/footer";
import Main from "../../components/pages/detail-fund/main";
export default function Detail_fund() {
  const router = useRouter();
  const indexx = router.query.funds;
  const [data, setData] = useState([]);
  const fundId =data

  const handleData = async (e) => {
    try {
      const res = await API.get(`/fund/${indexx}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleData();
  }, []);

  const [Tsuccess,setTransaction]= useState([])
  const getData=async()=>{
    try {
      const res = await API.get(`/transactionss/${indexx}`)
      setTransaction(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    getData()
  },[])


  return (
    <>
      <Layout title="Detail Fund">
        <Navbar />
        <section className="mb-[2rem]">
          <div className="flex mt-[4rem] ml-[6rem]">
            <img
              className="w-[38rem] h-[35rem]"
              src={data?.image}
              alt=""
            />
            <div className="ml-[4rem] w-[30rem]">
              <p className="  font-bold text-3xl">{data?.name}</p>
              <div className="flex justify-between items-end mt-4 ">
                <p className="font-bold text-primary text-lg">
                  {Rupiah.convert(data.donated)}
                </p>
                <p className="items-center font-medium text-base text-gray-500 ">
                  gathered from
                </p>
                <p className="font-bold text-lg text-gray-500">
                  {Rupiah.convert(data?.goals)}{" "}
                </p>
              </div>
              <div className="flex mb-4 mt-2 justify-between items-end ">
                <p className="font-bold flex items-end  text-lg">
                {Tsuccess.length}
                  <p className="text-gray-500 font-medium text-xs">
                    {" "}
                    Donation{" "}
                  </p>
                </p>
                <p className="font-bold text-lg flex items-end ">
                  {moment(data?.date).startOf('hours').fromNow()}
                  <p className=" font-medium text-gray-500 text-xs">
                    
                    {/* More Day{" "} */}
                  </p>
                </p>
              </div>
              <p className=" text-justify text-gray-700 text-base ">
                {data.desc}
              </p>
              <Button
              onClick={()=> router.push(`/edit-fund/${data.id}`)}
                style="hover:bg-primary mb-4 hover:text-psecond active:bg-psecond/90 active:text-primary/90 text-psecond h-8 mt-8 bg-primary hover:bg-psecond/90"
              >
                EDIT FUND
              </Button>
            </div>
          </div>
        </section>
        <Footer indexx={indexx}  />
      </Layout>
    </>
  );
}
