import React, { useEffect, useState } from "react";
import AdminHEader from "../components/AdminHEader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/AllApi";

const AdminSettings = () => {
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );

  const [profileData,setProfileData] = useState({
    userName:'',
    profilePic:'',
    password:'',
    confirmPassword:''
  })


  useEffect(()=>{
      let userData = JSON.parse(localStorage.getItem('user'))
      setProfileData(userData)
  },[])

  const handleImage = (e) => {
    // console.log(e.target.files[0]);

    setPreview(URL.createObjectURL(e.target.files[0]));

    setProfileData({...profileData,profilePic:e.target.files[0]})

  };


  const onSubmitClick = async()=>{

    try {
      
      if(profileData.userName=="" || profileData.password==""||profileData.confirmPassword==""){
        toast.error('Please Fill The Form')
      }else{
        // check password==confirm password
        if(profileData.password==profileData.confirmPassword){
          // proceed to api call

          let token = localStorage.getItem('token')

          let header ={
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
          }

          let reqBody = new FormData()

          for(let key in profileData){
            reqBody.append(key,profileData[key])
          }

          let apiResponse = await updateProfile(profileData._id,reqBody,header)

          console.log(apiResponse)

          if(apiResponse.status==200){
            toast.success('Successfully updated')

            localStorage.setItem('user',JSON.stringify(apiResponse.data.updatedUser))
            
          }else{
            toast.error(apiResponse.response.data.message)
          }


        }else{
          toast.error('Password and confirm password in not the same')
        }
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <>
      <AdminHEader />

      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />
        <div>
          <h1 className="text-center text-3xl">Settings</h1>
          <div className="grid grid-cols-2 gap-10">
            <div className="ms-10 mt-10">
              <p className="text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                aut aliquam recusandae numquam nostrum harum, minima voluptatem,
                expedita aspernatur dolorem fugiat impedit natus quae neque
                laudantium non voluptatibus optio nesciunt?
              </p>
              <p className="text-justify mt-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                aut aliquam recusandae numquam nostrum harum, minima voluptatem,
                expedita aspernatur dolorem fugiat impedit natus quae neque
                laudantium non voluptatibus optio nesciunt?
              </p>
            </div>
            <div className="bg-gray-700 p-10 mt-10 me-3 rounded-xl">
              <label htmlFor="inp">
                <input 
                onChange={(e)=>handleImage(e)} 
                className="hidden" type="file" name="" id="inp" />
                <img className="w-50" src={preview} alt="" />
              </label>
              <div className="mt-10">
                <input
                value={profileData.userName}


                onChange={(e)=>setProfileData({...profileData,userName:e.target.value})}




                  placeholder="User Name"
                  className="bg-white text-black w-full p-2 rounded-2xl"
                  type="text"
                />
              </div>
              <div className="mt-5">
                <input
                 value={profileData.password}


                onChange={(e)=>setProfileData({...profileData,password:e.target.value})}

                  placeholder="Password"
                  className="bg-white text-black w-full p-2 rounded-2xl"
                  type="text"
                />
              </div>
              <div className="mt-5">
                <input
                 value={profileData.confirmPassword}


                onChange={(e)=>setProfileData({...profileData,confirmPassword:e.target.value})}

                  placeholder="Confirm Password"
                  className="bg-white text-black w-full p-2 rounded-2xl"
                  type="text"
                />
              </div>
              <div className="mt-5 text-center">
                <button className="bg-orange-600 p-2 w-30 rounded-2xl text-xl text-white">
                  Reset
                </button>
                <button onClick={onSubmitClick} className="bg-green-600 ms-3 p-2 w-30 rounded-2xl text-xl text-white">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
