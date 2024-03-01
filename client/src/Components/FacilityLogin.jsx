import React, { useState } from "react";
import photo from "../Assets/Facility_E-waste.png";
import { Link ,useNavigate} from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = async () => {
    if (!values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }

    try {
        const response = await fetch('http://localhost:5000/facility/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();

        if (data && data.data && data.data[0] && data.data[0].f_id) {
            navigate(`/facility/${data.data[0].f_id}`);
            console.log('Login successful');
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login');
    }
};


  return (
    <div className="overflow-hidden">
      <body className="bg-green-200 w-full h-screen flex">
        <div className="w-[50vw] h-[100vh] border-red-950 flex flex-col items-center justify-center">
          <div className="box-border h-[630px] w-[390px] p-4 rounded-2xl flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl mt-5 text-green-800 font-bold underline">Login</h1>
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
                placeholder="password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, password: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-2">
              Create new account
              <div className=" text-green-500 underline">
                <Link to="/facility/Signup"> Sign up
                </Link>
              </div>
            </div>
            <b className="text-red-700">{errorMsg}</b>
            <button
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
              className="relative cursor-pointer px-6 py-1 text-xl font-semibold text-white border-2 border-green-800 bg-green-700 rounded-full transition-transform duration-300 ease-in-out overflow-hidden group w-40 h-12"
            >
              {/* <Link to="/facility">Login</Link> */}
              Login
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
