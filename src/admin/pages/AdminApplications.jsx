import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { getAllJobApplications } from "../../services/AllApi";
import { BaseUrl } from "../../services/BaseURl";

const AdminApplications = () => {
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    getAllApplicationData();
  }, []);

  const getAllApplicationData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllJobApplications(header);

      if (apiResponse.status == 200) {
        setApplicationData(apiResponse.data.allApplications);
        console.log(apiResponse.data.allApplications);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, can't get application data");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />

        <div>
          <h1 className="text-center font-bold text-2xl">Job Applications</h1>

          {applicationData?.length > 0 ? (
            <div className="grid grid-cols-3 mt-10 gap-2 mx-1">
              {applicationData?.map((eachApp) => (
                <div className="bg-amber-500 p-4">
                  <h1>Name :{eachApp.name}</h1>
                  <h1>Email :{eachApp.email}</h1>
                  <h1>Phone :{eachApp.phoneNumber}</h1> 
                  <h1>Quailification :{eachApp.quailification}</h1>
                  <h1>jobRole :{eachApp.jobRole}</h1>
                  <h1>jobID :{eachApp.jobID}</h1>

                  <a
                    className="text-blue-700"
                    target="_blank"
                    href={`${BaseUrl}/uploads/${eachApp.resume}`}
                  >
                    Download Resume
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <h1>No Job Applications Found..</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminApplications;
