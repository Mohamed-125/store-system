import react, { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import Products from "./Pages/Products";
import HomePage from "./Pages/HomePage";
import BuyPage from "./Pages/BuyPage/BuyPage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Invoices from "./Pages/invoices/Invoices";
import Invoice from "./Pages/Invoice";
import { AiFillHome, AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsFillMapFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import ChartBox from "./components/chartBox/ChartBox";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/profile/Profile";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [noQuantityProducts, setNoQuantityProducts] = useState([]);

  const getProducts = async () => {
    await getDocs(collection(db, "products")).then((product) => {
      const products = product.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(products);
    });
  };

  useEffect(() => {
    console.log(`noQuantityProducts : ${noQuantityProducts}`);
  }, [noQuantityProducts]);

  useEffect(() => {
    getProducts();
  }, []);

  return (

    <div className="main-div">
      <div
        className={`sidebar-div ${sidebarOpen ? "sidebar-open" : "sidebar-close"
          }`}
      >
        <div>
          <Link to="/ ">
            <AiFillHome /> <p>الرئيسيه</p>
          </Link>
          <Link to="/products ">
            <AiFillHeart /> <p>المنتجات</p>
          </Link>
          <Link to="/invoices">
            <BsFillMapFill /> <p>فاتوره</p>
          </Link>
          <Link to="/buy-products ">
            <AiOutlineSearch /> <p>بيع المنتجات</p>
          </Link>
          <Link to="/profile">
            <CgProfile />
            <p>Profile</p>
          </Link>
        </div>
        <div
          style={{ padding: "8px" }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/invoices/:id"
          element={<Invoice />}
        />
        <Route path="/products" element={<HomePage
          getProducts={getProducts}
          products={products}
          setProducts={setProducts}
        />} />
        <Route
          path="/buy-products"
          element={
            <BuyPage
              setProducts={setProducts}
              setNoQuantityProducts={setNoQuantityProducts}
              products={products}
              getProducts={getProducts}
            />
          }
        />
      </Routes>
    </div>













    // <div>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <>
    //         <HomePage
    //           getProducts={getProducts}
    //           products={products}
    //           setProducts={setProducts}
    //           />
    //           <Home/>
    //           </>
    //       }
    //     />
    //     <Route path="/invoices" element={<Invoices />} />
    //     <Route path="/invoices/:id" element={<Invoice />} />
    //     <Route path="/products" element={<Products />} />
    //     <Route
    //       path="/buy-products"
    //       element={
    //         <BuyPage
    //           setProducts={setProducts}
    //           setNoQuantityProducts={setNoQuantityProducts}
    //           products={products}
    //           getProducts={getProducts}
    //         />
    //       }
    //     />
    //   </Routes>
    // </div>
  );
}

export default App;
