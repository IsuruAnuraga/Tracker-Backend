const dbService = require('../config/dbService');

const Package = {

    create: async (tracking_id, name, weight, address, status) => {
        const sql = 'INSERT INTO package (tracking_id, name, weight, address, status) VALUES (?, ?, ?, ?, ?)';
        return await dbService.query(sql, [tracking_id, name, weight, address, status]);
    },

    updatePackageByID: async (tracking_id, status) => {
        const sql = 'UPDATE package SET status = ? WHERE tracking_id = ?';
        return await dbService.query(sql, [status, tracking_id]);
    },

    getAll: async () => {
        const sql = 'SELECT id, tracking_id, name, weight, address, created_at, status FROM package ORDER BY id DESC';
        const results = await dbService.query(sql);
        return results;
    },

    findPackageByID: async (id) => {
        const sql = 'SELECT id, tracking_id, name, weight, address, status FROM package WHERE id = ?';
        const results = await dbService.query(sql, [id]);
        return results;
    },

    getPackagesInShippingCount: async () => {
        const sql = 'SELECT COUNT(*) AS count FROM package WHERE status = "shipped"';
        const result = await dbService.query(sql);
        return result[0].count;
    },

    getPendingPackagesCount: async () => {
        const sql = 'SELECT COUNT(*) AS count FROM package WHERE status = "pending"';
        const result = await dbService.query(sql);
        return result[0].count;
    },

    getDeliveredPackagesCount: async () => {
        const sql = 'SELECT COUNT(*) AS count FROM package WHERE status = "delivered"';
        const result = await dbService.query(sql);
        return result[0].count;
    },

    getTotalPackagesCount: async () => {
        const sql = 'SELECT COUNT(*) AS count FROM package';
        const result = await dbService.query(sql);
        return result[0].count;
    },

    getTrackingIds: async () => {
        const sql = 'SELECT tracking_id FROM package';
        const results = await dbService.query(sql);
        return results;
    },
};

module.exports = Package;