import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import photo from "../Assets/User_E-waste.png";

const Userlogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const handleSubmission = async () => {
    if (!values.email || !values.password) {
      setErrorMsg('Fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        navigate(`/User/${data.data[0].user_id}`);
      } else {
        setErrorMsg(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMsg('Failed to log in');
      alert('Failed to log in');
    }
  };

  return (
    <div className="overflow-hidden">
      <body className="bg-green-200 w-full h-screen flex">
        <div className="w-[50vw] h-[100vh] border-red-950 flex flex-col items-center justify-center">
          <div className="box-border h-[630px] w-[390px] p-4 rounded-2xl flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl mt-10 text-green-800 font-bold underline">Login</h1>
            </div>
            <div className="flex gap-2 mt-3 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14035/14035965.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-3 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969350.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, password: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className='flex gap-2'>
              Already have an account?
              <div className="text-green-800 underline">
                <Link to="/User/Signup"> Signup</Link>
              </div>
            </div>
            <b className="text-red-700">{errorMsg}</b>
            <button
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
              className="relative cursor-pointer px-6 py-1 text-xl font-semibold text-white border-2 border-green-800 bg-green-800 rounded-full transition-transform duration-300 ease-in-out overflow-hidden group w-40 h-12"
            >
              Login
            </button>
          </div>
        </div>
        <div className="mt-28 ml-20">
          <img src={photo} alt="picture" className="w-[500px] h-[500px]" />
        </div>
      </body>
    </div>
  );
}

export default Userlogin;
