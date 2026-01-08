import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { getAllBooks, getAllJobs, getAllUsers } from "../../services/AllApi";

const AdminHome = () => {
  const box = {
    width: "250px",
    height: "120px",
  };

  const [jobCount, setJobCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    getJobCount();
    getBookCount();
    getUserCount();
  }, []);

  const getJobCount = async () => {
    try {
      let apiResponse = await getAllJobs();

      setJobCount(apiResponse.data.length);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    }
  };

  const getBookCount = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllBooks(header, "");

      setBookCount(apiResponse.data.AllBooks.length);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    }
  };

  const getUserCount = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllUsers(header);
      console.log(apiResponse);
      setUserCount(apiResponse.data.length);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />
        <div>
          <div className="flex justify-between mt-10 mx-10">
            <div style={box} className="border bg-green-600 rounded-full">
              <h1 className="mt-10 ms-10 font-bold text-zinc-900 text-xl">
                Total Books :{bookCount}
              </h1>
            </div>

            <div style={box} className="border bg-blue-600 rounded-full">
              <h1 className="mt-10 ms-10 font-bold text-zinc-900 text-xl">
                Total Users :{userCount}
              </h1>
            </div>

            <div style={box} className="border bg-orange-600 rounded-full">
              <h1 className="mt-10 ms-3 font-bold text-zinc-900 text-xl">
                Total Job Openings :{jobCount}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
