import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { applyJob, getAllJobs } from "../services/AllApi";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Careers = () => {
  const [jobData, setJobData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [applyData, setApplyData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    quailification: "",
    jobRole: "",
    jobID: "",
    resume: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    let apiResponse = await getAllJobs();

    if (apiResponse.status == 200) {
      setJobData(apiResponse.data);
    }
  };

  console.log(applyData);

  const onApplyBtnClick = (job) => {
    setApplyData({ ...applyData, jobID: job._id, jobRole: job.jobTitle });

    // setApplyData({ ...applyData,jobRole: job.jobTitle  }); - we doesnt use this method because useState need some time to update its state value, so in this situation when we update same state multiple times the last updation only takes place.

    setOpenModal(true);
  };

  const applyJobClick = async () => {
    try {
      let header = {
        "Content-Type": "multipart/form-data",
      };

      let reqBody = new FormData();

      for (let key in applyData) {

          reqBody.append(key,applyData[key])
      }

      let apiResponse = await applyJob(reqBody,header)

      if(apiResponse.status==201){
        toast.success('Successfully Applied')
        setOpenModal(false)
      }else{
        toast.error(apiResponse.response.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error("SOmething went wrong while appying job");
    }
  };

  return (
    <>
      <Header />

      <div>
        {jobData?.length > 0 ? (
          <div>
            {jobData.map((eachJob) => (
              <div className="border bg-green-600 mt-10 p-7 mx-10">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-3xl text-center font-bold">
                      {eachJob.jobTitle}
                    </h1>
                    <div className="flex justify-between">
                      <h1 className="text-xl text-center ">{eachJob.salary}</h1>
                      <h1 className="text-xl text-center ">
                        {eachJob.jobLocation}
                      </h1>
                      <Button
                        className="border bg-yellow-500 text-black"
                        onClick={() => onApplyBtnClick(eachJob)}
                      >
                        Apply Now
                      </Button>
                    </div>
                    <div className="flex justify-between text-xl ">
                      <h1>Published Date : {eachJob.publishedDate}</h1>
                      <h1 className="ms-10">
                        Published Date : Date :{eachJob.lastDate}
                      </h1>
                    </div>
                  </div>

                  <div>
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
        ) : (
          <h1>No Jobs Added</h1>
        )}
      </div>
      <Modal
        className="mx-85 mt-65"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Apply Job</ModalHeader>
        <ModalBody>
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, name: e.target.value })
                }
                placeholder="Name"
                className="bg-white border text-black p-1 rounded-xl"
                type="text"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, email: e.target.value })
                }
                type="text"
                placeholder="Email"
                className="bg-white border text-black p-1 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, phoneNumber: e.target.value })
                }
                type="text"
                placeholder="Phone Number"
                className="bg-white border text-black p-1 rounded-xl"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, quailification: e.target.value })
                }
                type="text"
                placeholder="Qualification"
                className="bg-white border text-black p-1 rounded-xl"
              />
              <div className="flex text-white">
                <label htmlFor="resume">Resume :</label>
                <input
                  onChange={(e) =>
                    setApplyData({ ...applyData, resume: e.target.files[0] })
                  }
                  type="file"
                  name="resume"
                  id="resume"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={applyJobClick}>Apply</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Careers;
