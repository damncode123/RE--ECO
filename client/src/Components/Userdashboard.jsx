import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Userdashboard.css";

const Userdashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { UserID } = useParams();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/facility/allfacility"
        );
        setFacilities(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-green-200 rounded-lg min-h-screen m-0 p-2 sm:p-6 lg:p-8">
      <h2 className="text-4xl font-bold text-center text-green-800 sm:text-5xl pt-8 font-mono">
        Facilities
      </h2>
      <div className="border-b-8 border-green-800 h-4 w-[150px] mx-auto"></div>
      <div className="divider mx-auto mb-6 sm:mb-8 w-36 sm:w-40 mt-2 sm:mt-4 rounded-full bg-green-600"></div>
      <div className="facility-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div
            key={facility.f_id}
            className="facility-card rounded-3xl shadow-md bg-white"
          >
            <div className="card-info flex flex-col p-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center underline">
                  {facility.name}
                </h3>
                <div className="text-lg font-medium semi-bold text-black-800 mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4238/4238290.png"
                    alt="email"
                    className="w-6 inline-block mr-2"
                  />
                  {facility.email}
                </div>
                <div className="text-lg font-medium semi-bold text-black-800 mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/14027/14027068.png"
                    alt="Address"
                    className="w-7 inline-block mr-2"
                  />
                  {facility.address}
                </div>
                <div className="text-lg font-medium semi-bold text-black-800 mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/211/211746.png"
                    alt="Phone"
                    className="w-7 inline-block mr-2"
                  />
                  {facility.phone}
                </div>
                <div className="text-lg font-medium semi-bold text-black-800 mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1599/1599763.png"
                    alt="weights"
                    className="w-7 inline-block mr-2"
                  />
                  {facility.capacity}
                </div>
              </div>
              <Link
                to={`/User/facility/${facility.f_id}/${UserID}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-800 mt-4"
              >
                Request Facility
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userdashboard;
