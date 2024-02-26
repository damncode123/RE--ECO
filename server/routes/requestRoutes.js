import express from "express"
const router=express.Router()
import {createRequest,acceptRequest,rejectRequest,getAllRequests} from "../controllers/requestControllers.js"

// Request banane ke lie
router.post('/create-request',createRequest);

// request accept karne ke lie
router.get('/completetransaction/:requestId',acceptRequest);

// Perticular request reject karne ke lia
router.patch('/rejectrequest/:requestId',rejectRequest);

// Facility ko saari request show karne ke lie.
router.get('/getallrequests/:facilityId',getAllRequests);

export default router;