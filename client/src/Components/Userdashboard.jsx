import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import '../Styles/Userdashboard.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Userdashboard = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {UserID}=useParams();
    console.log(UserID);
    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/facility/allfacility');
                console.log(response.data.data);
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
        <div className='bg-blue-100 rounded-lg h-[100vh] m-0'>
          <h2 className='text-4xl font-bold text-center text-blue-700 sm:text-5xl pt-16 font-mono'>Facilities</h2>
          <div className='border-b-8 border-blue-600 h-4 w-[150px] mx-auto'></div>
          <div className="divider mx-auto mb-8 w-40 mt-4 rounded-full bg-blue-600"></div>
          <div className="facility-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
            {facilities.map((facility) => (
              <div key={facility.f_id} className="facility-card rounded-lg shadow-md bg-white">
                <div className="card-info flex flex-col p-6 justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{facility.name}</h3>
                    <div className="flex items-center text-lg font-medium text-gray-600 mb-2">
                      <FaEnvelope className="mr-2" />
                      Email: {facility.email}
                    </div>
                    <div className="flex items-center text-lg font-medium text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      Address: {facility.address}
                    </div>
                    <div className="flex items-center text-lg font-medium text-gray-600 mb-2">
                      <FaPhone className="mr-2" />
                      Phone: {facility.phone}
                    </div>
                    <p className="text-lg font-medium text-gray-600">
                      Capacity: {facility.capacity}
                    </p>
                  </div>
                  <Link
                    to={`/User/facility/${facility.f_id}/${UserID}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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


