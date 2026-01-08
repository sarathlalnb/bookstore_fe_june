import React, { useEffect, useState } from "react";
import AdminHEader from "../components/AdminHEader";
import AdminSideBar from "../components/AdminSideBar";
import { getAllBooks, getAllUsers } from "../../services/AllApi";

const AdminBooks = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  const [allBooks, setAllBooks] = useState([]);
  const [userData, setUserData] = useState([]);

  const [searchKey, setSearchkey] = useState("");

  useEffect(() => {
    getBookData();
    getUserData();
  }, [searchKey]);

  const getBookData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllBooks(header, searchKey);
      console.log(apiResponse);
      setAllBooks(apiResponse.data.AllBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllUsers(header);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setUserData(apiResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHEader />
      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />
        <div>
          <div className="text-center mt-10">
            <button
              onClick={() => {
                setShowBooks(true);
                setShowUsers(false);
              }}
              className="bg-black text-white p-2 rounded me-5 cursor-pointer"
            >
              Books
            </button>
            <button
              onClick={() => {
                setShowBooks(false);
                setShowUsers(true);
              }}
              className="bg-black text-white p-2 rounded me-5 cursor-pointer"
            >
              Users
            </button>
          </div>
          {showBooks && (
            <div>
              <input
                onChange={(e) => setSearchkey(e.target.value)}
                className="bg-black text-white p-1 rounded-xl "
                placeholder="Search"
                type="text"
              />
              {allBooks?.length > 0 && (
                <div className="grid grid-cols-3 mt-5">
                  {allBooks.map((eachBook) => (
                    <div>
                      <div class="h-[30vh] w-[35vh] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                          <img
                            class="rounded-t-lg"
                            src={eachBook.imgURL}
                            alt="img"
                          />
                        </a>
                        <div class="p-5">
                          <h6 className="mb-1 text-center text-blue-400">
                            {eachBook.title}
                          </h6>
                          <h6 className="mb-1 text-center">
                            {eachBook.abstract}
                          </h6>
                          <h6 className="mb-1 text-center">{eachBook.price}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {showUsers && (
            <div>
              {userData?.length > 0 && (
                <div className="grid grid-cols-4 gap-10 mt-10">
                  {userData?.map((eachUser) => (
                    <div className="border p-5 bg-blue-600">
                      <h1>{eachUser.userName}</h1>

                      <h1>{eachUser.email}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
