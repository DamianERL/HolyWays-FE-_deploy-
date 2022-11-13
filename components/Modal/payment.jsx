import React, { useEffect, useState } from "react";
import Button from "../Atoms/button";
import Input from "../Atoms/input";
import Modal from "../Atoms/modal";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function Payment({ showp, setShowPay,fundId }) {
  const [input, setInput] = useState("");
  const [profils, setProfils] = useState("");


  useEffect(() => {
    const getData = async (e) => {
      try {
        const res = await API.get(`/user/$`);
        setProfils(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handlechange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {

      // e.preventDefault();
      const datatransaction = {
        userFund_id:fundId.user.id,
        fund_id:fundId.id,
        donate:parseInt(input.donate)
      };
      
      const response = await API.post("/transaction", datatransaction);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log("success", result);
          history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log("pending", result);
          history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log("error", result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

      //
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-aj9Q1utSyh4wGP4-";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Modal isVisible={showp} onClose={() => setShowPay(false)}>
        <div className="w-[25rem] h-[13rem]">
          <div className="m-8">
            <Input
              onChange={handlechange}
              name="donate"
              type="number"
              placeholder="Nominal Donation"
            />
            <div className="flex gap-2 items-center mb-8 ">
              <Button style="flex w-[12rem] h-8 bg-primary justify-center items-center ">
                Attach Payment{" "}
                <img
                  src="https://res.cloudinary.com/fnxr/image/upload/v1668225945/holyways/Group_14_wximjn.svg"
                  alt=""
                />
              </Button>
              <p className=" text-gray-700 font-semibold text-center text-xs ">
                *transfers can be made to holyways accounts
              </p>
            </div>
            <Button
              onClick={() => handleSubmit.mutate()}
              style=" active:bg-primary/90 active:text-psecond/90 text-second hover:text-primary/90 h-8 px-6 bg-primary hover:bg-psecond "
            >
              Donate
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
