import react, { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import HomePage from "./Pages/HomePage";
import BuyPage from "./Pages/BuyPage/BuyPage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    await getDocs(collection(db, "products")).then((product) => {
      const products = product.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(products);
      console.log(products);
    });
  };
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
        <Route path="/products" element={<Products />} />
        <Route path="/buy-products" element={<BuyPage products={products} />} />
      </Routes>
    </div>
  );
}

export default App;
