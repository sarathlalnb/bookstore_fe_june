import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { updateProfile } from "../services/AllApi";
import { toast } from "react-toastify";


const EditProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );

  const [editData, setEditData] = useState({
    userName: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem("user"));

    console.log(userDetails.userName);

    setEditData(userDetails);
  }, []);


  const handleImage = (e) => {
    // console.log(e.target.files[0]);

    setEditData({ ...editData, profilePic: e.target.files[0] });

    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateUser = async()=>{
    try {
      
      if(editData.password==editData.confirmPassword){
        // proceed to api call

        let token = localStorage.getItem('token')

        let header ={
          Authorization : `Bearer ${token}`,
          'Content-Type' : 'multipart/form-data'
        }

// formData is used because, file uploading is happening here
        let reqBody = new FormData()

        // looping through the object to get each and its value
        for(let key in editData){
          // console.log(key,editData[key])
          //adding each key -value pair to the formData
          reqBody.append(key,editData[key])
        }

        let apiResponse = await updateProfile(editData._id,reqBody,header)
       if(apiResponse.status==200){
        toast.success("profile Updated")

        localStorage.setItem('user',JSON.stringify(apiResponse.data.updatedUser))
        setOpenModal(false)
       }else{
        toast.error(apiResponse.response.data.message)
       }

      }else{
        toast.error("password and confirm password is not same")
      }

    } catch (error) {
      console.log(error)
      toast.error('Error occurred while updating the profile')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded mr-[10%]"
      >
        Edit
      </button>

      <Modal
        className="w-100 mt-20"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <div className="space-y-6 flex flex-col items-center">
            <label htmlFor="imgUp">
              <input
                onChange={(e) => handleImage(e)}
                className="hidden"
                type="file"
                name=""
                id="imgUp"
              />
              <img className="rounded-full w-50" src={preview} alt="" />
            </label>
            <input
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
              value={editData?.userName}
              placeholder="User Name"
              type="text"
              className=" bg-white text-black w-75 p-2 rounded-xl"
            />
            <input
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              value={editData?.password}
              placeholder="Password"
              type="password"
              className=" bg-white text-black w-75 p-2 rounded-xl"
            />
            <input
              onChange={(e) =>
                setEditData({ ...editData, confirmPassword: e.target.value })
              }
              value={editData?.confirmPassword}
              placeholder="Confirm Password"
              type="password"
              className=" bg-white text-black w-75 p-2 rounded-xl"
            />
            <textarea
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
              value={editData?.bio}
              placeholder="Bio"
              className=" bg-white text-black w-75 p-2 rounded-xl"
              name=""
              id=""
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className=" bg-green-700 text-white hover:bg-blue-700 hover:text-white px-4 py-2 rounded mr-[10%]"
            onClick={updateUser}
          >
            Save Changes
          </Button>
          <Button
            className=" bg-red-700 text-white hover:bg-blue-700 hover:text-white px-4 py-2 rounded mr-[10%]"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProfile;
