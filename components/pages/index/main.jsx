import React from "react";

export default function Main() {
  return (
    <>
      <div className="flex h-[45rem] ">
        <div className="static">
        <img
        className=""
        src="https://res.cloudinary.com/fnxr/image/upload/v1667916202/holyways/1340554718_2_cijxez.svg"
        alt=""
        />
        </div>
        <div className="flex  justify-center ml-[10rem] items-center">
          <div className=" w-[42rem]">
            <p className=" font-bold text-4xl ">
              Your donation is very helpful for people affected by forest fires
              in Kalimantan.
            </p>
            <div className=" text-black/70 grid md:grid-cols-2 my-4 mx-6">
              <div className="w-[18rem] text-justify ">
                <p className="" >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry`&apos;`s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="w-[18rem]  text-justify ">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry`&apos;`s
                  standard dummy text ever since the 1500s.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
