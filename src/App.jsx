import { Route, Routes, useSearchParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import PNF from "./pages/PNF";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import { useState } from "react";
import ViewSingle from "./pages/ViewSingle";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminHome from "./admin/pages/AdminHome";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminApplications from "./admin/pages/AdminApplications";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";

function App() {
  // flag to show home
  const [showHome, setShowHome] = useState(false);

  setTimeout(() => {
    // displaying home only after 5 seconds
    setShowHome(true);
  }, 1000);

  return (
    <>
      <Routes>
        {/* condtional rendering */}
        <Route path="/" element={showHome ? <Home /> : <Loader />} />
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/:id/viewbook" element={<ViewSingle />} />

        <Route path="/admin-books" element={<AdminBooks />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/admin-careers" element={<AdminCareers />} />

        <Route path="/admin-applications" element={<AdminApplications />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

        <Route path="/*" element={<PNF />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
