import React, { useEffect, useState } from "react";
import AdminHEader from "../components/AdminHEader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { addJob, deleteJob, getAllJobs } from "../../services/AllApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const AdminCareers = () => {
  const [jobData, setJobData] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getJobData();
  }, []);

  const [addJobData, setAddJobData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    salary: "",
    experience: "",
    qualification: "",
    lastDate: "",
    publishedDate: "",
  });

  const getJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      if (apiResponse.status == 200) {
        setJobData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Load Job Details");
    }
  };

  const onDeleteClick = async (id) => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await deleteJob(id, header);
      if (apiResponse.status == 200) {
        toast.success("Successfully Deleted");
        getJobData();
      } else {
        toast.error("Something went wrong while deleting");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occured while deleting the job");
    }
  };

  const addClick = async () => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await addJob(addJobData, header);


      if (apiResponse.status == 201) {
        toast.success(apiResponse.data.message);
      } else {
        toast.error(apiResponse.response.data.message);
      }


    } catch (error) {
      console.log(error);
      toast.error("Error Occured while Adding the job");
    }
  };

  return (
    <>
      <AdminHEader />

      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />

        <div>
          <Button
            className="bg-gray-900 m-6"
            onClick={() => setOpenModal(true)}
          >
            Add New Job
          </Button>
          {jobData?.length > 0 && (
            <div>
              {jobData?.map((eachJob) => (
                <div className="border bg-green-600 mt-10 p-7 mx-10">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-3xl text-center font-bold">
                        {eachJob.jobTitle}
                      </h1>
                      <div className="flex justify-between">
                        <h1 className="text-xl text-center ">
                          {eachJob.salary}
                        </h1>
                        <h1 className="text-xl text-center ">
                          {eachJob.jobLocation}
                        </h1>
                      </div>
                      <div className="flex justify-between text-xl ">
                        <h1>Published Date : {eachJob.publishedDate}</h1>
                        <h1 className="ms-10">
                          Published Date : Date :{eachJob.lastDate}
                        </h1>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => onDeleteClick(eachJob._id)}
                        className="bg-red-700 font-bold rounded border p-2"
                      >
                        Delete
                      </button>
                      <div className="flex justify-between text-xl ">
                        <h1 className="text-center">{eachJob.qualification}</h1>
                        <h1 className="text-center ms-10">
                          {eachJob.experience}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold mt-7 text-justify">
                    {eachJob.jobDescription}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        className="mt-50 mx-60"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Add Job</ModalHeader>
        <ModalBody>
          <div className="space-y-6 ">
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, jobTitle: e.target.value })
              }
              value={addJobData.jobTitle}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Job Title"
            />
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, salary: e.target.value })
              }
              value={addJobData.salary}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Salary"
            />
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, jobLocation: e.target.value })
              }
              value={addJobData.jobLocation}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Location"
            />
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, publishedDate: e.target.value })
              }
              value={addJobData.publishedDate}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Published Date"
            />
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, lastDate: e.target.value })
              }
              value={addJobData.lastDate}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Last Date"
            />
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, qualification: e.target.value })
              }
              value={addJobData.qualification}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Qualification"
            />
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, experience: e.target.value })
              }
              value={addJobData.experience}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              type="text"
              placeholder="Experience"
            />
            <textarea
              onChange={(e) =>
                setAddJobData({ ...addJobData, jobDescription: e.target.value })
              }
              value={addJobData.jobDescription}
              cols={43}
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              placeholder="Description"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button color="alternative" onClick={addClick}>
            Add Job
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminCareers;
