const dbService = require('../config/dbService');

const PackageStatus = {
    create: async (tracking_id, status, description) => {
        const sql = 'INSERT INTO package_status (tracking_id, status, description) VALUES (?, ?, ?)';
        return await dbService.query(sql, [tracking_id, status, description]);
    },

    findStatusesByTrackingID: async (tracking_id) => {
        const sql = 'SELECT id, tracking_id, status, description,created_at  FROM package_status WHERE tracking_id = ? ORDER BY id ASC';
        const results = await dbService.query(sql, [tracking_id]);
        return results;
    },
};

module.exports = PackageStatus;