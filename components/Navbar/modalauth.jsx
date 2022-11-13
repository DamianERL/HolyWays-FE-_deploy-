import React, { useState } from "react";
import Button from "../Atoms/button";
import Modal from "../Atoms/modal";
import Login from "../Modal/login";
import Register from "../Modal/register";

export default function Modalauth({ setShowMLogin, showMLogin }) {
  const [showModal, setShowModal] = useState(false);

  // switch modal
  const handleCloseRegis = () => {
    setShowMLogin(false);
    setShowModal(true);
  };
  const handleCloseLog = () => {
    setShowMLogin(true);
    setShowModal(false);
  };
  return (
    <>
      <Button
        style=" text-second hover:text-primary/90 h-8 px-6 bg-pthird hover:bg-psecond "
        onClick={() => setShowModal(true)}
      >
        <p>Login</p>
      </Button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <Login />   
        <p className="  text-base text-center mb-8">
          Already have an account ? click{" "}
          <strong onClick={handleCloseLog}> HERE</strong>
        </p>
      </Modal>
      <Button
        style="text-primary hover:text-white/90  h-8 px-6 bg-psecond hover:bg-pthird/90 "
        onClick={() => setShowMLogin(true)}
      >
        <p>Register </p>
      </Button>
      <Modal isVisible={showMLogin} onClose={() => setShowMLogin(false)}>
        <Register />
        <p className=" text-base text-center mb-8">
          Don`t have an account? click
          <strong onClick={handleCloseRegis}> HERE</strong>
        </p>
      </Modal>
    </>
  );
}
