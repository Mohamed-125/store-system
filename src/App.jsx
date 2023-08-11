import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BuyPage from "./Pages/BuyPage/BuyPage";
import { collection, getDocs } from "firebase/firestore";
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
import NoQuantityProduct from "./Pages/noQuantityProduct/NoQuantityProduct";
import Login from "./components/login/Login";
import { AuthContext } from "./components/context/AuthContext";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [noQuantityProducts, setNoQuantityProducts] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const getProducts = async () => {
    await getDocs(collection(db, "products")).then((product) => {
      const products = product.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(products);
    });
  };
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  useEffect(()=>{

  },[])
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
<<<<<<< HEAD
=======
    // console.log(`noQuantityProducts : ${noQuantityProducts}`);
  }, [noQuantityProducts ,currentUser]);

  useEffect(() => {
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e
    getProducts();
    getNoQuantityProducts();
  }, []);

  return (
    <div className="main-div container">
      <div
        className={`sidebar-div ${sidebarOpen ? "sidebar-open" : "sidebar-close"
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
          style={{ marginLeft: "auto" }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
          element={
            <Home setSearchDate={setSearchDate} searchDate={searchDate} />
          }
        />
        <Route
          path="/invoices"
          element={
            <Invoices setSearchDate={setSearchDate} searchDate={searchDate} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invoices/:id" element={<Invoice />} />
=======
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/invoices" element={
          <RequireAuth>
            <Invoices />
          </RequireAuth>

        } />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route
          path="/invoices/:id"
          element={
            <RequireAuth>
              <Invoice />
            </RequireAuth>
          }
        />
        <Route path="/products" element={
          <RequireAuth>

            <HomePage
              getProducts={getProducts}
              products={products}
              setProducts={setProducts}
            />
          </RequireAuth>
        }
        />
        <Route
          path="/buy-products"
          element={
            <RequireAuth>
              <BuyPage
                setProducts={setProducts}
                setNoQuantityProducts={setNoQuantityProducts}
                products={products}
                getProducts={getProducts}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/noQuantity-product"
          element={
            <RequireAuth>
              <NoQuantityProduct
                noQuantityProducts={noQuantityProducts}
                setNoQuantityProducts={setNoQuantityProducts}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
