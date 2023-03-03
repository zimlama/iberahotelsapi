import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import CreateHotel from "./Components/Create/CreateHotel";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Destinations from "./Components/Destinations/Destinations";
import DeleteUser from "./Components/DeleteUser/DeleteUser";
import HotelDetails from "../src/Components/HotelDetails/HotelDetails.js";
import AboutUs from "./Components/AboutUs/AboutUs";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Profile from "./Components/Profile";
import Modify from "./Components/ModifyAdmin";
import LocalExperiences from "./Components/LocalExperiences/LocalExperiences";
import CreateRoom from "./Components/Create/CreateRoom";
import CreateComent from "./Components/CreateComment/CreateComment";
import { Pending } from "./Components/PaymentProcess/Pending";
import { Success } from "./Components/PaymentProcess/Success";
import { Error } from "./Components/PaymentProcess/Error";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createHotel" element={<CreateHotel />} />
          <Route exact path="/createRoom" element={<CreateRoom />} />
          <Route exact path="/destinations" element={<Destinations />} />
          <Route exact path="/delete" element={<DeleteUser />} />
          <Route exact path="/hotels/:id" element={<HotelDetails />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/profile" element={<Profile />} />
          {/* <Route exact path="/activities" element={<Reservations/>}/> */}
          <Route exact path="/shoppingcart" element={<ShoppingCart />} />
          <Route exact path="/modify" element={<Modify />} />
          <Route exact path="/activities" element={<LocalExperiences />} />
          <Route exact path="/createcomment" element={<CreateComent />} />
            
          <Route exact path="/pending" element={<Pending />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/fail" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
