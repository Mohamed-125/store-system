import react, { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import HomePage from "./Pages/HomePage";
import BuyPage from "./Pages/BuyPage/BuyPage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Invoices from "./Pages/invoices/Invoices";
import Invoice from "./Pages/Invoice";

function App() {
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
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              getProducts={getProducts}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/:id" element={<Invoice />} />
        <Route path="/products" element={<Products />} />
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
  );
}

export default App;
