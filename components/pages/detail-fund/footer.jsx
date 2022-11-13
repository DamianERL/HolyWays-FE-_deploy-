////package&&stateG
import { useEffect, useState } from "react";
import rupiah from "rupiah-format";
import moment from "moment";
//component
import { API } from "../../../config/api";
export default function Footer({ indexx }) {
  const [dataT, setTransaction] = useState([]);


  useEffect(() => {
    const getTransaction = async (e) => {
      try {
        const res = await API.get(`/transactionx/${indexx}`);

        setTransaction(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransaction();
  }, []);

  return (
    <>
      <div className="mb-8 ml-8">
        <p className="  font-extrabold text-3xl font-font_a mb-5">
          Donation has not been approved ({dataT.length})
        </p>
        <div className="overflow-y-auto scrollbar-hide h-[20rem]">
          {dataT?.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="grid grid-cols-2   mx-8 mt-4 bg-white rounded-md p-2">
                <div className="">
                  <p className="font-font_a font-extrabold text-lg">
                    {item.user_donate.name}
                  </p>
                  <div className="flex">
                    <p className="text-sm font-bold">
                      {moment(item.created_at).format("dddd")}
                    </p>
                    <p>, {moment(item.created_at).format("Do MMM YY ")}</p>
                  </div>
                  <p className="text-primary font-bold">
                    {rupiah.convert(item.donate)}
                  </p>
                </div>
                <div className="grid justify-end">
                  <div>
                    <p
                      className={
                        item.status == "success"
                          ? "bg-green-300/40 p-2 text-center rounded font-medium text-lg"
                          : "bg-yellow-300/40 p-2 text-center rounded font-medium text-lg"
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
    </>
  );
}
