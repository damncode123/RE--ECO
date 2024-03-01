import React, { useState } from "react";
import { useParams } from "react-router-dom";
const RequestFacility = () => {
  const [values, setValues] = useState({
    weight: "",
    type: "",
    name: "",
    price: "",
  });

  const { Facility_ID, UserID } = useParams();
  console.log(Facility_ID, UserID);

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.weight || !values.type || !values.name || !values.price) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try {
      const response = await fetch(
        "http://localhost:5000/request/create-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            facilityId: Facility_ID,
            userId: UserID,
          }),
        }
      );

      if (response.ok) {
        alert("Request created successfully");
        // Clear form fields after successful submission
        setValues({
          weight: "",
          type: "",
          name: "",
          price: "",
        });
      } else {
        alert("Failed to create request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to create request");
    }
    setSubmitButtonDisabled(false);
  };

  return (
    <div className="overflow-hidden">
      <body className="bg-green-200 w-full h-screen flex justify-center items-center">
        <div className="w-[50vw] h-[100vh] border-red-950 flex flex-col items-center justify-center">
          <div className="box-border h-[630px] w-[390px] p-4 rounded-2xl flex flex-col gap-3">
            <div className="text-center">
              <h1 className="text-3xl mt-5 text-green-800 font-bold">
                Enter Product details
              </h1>
            </div>
            <div className="flex gap-2 mt-3 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/870/870142.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="Number"
                placeholder="Weight"
                value={values.weight}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, weight: event.target.value }))
                }
                className="w-80 h-4 rounded-xl p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-3 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2015/2015862.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Type"
                value={values.type}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, type: event.target.value }))
                }
                className="w-80 h-4 rounded-xl p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-3 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2766/2766966.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Name"
                value={values.name}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
                className="w-80 h-4 rounded-xl p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-3 bg-white rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4305/4305629.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="Number"
                placeholder="Price"
                value={values.price}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, price: event.target.value }))
                }
                className="w-80 h-4 rounded-xl p-4 border-none outline-none"
              />
            </div>

            <b className="text-red-700">{errorMsg}</b>
            <button
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
              className="relative cursor-pointer px-6 py-1 text-xl font-semibold text-white border-2 border-green-800 bg-green-800 rounded-full transition-transform duration-300 ease-in-out overflow-hidden group w-40 h-12"
            >
              Submit
            </button>
          </div>
        </div>
      </body>
    </div>
  );
};

export default RequestFacility;
