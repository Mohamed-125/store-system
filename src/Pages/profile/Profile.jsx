// import Signup from "../../components/signup/Signup"

import { Fragment } from "react"

const Profile = () => {
  return (
    <Fragment >
      
      <div className="w-full ">
      <label className="pt-6 block text-center text-gray-700 text-2xl font-bold mb-2" htmlFor="username">
              المعلومات الشخصيه
            </label>
        <form className="bg-white w-2/3 m-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              اسم المستخدم
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value="وائل الشافعى" disabled />
          </div>
          <div className="mb-4">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              الايميل الشخصى
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="الايميل الشخصى " value="waheel@gmail.com" disabled />
          </div>
          <div className="mb-4">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              رقم الهاتف
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="رقم الهاتف" value="+201011497266" disabled />
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </Fragment>
  )
}

export default Profile