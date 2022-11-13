import Link from "next/link";
import React from "react";
//component
import Button from "../../Atoms/button";

export default function Header() {
  return (
    <div className="">
      <section className=" grid md:grid-cols-3 pt-16 h-[40rem] bg-primary "  >
        <div className="w-[46rem]  col-span-2 md:ml-[8rem]  " >
        <p className="text-5xl font-bold mb-8 text-white ">
          While you are still standing, try to reach out to the people who are
          falling.
        </p>
        <p className="w-[42rem] text-lg " >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <Link href="#donateNow">
        <Button  style="text-primary hover:text-white/90 w-[8rem] rounded-xl mt-8 text-center py-2 bg-psecond hover:bg-pthird/90 " >
          <p className="" >Donate Now</p>
        </Button>
        </Link>
        </div>
        <div className="col-span-">
        <img
          className=""
          src="https://res.cloudinary.com/fnxr/image/upload/v1667916203/holyways/1340554718_1_x6ktu3.svg"
          alt=""
          />
          </div>
      </section>
    </div>
  );
}
