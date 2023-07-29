import React, { useEffect, useRef, useState } from "react";
import "./BuyPage.scss";
const BuyPage = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  const addToCartHandler = (product) => {
    if (selectedProducts.some((pro) => pro.id === product.id)) {
      setSelectedProducts((pre) => {
        return pre.map((pro) => {
          if (pro.id === product.id && pro.selectedQuantity < pro.quantity) {
            return {
              ...pro,
              selectedQuantity: Number(pro.selectedQuantity) + 1,
            };
          } else {
            return pro;
          }
        });
      });
    } else {
      setSelectedProducts((pre) => [
        ...pre,
        {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          selectedQuantity: 1,
          id: product.id,
          img: product?.img,
        },
      ]);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (searchWord) {
      if (product.name.toLowerCase().includes(searchWord.toLowerCase())) {
        return product;
      }
    } else {
      return products;
    }
  });

  const payHandler = () => {
    let id;
    if (
      selectedProducts.some((pro) => {
        if (pro.selectedQuantity === "") {
          id = pro.id;
          return true;
        }
      })
    ) {
      document.querySelector(`.${id} input`).focus();
      alert("يجب ادخل كميه");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h2 className="text-center text-xl mt-5 font-bold">ابحث عن منتج</h2>
          <input
            type="text"
            style={{ direction: "rtl" }}
            className="mx-auto mt-2 mb-5 p-2 text-right px-5 w-full max-w-md min-w-[280px] "
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="container buypage-main-div">
        <div className="buypage-products-grid-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
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
            })
          ) : (
            <p className="text-xl text-gray-400 font-bold">
              لا يوجد منتج بهذا الأسم
            </p>
          )}
        </div>

        <div className="buypage-products-cart-container">
          <h1>الفاتوره</h1>
          {selectedProducts.length > 0 ? (
            selectedProducts?.map((product) => {
              const id = product.id;
              return (
                <div key={id} id={id} className={`buypage-cart-product ${id}`}>
                  <img src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" />
                  <div className="buypage-card-product-details">
                    <p>الاسم : {product.name} </p>
                    <p>{product.price} : السعر</p>
                    <p>{product.quantity} : الكميه المتاحه</p>
                    <p>
                      <input
                        type="number"
                        min={1}
                        onChange={(e) => {
                          if (e.target.value > product.quantity) {
                            alert("الكميه غير متاحه");
                            return false;
                          } else {
                            setSelectedProducts((pre) => {
                              return pre.map((pro) => {
                                console.log(pro.id === product.id);

                                if (pro.id === product.id) {
                                  return {
                                    ...pro,
                                    selectedQuantity: e.target.value,
                                  };
                                } else {
                                  return pro;
                                }
                              });
                            });
                          }
                        }}
                        value={product.selectedQuantity}
                        max={product.quantity}
                      />
                      : الكميه
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProducts((pre) =>
                          pre.filter((pro) => pro.id !== product.id)
                        );
                      }}
                      className="w-[120px] bg-blue-500 text-white px-5 py-1 rounded-md mt-1 "
                    >
                      أزاله
                    </button>
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
              <button className="btn" onClick={() => payHandler()}>
                دفع
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyPage;
