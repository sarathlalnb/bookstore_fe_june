import React, { useContext, useEffect, useState } from "react";

// useParams Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes.
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleBook, makePayment } from "../services/AllApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { BaseUrl } from "../services/BaseURl";

import { AuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const ViewSingle = () => {
  const [bookDetail, setBookDetail] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const { token } = useContext(AuthContext);

  const [imageArray, setImageArray] = useState([]);

  let { id } = useParams();

  console.log(id);

  useEffect(() => {
    getBookDetails();
  }, []);
  console.log(bookDetail.uploadedImages);

  const getBookDetails = async () => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getSingleBook(id, header);
      if (apiResponse.status == 200) {
        setBookDetail(apiResponse.data);
        setImageArray(apiResponse.data.uploadedImages);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong getting book details");
    }
  };

  const onBuyClick = async () => {
    const stripe = await loadStripe(
      "pk_test_51Sl1djQtOOXQYcIGQPDqLdhjL72nzRiIaA34Y1iqyqYbliTi07TuarpRkj5YBdF9xptQKB9ffhqcj0IUy1kjsKjw00zwKpaK7H"
    );

    let header = {
      Authorization: `Bearer ${token}`,
    };

    let reqBody = {
      bookId: bookDetail._id,
      bookName: bookDetail.title,
      bookDesc: bookDetail.abstract,
      sellerMail: bookDetail.userMail,
      bookImage: bookDetail.imageURL,
      price: bookDetail.price,
      discountPrice: bookDetail.discountPrice,
    };

    let apiResponse = await makePayment(reqBody, header);

    if (apiResponse.status == 200) {
      let session = apiResponse.data.session;
      window.location.href = session.url;
      // success opertion
    } else {
      toast.error(apiResponse.response.data.message);
    }
  };

  return (
    <div>
      <div className="py-10 px-5 md:px-20">
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12 border">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold capitalize">
              {bookDetail?.title}
            </h1>
            <p className="text-blue-600 text-lg mt-1">– {bookDetail?.author}</p>
            <div className="flex justify-end">
              <button onClick={() => setOpenModal(true)}>
                <img
                  className="w-10"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4IIejagLN1oKALvM8v-svcSOPXYflrpquWg&s"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="md:col-span-1 flex justify-center">
              <img
                src={bookDetail?.imageURl}
                alt="title"
                className="w-72 h-96 object-cover rounded-lg border shadow-md"
              />
            </div>

            <div className="md:col-span-3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg">
                <div>
                  <p>
                    <strong>Publisher:</strong> {bookDetail?.publisher}
                  </p>
                  <p>
                    <strong>Seller Mail:</strong> {bookDetail?.userMail}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Language:</strong> {bookDetail?.language}
                  </p>
                  <p>
                    <strong>Real Price:</strong>
                    {bookDetail?.price}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>No. of Pages:</strong> {bookDetail?.noOfPages}
                  </p>
                  <p>
                    <strong>ISBN:</strong>
                    {bookDetail?.ISBN}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {bookDetail?.abstract}
              </p>

              <div className="flex gap-5 mt-8">
                <Link
                  to="/Allbooks"
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-800 flex items-center gap-2"
                >
                  ◀ Back
                </Link>

                <button
                  onClick={onBuyClick}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-800"
                >
                  Buy {bookDetail.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="mt-50"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Images</ModalHeader>
        <ModalBody>
          {imageArray.map((eachImage) => (
            // localhost::3000/uploads/imageUrl
            <img
              className="w-100"
              src={`${BaseUrl}/uploads/${eachImage}`}
              alt=""
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewSingle;
