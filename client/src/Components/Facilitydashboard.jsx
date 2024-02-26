import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "../Styles/Userdashboard.css";

const Facilitydashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {FacilityID}=useParams();

useEffect(() => {
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/request/getallrequests/${FacilityID}`);
      setRequests(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  fetchRequests();
}, []); 

const handleAccept = async (req_id) => {
  try {
      const response = await fetch(`http://localhost:5000/request/completetransaction/${req_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response) {
          alert('Transaction Completed');
      } else {
          throw new Error('Failed to complete transaction');
      }
  } catch (error) {
      console.error('Error completing transaction:', error);
      alert('Failed to complete transaction');
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
          console.log(response);

          if (response) {
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
    <div>
      {!requests ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2 className="facility-heading">REQUESTS</h2>
          <div className="facility-cards">
            {requests.map((Req) => (
              <div key={Req.req_id} className="facility-card">
                <h3>{Req.status}</h3>
                <p className="font-bold">Name: {Req.ewaste_name}</p>
                <p className="font-bold">Weight: {Req.ewaste_weight}</p>
                <p className="font-bold">Type: {Req.ewaste_type}</p>
                <p className="font-bold">Price: {Req.ewaste_price}</p>
                <p className="font-bold">Ewaste_ID: {Req.ewaste_id}</p>
                <p className="font-bold">user_ID: {Req.user_id}</p>
                <p className="font-bold">Request_ID: {Req.req_id}</p>
                {/* <p className="font-bold">Created_ID: {Req.created_at}</p> */}
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
      )}
    </div>
  );
}  
export default Facilitydashboard;
