import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { addBook, getSoldBooks } from "../services/AllApi";
import EditProfile from "../components/EditProfile";
import { AuthContext } from "../context/AuthContext";



const Profile = () => {
  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [bookStatusFlag, setBookStatusFlag] = useState(false);
  const [purchaseFlag, setPurchaseFlag] = useState(false);

  const [soldBookData,setSoldBookData] = useState([])

  const [userData, setUserData] = useState({});

  const {token} = useContext(AuthContext)

  const [preview, setPreview] = useState(
    "https://demos.creative-tim.com/vue-black-dashboard-pro/img/image_placeholder.jpg"
  );

  const [previewList, setPreviewList] = useState([]);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: 0,
    abstract: "",
    noOfPages: 0,
    imageURL: "",
    uploadedImages: [],
    discountPrice: 0,
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
  });

  useEffect(() => {
    loadProfileData();
    getSoldBooksList()
  }, []);

  const loadProfileData = () => {
    let userDetails = localStorage.getItem("user");

    userDetails = JSON.parse(userDetails);

    setUserData(userDetails);
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);

    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });

    setPreview(URL.createObjectURL(e.target.files[0]));

    if (previewList.length <= 2) {
      setPreviewList([...previewList, URL.createObjectURL(e.target.files[0])]);
    }
  };

  const onAddBookClick = async () => {
    try {
      if (
        bookData.title == "" ||
        bookData.ISBN == "" ||
        bookData.abstract == "" ||
        bookData.author == "" ||
        bookData.category == "" ||
        bookData.discountPrice == 0 ||
        bookData.imageURL == "" ||
        bookData.language == "" ||
        bookData.noOfPages == 0 ||
        bookData.price == 0 ||
        bookData.publisher == "" ||
        bookData.uploadedImages == []
      ) {
        toast.warning("please fill the form");
      } else {
        // proceed to api call.

        // create a new formdata to handle file uploads
        let reqBody = new FormData();

        // loops through the bookdata obj to access all the keys(title,author etc..)
        for (let key in bookData) {
          // we need all keys exept the key containing the file(because logic is different for uploadedImages since it is array of files, we need to loop through the array and get each files)
          if (key != "uploadedImages") {
            // add each key and its value to reqBody, bracket notation is used
            reqBody.append(key, bookData[key]);
          } else {
            bookData.uploadedImages.forEach((eachFile) => {
              reqBody.append("uploadedImages", eachFile);
            });
          }
        }
        // get the token for providing headers

        // header fr api call
        let header = {
          // bearer token and multipart/formdata
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };

        let apiResponse = await addBook(reqBody, header);
        if (apiResponse.status == 201) {
          toast.success("Successfully Added the Book");
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error occureed while adding book");
    }
  };


  const getSoldBooksList = async()=>{
    try {
      

      let header = {
        Authorization :`Bearer ${token}`
      }

      let apiResponse = await getSoldBooks(header)

      if(apiResponse.status==200){
          // store the data in a state
          setSoldBookData(apiResponse.data)
      }else{
        toast.error(apiResponse.response.data.message)
      }

    } catch (error) {
      console.log(error)
        toast.error("Error occureed while getting sold book details");
    }
  } 

  return (
    <>
      <Header />

      <div className="bg-black h-52">
        <img
          className="w-60 relative rounded-full top-18 start-11"
          src={userData?.profilePic}
          alt=""
        />
      </div>

      <div className="md:mx-24 mx-7">
        <div className="mt-28 flex justify-between">
          <h1 className="text-4xl">
            {userData?.userName}
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#B197FC" }}
            />
          </h1>

          <EditProfile />
        </div>
        <p className="mt-5">{userData?.bio}</p>
      </div>
      <div className="flex justify-center my-14">
        <div className="shadow-2xl">
          <button
            onClick={() => {
              setSellBookFlag(true);
              setBookStatusFlag(false);
              setPurchaseFlag(false);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-300 hover:text-gray-900"
          >
            Sell Book
          </button>

          <button
            onClick={() => {
              setSellBookFlag(false);
              setBookStatusFlag(true);
              setPurchaseFlag(false);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-300 hover:text-gray-900"
          >
          Sold Books
          </button>

          <button
            onClick={() => {
              setSellBookFlag(false);
              setBookStatusFlag(false);
              setPurchaseFlag(true);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-300 hover:text-gray-900"
          >
            Purchase History
          </button>
        </div>
      </div>

      {sellBookFlag && (
        <div className="p-6 bg-gray-200 shadow-lg rounded-lg mx-[10%] mb-20">
          <h1 className="text-3xl font-bold mb-6 text-center">Book Details</h1>
          {/* leftt */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
                type="text"
                placeholder="Title"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                type="text"
                placeholder="Author"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, noOfPages: e.target.value })
                }
                type="number"
                placeholder="No of Pages"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, imageURL: e.target.value })
                }
                type="text"
                placeholder="Image URL"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <input
                onChange={(e) =>
                  setBookData({ ...bookData, price: e.target.value })
                }
                type="number"
                placeholder="Price"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <input
                onChange={(e) =>
                  setBookData({ ...bookData, discountPrice: e.target.value })
                }
                type="number"
                placeholder="Discount Price"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <textarea
                onChange={(e) =>
                  setBookData({ ...bookData, abstract: e.target.value })
                }
                placeholder="Abstract"
                className="w-full p-3 rounded bg-white shadow-sm h-28"
              />
            </div>
            {/* rgt */}
            <div className="flex-1 space-y-4">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, publisher: e.target.value })
                }
                type="text"
                placeholder="Publisher"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, language: e.target.value })
                }
                type="text"
                placeholder="Language"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, ISBN: e.target.value })
                }
                type="text"
                placeholder="ISBN"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
                type="text"
                placeholder="Category"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <label htmlFor="imgu">
                <img className="w-50" src={preview} alt="" />

                <input
                  className="hidden"
                  onChange={(e) => handleImage(e)}
                  type="file"
                  name=""
                  id="imgu"
                />
              </label>
              <div className="flex gap-2 mt-3">
                {previewList.length > 0 &&
                  previewList.map((eachPreview) => (
                    <img className="w-25" src={eachPreview} alt="" />
                  ))}

                {previewList.length > 0 && previewList.length <= 2 && (
                  <label htmlFor="imgq">
                    <img
                      className="w-10"
                      src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-plus-icon-png-image_515260.jpg"
                      alt=""
                    />
                    <input
                      className="hidden"
                      onChange={(e) => handleImage(e)}
                      type="file"
                      name=""
                      id="imgq"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex gap-4">
              <button className=" bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600 hover:text-white">
                Reset
              </button>

              <button
                onClick={onAddBookClick}
                className=" bg-green-700  text-white px-4 py-2 rounded  hover:bg-green-800  hover:text-black"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {bookStatusFlag && <div>
        
        
        {
          soldBookData.length>0 && 
          <div>
            {
              soldBookData.map((eachBook)=>(
                <div>
                  <h1>{eachBook.bookName}</h1>
                  <h1>{eachBook.bookId}</h1>
                </div>
              ))
            }
          </div>
        }

        </div>}

      {purchaseFlag && <div>Purchase History</div>}
      <Footer />
    </>
  );
};

export default Profile;
