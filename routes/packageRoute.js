const express = require('express');
const {
    addPackage,
    updatePackage,
    getAllPackages,
    getAllStatus,
    getPackageStats,
    getAllTrackingIds
} = require('../controllers/PackageController');

const router = express.Router();

/**
 * @swagger
 * /api/package/add:
 *   post:
 *     tags:
 *       - Package Management
 *     summary: Add a new package
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tracking_id:
 *                 type: string
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - tracking_id
 *               - name
 *               - weight
 *               - address
 *               - status
 *     responses:
 *       201:
 *         description: Package created successfully
 */
router.post('/add', addPackage);

/**
 * @swagger
 * /api/package/update:
 *   post:
 *     tags:
 *       - Package Management
 *     summary: Update package status
 *     parameters:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tracking_id:
 *                 type: string
 *               status:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - tracking_id
 *               - status
 *               - description
 *     responses:
 *       200:
 *         description: Package status updated successfully
 */
router.post('/update', updatePackage);

/**
 * @swagger
 * /api/package/getAll:
 *   get:
 *     tags:
 *       - Package Management
 *     summary: Get all packages
 *     responses:
 *       200:
 *         description: List of all packages
 */
router.get('/getAll', getAllPackages);

/**
 * @swagger
 * /api/package/getAllTracking:
 *   get:
 *     tags:
 *       - Package Management
 *     summary: Get all tracking ids
 *     responses:
 *       200:
 *         description: List of all tracking ids
 */
router.get('/getAllTracking', getAllTrackingIds);

/**
 * @swagger
 * /api/package/status/{tracking_id}:
 *   get:
 *     tags:
 *       - Package Management
 *     summary: Get all status updates for a package by tracking ID
 *     parameters:
 *       - in: path
 *         name: tracking_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package tracking ID
 *     responses:
 *       200:
 *         description: List of status updates for the given package
 */
router.get('/status/:tracking_id', getAllStatus);

/**
 * @swagger
 * /api/package/package-stats:
 *   get:
 *     tags:
 *       - Package Management
 *     summary: Get statistics for packages (e.g., in shipping, pending, delivered, total packages)
 *     responses:
 *       200:
 *         description: Package statistics including packages in shipping, pending, delivered, and total packages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 packages_in_shipping:
 *                   type: integer
 *                   example: 10
 *                 pending_packages:
 *                   type: integer
 *                   example: 5
 *                 delivered_packages:
 *                   type: integer
 *                   example: 25
 *                 total_packages:
 *                   type: integer
 *                   example: 40
 */
router.get('/package-stats', getPackageStats);


module.exports = router;