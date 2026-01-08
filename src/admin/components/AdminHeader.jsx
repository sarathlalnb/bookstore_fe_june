import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AdminHEader = () => {
  return (
    <>
      <div className="flex justify-between mx-15">
        <div className="flex items-center">
          <img
            className="w-25"
            src="https://cdn-icons-png.flaticon.com/128/8017/8017848.png"
            alt=""
          />
          <h1 className="text-2xl font-bold">BookStore</h1>
        </div>

        <button className=" cursor-pointer hover:text-xl ">
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </button>
      </div>
      <div className="bg-black text-white p-5">
        <marquee behavior="" direction="">
          Welcome, Admin! You're all set to manage and monitor the system. Let’s
          get to work! 
        </marquee>
      </div>
    </>
  );
};

export default AdminHEader;
