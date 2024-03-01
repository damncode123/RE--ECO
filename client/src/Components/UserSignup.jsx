import {React,useState} from 'react'
import photo from "../Assets/User_E-waste.png";
import { Link } from "react-router-dom";
const Usersignup = () => {
        const [values, setValues] = useState({
          email: "",
          password: "",
          address: "",
          phone:"",
        });
        const [errorMsg, setErrorMsg] = useState("");
        const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
      
        const handleSubmission = async () => {
          if (!values.email || !values.password || !values.phone || !values.address) {
            setErrorMsg("Fill all fields");
            return;
          }
        
          try {
            const response = await fetch('http://localhost:5000/user/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            console.log(response);
            if (response.ok) {
              alert('User registered successfully');
              setValues({
                email: '',
                password: '',
                address: '',
                phone: '',
              });
              setErrorMsg('');
            } else {
              alert('Failed to register user');
            }
          } catch (error) {
            console.error('Error registering user:', error);
            setErrorMsg('Failed to register user');
            alert('Failed to register user');
          }
        };
        
  return (
    <div>
      <body className="bg-green-200 w-full h-screen flex">
        <div className="w-[50vw] h-[100vh] flex items-center justify-center">
          <div className="box-border h-[680px] w-[390px] p-4 rounded-2xl flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl mt-12 text-green-800 font-bold underline">Signup</h1>
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
            <div className='flex gap-2'>
              Already have an account?
              <div className="text-green-800 underline">
                <Link to="/User/login"> Login</Link>
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
        <div className="mt-20 ml-20">
          <img src={photo} alt="picture" className="w-[500px] h-[500px]" />
        </div>
      </body>
    </div>
  )
}

export default Usersignup
