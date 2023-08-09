import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BuyPage from "./Pages/BuyPage/BuyPage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Invoices from "./Pages/invoices/Invoices";
import Invoice from "./Pages/Invoice";
import { AiFillHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/profile/Profile";
import NoQuantityProduct from "./Pages/noQuantityProduct/NoQuantityProduct";

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

  //get no quantity Products

  const getNoQuantityProducts = async () => {
    await getDocs(collection(db, "noQuantityProducts")).then(
      (noQuantityProduct) => {
        const noQuantity = noQuantityProduct.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNoQuantityProducts(noQuantity);
      }
    );
  };

  useEffect(() => {
    // console.log(`noQuantityProducts : ${noQuantityProducts}`);
  }, [noQuantityProducts]);

  useEffect(() => {
    getProducts();
    getNoQuantityProducts();
  }, []);

  return (
    <div className="main-div">
      <div
        className={`sidebar-div fixed ${sidebarOpen ? "sidebar-open" : "sidebar-close"
          }`}
        // style={{ position: "fixed" }}
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
          <Link to="/noQuantity-product">
            <MdProductionQuantityLimits />
            <p>منتجات فارغه</p>
          </Link>
          <Link to="/profile">
            <CgProfile />
            <p>ملف الشخصى</p>
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
        <Route path="/" element={<Home />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invoices/:id" element={<Invoice />} />
        <Route
          path="/products"
          element={
            <HomePage
              getProducts={getProducts}
              products={products}
              setProducts={setProducts}
            />
          }
        />
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
        <Route
          path="/noQuantity-product"
          element={
            <NoQuantityProduct
              noQuantityProducts={noQuantityProducts}
              setNoQuantityProducts={setNoQuantityProducts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
