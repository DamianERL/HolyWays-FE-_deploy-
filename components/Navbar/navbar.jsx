import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../../app/store/userContext";
import Modalauth from "./modalauth";
import Profil from "./profil";
export default function Navbar({ setShowMLogin, showMLogin }) {
  const [state, dispatch] = useContext(UserContext);

  const isLogin = state.isLogin;
  return (
    <>
      <nav className="h-[4.5rem] pt-2  bg-primary sticky top-0 ">
        <div className="flex justify-between px-10 items-center ">
          <div className="pt-2">
            <Link href="/">
              <Image
                className="cursor-pointer"
                src="/Icon.svg"
                width={60}
                height={20}
                alt=""
              />
            </Link>
          </div>
          <div className=" flex gap-3 ">
            {isLogin ? (
              <Profil />
            ) : (
              <Modalauth
                setShowMLogin={setShowMLogin}
                showMLogin={showMLogin}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
