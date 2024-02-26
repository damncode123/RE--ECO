import pool from "../database.js";

// create request mai hi product aur request dono mai data daalna hoga.
// create request user banaiga.

export const createRequest = async function(req, res) {
    const { name, type, price, weight, userId, facilityId } = req.body;
    console.log(name, type, price, weight);

    try {
        // pahle data ewaste mai insert karege.
        const [ewasteResult] = await pool.query('INSERT INTO ewaste (name, type, price, weight) VALUES (?, ?, ?, ?)', [name, type, price, weight]);

        // new vale ki ewaste ki id.
        const ewasteId = ewasteResult.insertId;
        // console.log(ewasteResult);

        // nyi request.
        const [request] = await pool.query('INSERT INTO requests (ewate_id, user_id, fac_id) VALUES (?, ?, ?)', [ewasteId, userId, facilityId]);

        const [req] = await pool.query('SELECT * FROM requests WHERE req_id=?',[request.insertId]);

        res.status(201).send({ message: 'Request accepted successfully', data: req });

    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).send({ message: 'An error occurred while accepting request' });
    }
};

// create acceptRequest mai user,facility,product ka transaction banega
// appectRequest is used by the facility. 

export const acceptRequest = async function(req, res) { 
    const requestId = req.params.requestId;
    try {
        // request ka status change kar do
        await pool.query('UPDATE requests SET status = ? WHERE req_id = ?', ['ACCEPTED', requestId]);

        // request ki details le lo jo transaction mai dalegi
        const [requestResult] = await pool.query('SELECT * FROM requests WHERE req_id = ?', [requestId]);
        const request = requestResult[0];

        // transaction bna do.
        const transactionDetails = await pool.query('INSERT INTO transactions (fac_id, user_id, waste_id, tran_date) VALUES (?, ?, ?, ?)', [request.fac_id, request.user_id, request.ewate_id, new Date()]);

        const [req] = await pool.query('SELECT * FROM requests WHERE req_id=?',[requestId]);

        res.status(200).send({ message: 'Request accepted successfully', request: req });
    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).send({ message: 'An error occurred while accepting request' });
    }
};


export const rejectRequest = async function(req, res) { 
    const requestId = req.params.requestId;
    try {
        // request ka status change kar do
        await pool.query('UPDATE requests SET status = ? WHERE req_id = ?', ['REJECTED', requestId]);

        res.status(200).send({ message: 'Request Rejected successfully'});
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).send({ message: 'An error occurred while rejecting request' });
    }
};

export async function getAllRequests(req, res) {
    const { facilityId } = req.params;
    try {
        const [requests] = await pool.query(`
            SELECT
                r.req_id,
                r.status,
                r.ewate_id,
                r.user_id,
                r.fac_id,
                r.created_at,
                e.name AS ewaste_name,
                e.type AS ewaste_type,
                e.price AS ewaste_price,
                e.weight AS ewaste_weight
            FROM
                requests r
            JOIN
                ewaste e ON r.ewate_id = e.waste_id
            WHERE
                r.fac_id = ? AND r.status = 'PENDING'
        `, facilityId);
       
        console.log(requests);
        res.status(201).send({ message: 'Request fetched successfully', data: requests });
    } catch (error) {
        console.error('Error getting requests', error);
        res.status(500).send({ message: 'An error occurred while getting requests' });
    }
}