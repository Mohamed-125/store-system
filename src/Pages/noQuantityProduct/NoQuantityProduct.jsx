import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const NoQuantityProduct = () => {

  const [noQuantityProducts, setNoQuantityProducts] = useState([]);

  const getNoQuantityProducts = async () => {

    await getDocs(collection(db, "noQuantityProducts"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setNoQuantityProducts(newData);
        console.log(noQuantityProducts, newData);
      })

  }

  useEffect(() => {
    getNoQuantityProducts();
  }, [])

  // const [products, setProducts] = useState([]);
  // const getProducts = async () => {
  //     await getDocs(collection(db, "noQuantityProducts")).then((product) => {
  //       const products = product.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setProducts(products);
  //     });
  //   };

  //   useEffect(()=>{
  //     console.log(products);
  //     getProducts()
  //   },[])
  return (


    <>
      <div className="relative overflow-x-auto">
        <table  className="w-full text-md text-right bg-black text-gray-500 text-gray-900">
          <thead className="text-md text-gray-700 uppercase bg-slate-900 text-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">اسم المنتج</th>
              <th scope="col" className="px-6 py-3">السعر</th>
              <th scope="col" className="px-6 py-3">الكميه المتاحه</th>
            </tr>
          </thead>
          {
            noQuantityProducts?.map((item) => (
              <>
                <tbody key={item.proudctId}>
                  <tr key={item.proudctId} className="bg-white border-b bg-slate-50 border-black-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">{item.name}</th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">{item.price}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">{item.quantity}</td>
                  </tr>
                </tbody>
              </>
            ))
          }

        </table>
      </div>
    </>


  )
}

export default NoQuantityProduct