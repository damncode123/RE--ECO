import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "../Styles/Userdashboard.css";

const Facilitydashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { FacilityID } = useParams();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/request/getallrequests/${FacilityID}`);
        setRequests(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRequests();
  }, [FacilityID]); 

  const handleAccept = async (req_id) => {
    try {
      const response = await fetch(`http://localhost:5000/request/completetransaction/${req_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the request from the state
        setRequests(requests.filter(request => request.req_id !== req_id));
        alert('Request Accepted');
      } else {
        throw new Error('Failed to accept transaction');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Error accepting request');
    }
  };

  const handleDecline = async (req_id) => {
    try {
      const response = await fetch(`http://localhost:5000/request/rejectrequest/${req_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the request from the state
        setRequests(requests.filter(request => request.req_id !== req_id));
        alert('Request Rejected');
      } else {
        throw new Error('Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-green-200 rounded-lg min-h-screen p-6 lg:p-8">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-8 underline">Requests</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {requests.map((Req) => (
          <div key={Req.req_id} className="bg-white w-96 h-68 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold">{Req.status}</h3>
              <p><span className="font-bold">Name: </span>{Req.ewaste_name}</p>
              <p><span className="font-bold">Weight: </span>{Req.ewaste_weight}</p>
              <p className=""><span className="font-bold">Type: </span>{Req.ewaste_type}</p>
              <p><span className="font-bold">Price: </span>{Req.ewaste_price}</p>
              {/* <p><span className="font-bold">Ewaste_ID:</span>{Req.ewaste_id}</p> */}
              <p><span className="font-bold">User_ID: </span>{Req.user_id}</p>
              {/* <p className="font-bold">Request_ID: {Req.req_id}</p> */}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleAccept(Req.req_id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecline(Req.req_id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilitydashboard;
