const Package = require('../models/Package');
const PackageStatus = require('../models/PackageStatus');

exports.addPackage = async (req, res) => {
    try {
        const { tracking_id, name, weight, address, status } = req.body;
        if (!tracking_id || !name || !address || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newPackage = await Package.create(tracking_id, name, weight, address, status);
        res.status(201).json({ message: 'Package created successfully', package: newPackage });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { tracking_id, status, description } = req.body;

        if (!tracking_id || !status || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await Package.updatePackageByID(tracking_id, status);
        await PackageStatus.create(tracking_id, status, description);

        res.status(200).json({ message: 'Package status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.getAll();
        res.status(200).json({ packages });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.getAllStatus = async (req, res) => {
    try {
        const { tracking_id } = req.params;

        if (!tracking_id) {
            return res.status(400).json({ error: 'Tracking ID is required' });
        }

        const statuses = await PackageStatus.findStatusesByTrackingID(tracking_id);
        res.status(200).json({ tracking_id, statuses });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.getPackageStats = async (req, res) => {
    try {
        const packagesInShippingCount = await Package.getPackagesInShippingCount();
        const pendingPackagesCount = await Package.getPendingPackagesCount();
        const deliveredPackagesCount = await Package.getDeliveredPackagesCount();
        const totalPackagesCount = await Package.getTotalPackagesCount();

        const combinedData = {
            packages_in_shipping: packagesInShippingCount,
            pending_packages: pendingPackagesCount,
            delivered_packages: deliveredPackagesCount,
            total_packages: totalPackagesCount
        };

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.getAllTrackingIds = async (req, res) => {
    try {
        const packages = await Package.getTrackingIds();
        res.status(200).json({ packages });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};