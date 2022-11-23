import React, { useEffect, useState } from 'react'
import moment from "moment";
import rupiah from "rupiah-format";

//component
import { API } from '../../../config/api';
export default function Main({indexx,}) {
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
              <div>
              <p className=" ml-8 mt-12 font-extrabold text-3xl font-font_a mb-5">
              List Donation 
              {/* ({Tsuccess.length}) */}
              </p>
              <div  className="overflow-y-auto scrollbar-hide h-[20rem]">
                {Tsuccess?.map((item, index) => (
                  <div key={item.id} className="mb-2 ">
                    <div className="grid grid-cols-2    bg-white rounded-md m-8 p-2">
                      <div className="">
                        <p className="font-font_a font-extrabold text-lg">
                          {item.user_donate.name}
                        </p>
                        <div className="flex">
                          <p className="text-sm font-bold">
                            {moment(item.created_at).format("dddd")}  
                          </p>
                          <p>
                            ,{moment(item.created_at).format("Do MMM  YY ")}
                          </p>
                        </div>
                        <p className="text-primary font-bold ">
                          {rupiah.convert(item.donate)}
                        </p>
                      </div>
                      <div className="grid justify-end">
                        <div>
                        </div>
                      </div>
                    </div>
                  </div >
                ))} 
              </div>
            </div>
    </>
  )
}
