import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import './Home.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Hme.css";
import { toast } from "react-toastify";
import { getLimitedBooks } from "../services/AllApi";
import { Link } from "react-router-dom";

const Home = () => {
  const [homeBooks, setHomeBooks] = useState([]);

  useEffect(()=>{
    getHomeBooks()
  }, []);

  const getHomeBooks = async () => {
    try {
      let apiResponse = await getLimitedBooks();
      if (apiResponse.status == 200) {
        setHomeBooks(apiResponse.data.limitedBooks);

      
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error getting home Books");
    }
  };

  return (
    <>
      <Header />
      <div
        className="bg-[url(https://images.unsplash.com/photo-1532012197267-da84d127e765?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center bg-no-repeat
             flex flex-col justify-center items-center 
             w-screen h-[510px] text-white text-center"
      >
        <h1 className="text-center text-5xl">Wonderful Gifts</h1>
        <h6 className="font-semibold">Give your family and friends a book</h6>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Books"
            className="bg-white p-3 rounded-2xl text-gray-600 w-full pr-10 focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          />
        </div>
      </div>
      <div></div>
      <div>
        <div className="pt-11">
          <h4 className="text-center">NEW ARRIVALS</h4>
          <h5 className="text-center text-3xl">
            Explore Our Latest Collection
          </h5>
        </div>
        <div className="w-100 mt-7 ms-40">
          {homeBooks?.length > 0 && (
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-20">
              {homeBooks?.map((eachBook) => (
                <div class="h-[70vh] w-[35vh] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img class="rounded-t-lg" src={eachBook.imageURL} alt="" />
                  </a>
                  <div class="p-5">
                    <h6 className="mb-1 text-center text-blue-400">
                      {eachBook.title}
                    </h6>
                    <h6 className="mb-1 text-center">{eachBook.abstract}</h6>
                    <h6 className="mb-1 text-center">$ {eachBook.price}</h6>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-7">
          {/* <button className='text-white bg-blue-900 text-center'>Explore More</button> */}
          <Link
            to={'/allbooks'}
            class="px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Explore More
          </Link>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-6 col-sm-12">
              <h4 className="text-center">FEATURED AUTHORS</h4>
              <h2 className="mb-3 text-center">Captivates with every word</h2>
              <p className="mb-3 text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt fuga nostrum illum distinctio eum quidem recusandae
                soluta aliquam laboriosam odit quas, nam molestias fugiat culpa
                rem nulla iste? Modi, molestias. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Sunt earum possimus accusantium
                necessitatibus id neque soluta quibusdam explicabo laborum?
                Deserunt vel quia voluptates dicta incidunt illo fuga pariatur
                sequi error.
              </p>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt fuga nostrum illum distinctio eum quidem recusandae
                soluta aliquam laboriosam odit quas, nam molestias fugiat culpa
                rem nulla iste? Modi, molestias. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Sunt earum possimus accusantium
                necessitatibus id neque soluta quibusdam explicabo laborum?
                Deserunt vel quia voluptates dicta incidunt illo fuga pariatur
                sequi error.
              </p>
            </div>
            <div className="col-6 col-sm-12">
              <img
                src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
                style={{ height: "400px", objectFit: "cover" }}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h5 className="text-center">TESTIMONIALS</h5>
          <h4 className="text-center">See What Others Are Saying</h4>
          <img
            className="h-64 w-64 rounded-full object-cover mx-auto shadow-lg"
            src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
          <h5 className="text-center">Treesa Joseph</h5>
          <div className="container">
            <p className=" text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
              perspiciatis porro eveniet. Optio necessitatibus provident autem,
              quam qui, dicta molestiae quis quia deleniti aliquam magnam
              temporibus mollitia ex repellendus! Dicta. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Consequuntur, deserunt optio
              eum dolorum iure consectetur quia facilis porro modi placeat ea
              quis explicabo maxime voluptatum unde animi nemo aperiam quos!
            </p>
          </div>
        </div>
      </div>
      <Footer />n
    </>
  );
};

export default Home;
