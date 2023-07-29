import React, { useEffect, useState } from "react";
import "./BuyPage.scss";
const BuyPage = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  const addToCartHandler = (product) => {
    setSelectedProducts((pre) => [
      ...pre,
      {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        id: product.id,
        img: product?.img,
      },
    ]);
  };

  //   const changeQuantity = (job, id) => {
  //     if (job === "add") {
  //       setSelectedProducts((pre) => {
  //         return pre?.map((product) => {
  //           if (product.id === id) {
  //             return { ...product, price: product.price + 1 };
  //           } else {
  //             return product;
  //           }
  //         });
  //       });
  //     } else if (job === "remove") {
  //     }
  //   };
  return (
    <div className="container buypage-main-div">
      <div className="buypage-products-grid-container">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              id={product.id}
              onClick={() => addToCartHandler(product)}
              className="buypage-product-div"
            >
              <img
                src={
                  product?.img
                    ? product?.img
                    : "https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                }
              />
              <div className="buypage-product-details">
                <p> الاسم : {product.name}</p>
                <p> السعر : {product.price}</p>
                <p> الكميه : {product.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="buypage-products-cart-container">
        <h1>الفاتوره</h1>
        {selectedProducts.length > 0 ? (
          selectedProducts?.map((product) => {
            const id = product.id;
            return (
              <div key={id} className="buypage-cart-product">
                <img src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" />
                <div className="buypage-card-product-details">
                  <p>الاسم : {product.name} </p>
                  <p>{product.price} : السعر</p>
                  <p>
                    <input
                      type="number"
                      min={1}
                      onChange={(e) => {
                        if (e.target.value < 1) {
                          e.target.value = 1;
                        }
                      }}
                      defaultValue={1}
                      max={product.quantity}
                    />
                    : الكميه
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xl text-gray-400 font-bold">
            لم يتم اختيار اي منتجات
          </p>
        )}
        {selectedProducts.length > 0 && (
          <div className="buypage-products-buttons flex gap-4 sm:flex-direction-column">
            <button
              className="error-btn"
              onClick={() => {
                setSelectedProducts([]);
              }}
            >
              الغاء
            </button>
            <button className="btn">دفع</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
