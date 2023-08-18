import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BuyPage from "./Pages/BuyPage/BuyPage";
import { db } from "./firebase";
import Invoices from "./Pages/invoices/Invoices";
import Invoice from "./Pages/Invoice";
///////////////////////////////////////// icons////////////////////////////////
import { AiFillHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/profile/Profile";
// import NoQuantityProduct from "./Pages/noQuantityProduct/NoQuantityProduct";
import axios from "axios";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [modal, setModal] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const getProducts = async () => {
    axios
      .get("http://localhost:3000/products")
      .then((products) => {
        console.log(products.data);
        setProducts(products.data);
      })
      .catch((error) => console.log("error", error));
  };
  const getInvoices = async () => {
    await axios
      .get("http://localhost:3000/invoices")
      .then((invoices) => {
        console.log(invoices.data);
        setInvoices(invoices.data.reverse());
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getInvoices();
    getProducts();
  }, []);

  return (
    <div className="main-div container">
      <div
        className={`sidebar-div ${
          sidebarOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >
        <div>
          <Link to="/ ">
            <AiFillHome /> <p>الرئيسيه</p>
          </Link>
          <Link to="/products ">
            <FaProductHunt /> <p>المنتجات</p>
          </Link>
          <Link to="/invoices">
            <FcSalesPerformance /> <p>فاتوره</p>
          </Link>
          <Link to="/buy-products ">
            <FaFileInvoiceDollar /> <p>بيع المنتجات</p>
          </Link>
          <Link to="/no-quantity-products">
            <span
              className="no-quantity-icon"
              length={
                products.filter((product) => product.quantity === 0).length
              }
            >
              {" "}
              <MdProductionQuantityLimits />
            </span>
            <p>منتجات فارغه</p>
          </Link>
          <Link to="/profile">
            <CgProfile />
            <p>ملف الشخصى</p>
          </Link>
        </div>
        <div
          style={{ marginLeft: "auto" }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSearchDate={setSearchDate}
              products={products}
              searchDate={searchDate}
              invoices={invoices}
            />
          }
        />
        <Route
          path="/invoices"
          element={
            <Invoices
              setSearchDate={setSearchDate}
              invoices={invoices}
              setInvoices={setInvoices}
              searchDate={searchDate}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invoices/:id" element={<Invoice />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route
          path="/buy-products"
          element={
            <BuyPage
              setProducts={setProducts}
              getInvoices={getInvoices}
              products={products}
              getProducts={getProducts}
            />
          }
        />
        <Route
          path="/products"
          element={
            <HomePage
              getProducts={getProducts}
              products={products}
              setModal={setModal}
              modal={modal}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/no-quantity-products"
          element={
            <HomePage
              getProducts={getProducts}
              products={products}
              setModal={setModal}
              modal={modal}
              noQuantity={true}
              setProducts={setProducts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
