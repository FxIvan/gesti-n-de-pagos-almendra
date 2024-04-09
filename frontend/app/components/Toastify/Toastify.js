"use client";
import myToast from "../custom/MyToast";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const Toastify = () => {
  const toast = { loading: false, error: false, success: false };
  const { loading, error, success } = toast;
  useEffect(() => {
    if (success) {
      myToast({ variant: "success", children: success });
    } else if (error && loading == false) {
      myToast({ variant: "danger", children: error });
    } else if (loading) {
      myToast({ variant: "info", children: "Loading..." });
    }
  }, [success, error, loading]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Toastify;
