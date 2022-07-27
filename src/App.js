import { Route, Routes } from "react-router-dom";
import "./App.css";
// aos animation
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./components/Navbar/NavBar";
import SampleCard from "./components/SampleCard/SampleCard";
import Home from "./pages/home/Home";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Products_details from "./pages/Products_details/Products_details";
import Products from "./pages/Products/Products";

// initialize aos
AOS.init();

function App() {
  return (
    <div className="App">
      <NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route
            path="/products_details"
            element={<Products_details></Products_details>}
          ></Route>
          <Route path="/products" element={<Products></Products>}></Route>
        </Routes>

        {/* <SampleCard /> */}
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default App;
