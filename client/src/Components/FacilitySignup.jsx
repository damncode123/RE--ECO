import React, { useState } from "react";
import photo from "../Assets/Facility_E-waste.png";
import { Link } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    capacity: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.password || !values.capacity || !values.address || !values.phone) {
      setErrorMsg("Fill all fields");
      console.log(values)
      return;
    }

    fetch('http://localhost:5000/facility/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (response.ok) {
        alert('Registration successful');
        setValues({
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          capacity: ""
        });
        setErrorMsg("");
      } else {
        throw new Error('Failed to register');
      }
    })
    .catch(error => {
      console.error('Error registering:', error);
      alert('Failed to register');
    });
  };


  return (
    <div className="overflow-hidden">
      <body className="bg-green-200 w-full h-screen flex">
        <div className="w-[50vw] h-[100vh] flex items-center justify-center">
          <div className="box-border h-[680px] w-[390px] p-4 rounded-2xl flex flex-col gap-5">
            <div className="text-center">
              <h1 className="text-3xl mt-1 text-green-800 font-bold underline">Signup</h1>
            </div>
            <div className="flex gap-2 mt-1 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969079.png"
                alt="name"
                className="w-8 h-8 rounded-xl"
              />
              <input
                type="text"
                placeholder="Name"
                value={values.name}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-2 mt-1 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14035/14035965.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-1 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969350.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, password: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
              
            </div>
            <div className="flex gap-2 mt-1 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14090/14090489.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Address"
                value={values.address}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    address: event.target.value,
                  }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-1 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14360/14360764.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={values.phone}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, phone: event.target.value}))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
              
            </div>
            <div className="flex gap-1 mt-1 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1599/1599763.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="Number"
                placeholder="capacity"
                value={values.capacity}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, capacity: event.target.value}))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-2">
              Already have an account?
              <div className="text-green-800 underline">
                <Link to="/facility/login"> Login</Link>
              </div>
            </div>
            <b className="text-red-700 m-0">{errorMsg}</b>
            <button
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
              className="relative cursor-pointer px-6 py-1 text-xl font-semibold text-white border-2 border-green-800 bg-green-800 rounded-full transition-transform duration-300 ease-in-out overflow-hidden group w-40 h-12"
            >
              Register
            </button>
          </div>
        </div>
        <div className="mt-8 ml-14">
          <img src={photo} alt="picture" className="w-[600px] h-[600px]" />
        </div>
      </body>
    </div>
  );
}
