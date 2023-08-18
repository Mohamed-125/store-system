import React, { useEffect, useRef, useState } from "react";
import "./BuyPage.scss";
import DataTable from "../../components/DataTable/DataTable";
import { NotificationManager } from "react-notifications";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";

const BuyPage = ({ products, setProducts, getInvoices }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const addToCartHandler = (product) => {
    if (selectedProducts.some((pro) => pro.id === product.id)) {
      setSelectedProducts((pre) => {
        return pre.map((pro) => {
          if (pro.id === product.id && pro.selectedQuantity < pro.quantity) {
            return {
              ...pro,
              selectedQuantity: Number(pro.selectedQuantity) + 1 + "",
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
          sellPrice: product.sellPrice,
          buyPrice: product.buyPrice,
          quantity: product.quantity,
          selectedQuantity: "1",
          id: product.id,
          img: "img",
        },
      ]);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (searchWord) {
        if (product.name.toLowerCase().includes(searchWord.toLowerCase())) {
          return product;
        }
      } else {
        return products;
      }
    })
    .filter((product) => product.quantity !== 0);

  let id;
  const payHandler = async () => {
    if (
      selectedProducts.some((pro) => {
        console.log(pro);
        if (
          pro.selectedQuantity === "" ||
          pro.selectedQuantity.split("")[0] === "0"
        ) {
          id = pro.id;
          return true;
        }
      })
    ) {
      document.querySelector(`input[name="${id}"`).focus();

      alert("يجب ادخل كميه");
    } else {
      const invoiceId = Math.round(Math.random() * 100000000000 + 1);
      console.log(new Date().setHours(0, 0, 0, 0));
      window.print();
      try {
        axios.post("http://localhost:3000/invoices", {
          "invoice-number": invoiceId,
          "invoice-date": new Date().toLocaleString("ar"),
          date: new Date().setHours(0, 0, 0, 0),
          "invoice-price": selectedProducts.reduce((prev, curr) => {
            return prev + curr.sellPrice * Number(curr.selectedQuantity);
          }, 0),
          "invoice-products": selectedProducts,
        });
        getInvoices();

        setProducts((pre) => {
          return pre.map((product) => {
            if (
              selectedProducts.find((selected) => selected.id === product.id)
            ) {
              const target = selectedProducts.find(
                (selected) => selected.id === product.id
              );
              return {
                ...product,
                quantity: product.quantity - target.selectedQuantity,
              };
            } else {
              return product;
            }
          });
        });

        selectedProducts.map((product) => {
          axios.put("http://localhost:3000/products/" + product.id, {
            name: product.name,
            id: product.id,
            sellPrice: product.sellPrice,
            buyPrice: product.buyPrice,
            quantity: product.quantity - product.selectedQuantity,
          });
        });

        NotificationManager.success(
          ` ${invoiceId + "  "}تم انشاء فاتوره برقم `,
          "تم انشاء الفاتوره والدفع بنجاح",
          6000
        );

        setSelectedProducts([]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="printTable">
        <p>التاريخ : {new Date().toLocaleString("ar")} </p>
        <p>رقم الفاتوره : {Math.random() * 43438787 + 1} </p>
        <DataTable
          print={true}
          products={selectedProducts}
          tableHeads={[
            "اسم المنتج",
            "سعر المنتج",
            "كميه المنتج",
            "اجمالي سعر المنتج",
          ]}
        />
        <p className="mb-5 text-xl ">
          الأجمالي :
          {selectedProducts.reduce((prev, curr) => {
            return prev + curr.price * Number(curr.selectedQuantity);
          }, 0)}
          ج.م
        </p>
      </div>
      <div>
        <div className="buypage-search-div">
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
                      <p> السعر : {product.sellPrice}</p>
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
                console.log(product);
                const id = product.id;
                return (
                  <div
                    key={id}
                    id={id}
                    className={`buypage-cart-product ${id}`}
                  >
                    <img src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" />
                    <div className="buypage-card-product-details">
                      <p style={{ direction: "rtl", justifyContent: "start" }}>
                        الاسم : {product.name}{" "}
                      </p>
                      <p>{product.sellPrice} : سعر المنتج</p>
                      <p>
                        {product.sellPrice * product.selectedQuantity} : سعر
                        المنتج الأجمالي
                      </p>
                      <p>{product.quantity} : الكميه المتاحه</p>
                      <p>
                        <input
                          type="number"
                          min={1}
                          name={id}
                          onChange={(e) => {
                            console.log(e.target.value);
                            if (e.target.value > product.quantity) {
                              alert("الكميه غير متاحه");
                              return false;
                            } else {
                              setSelectedProducts((pre) => {
                                return pre.map((pro) => {
                                  if (pro.id === product.id) {
                                    return {
                                      ...pro,
                                      selectedQuantity: e.target.value + "",
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
              <>
                <p className="mb-5 text-xl ">
                  الأجمالي :
                  {selectedProducts.reduce((prev, curr) => {
                    return (
                      prev + curr.sellPrice * Number(curr.selectedQuantity)
                    );
                  }, 0)}{" "}
                  ج.م
                </p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyPage;
