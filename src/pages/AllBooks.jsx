import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBooks } from "../services/AllApi";
import { AuthContext } from "../context/AuthContext";



const AllBooks = () => {

  const navigate = useNavigate()
  const {token} = useContext(AuthContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dummyBooks, setDummyBooks] = useState([]);

  const [search,setSearch] = useState('')

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getBookData();
    }
  }, [search]);

  const getBookData = async () => {
    try {
      // let token = localStorage.getItem("token");

      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllBooks(reqHeader,search);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.AllBooks);
        setDummyBooks(apiResponse.data.AllBooks);

        let catArray = apiResponse.data.AllBooks.map(
          (eachBook) => eachBook.category
        );

        let dummyCat = [];
        // to avoid adding same category again and again
        catArray.forEach((eachCategory) => {
          if (!dummyCat.includes(eachCategory)) {
            console.log(eachCategory);
            // setCategories([...categories, eachCategory]); :- avoided this becouse useState doesn't update on the time, so created an array and pushed elements to that array and later updated that array to the state
            dummyCat.push(eachCategory);
          }
        });
        setCategories(dummyCat);
      } else {
        console.log(apiResponse)
        toast.error(apiResponse.response.data.message);
        navigate('/login')
      }
    } catch (error) {
      toast.error("error occurred while calling the api");
      console.log(error);
    }
  };

  const filterBooks = (category) => {
    let filteredBooks = dummyBooks.filter(
      (eachBook) => eachBook.category == category
    );
    setBookData(filteredBooks);
  };

  console.log(categories);

  return (
    <>
      <Header />

      {isLoggedIn ? (
        <>
          {" "}
          <h2 className="text-center mt-4">Collections</h2>
          <div className="flex justify-center mt-4">
            <input
            onChange={(e)=>setSearch(e.target.value)}
              type="text"
              className="bg-white border-2 placeholder:ps-2 w-96 "
              placeholder="Search By Title"
            />
            <button className="bg-blue-950 text-white p-2 px-3 hover:bg-gray-400">
              search
            </button>
          </div>
          <div className="container">
            <div className="flex gap-32" style={{ marginTop: "90px" }}>
              <div id="filterpart">
                <h3>Filters</h3>
                <fieldset className="mt-2">

                  
                  <button
                    onClick={getBookData}
                    className="border px-2 ms-2 bg-yellow-300"
                  >
                    All
                  </button>

                  {/* <legend class="sr-only">Countries</legend> */}
                  {categories?.length > 0 && (
                    <div>
                      {categories?.map((eachCategory, index) => (
                        <div
                          onClick={() => filterBooks(eachCategory)}
                          class="flex items-center "
                        >
                          <input
                            id={index}
                            type="radio"
                            name="countries"
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for={index}
                            class="block ms-2  text-lg font-medium text-gray-900 dark:text-gray-300"
                          >
                            {eachCategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </fieldset>
              </div>
              <div id="cardpart">
                {bookData?.length > 0 && (
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-15">
                    {bookData?.map((eachBook) => (
                      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                          <img
                            class="rounded-t-lg"
                            style={{ width: "100%", height: "300px" }}
                            src={eachBook.imageURL}
                            alt="imageURL"
                          />
                        </a>
                        <div class="px-5 py-2">
                          <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {eachBook.title}
                            </h5>
                          </a>
                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {eachBook.abstract}
                          </p>
                          <button className="text-center px-5 w-full">
                            <Link
                              to={`/${eachBook._id}/viewbook`}
                              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              View Book
                            </Link>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="flex justify-center items-center gap-3">
          <img
            className="w-100"
            src="https://www.big-bang-ads.com/wp-content/uploads/2015/11/login_bt.gif"
            alt=""
          />
          <h1 className="text-3xl text-red-800 font-bold">
            Books are listed only for logined Users
          </h1>
          <Link className="text-blue-700 underline" to={"/login"}>
            {" "}
            Click here to login
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AllBooks;
