const Location = require('../models/locationModel');
const Geofence = require('../models/geofenceModel');
const Floorplan = require('../models/floorplanModel');
const Router = require('../models/routerModel');
const errorResponse = require('../libs/errorHandler');
const updateEquipments = require('../libs/updateEquipments');
const calculateSafety = require('../libs/calculateSafety');
const triangulation = require('../libs/triangulation');

// create document for a location in db
// use schema defined in models/locationModel.js
const locationAdd = async (req, res) => {
    // using mongoose
    try {
        const { wifiScan } = req.body;
        const macsInReq = wifiScan.map(scan => scan.bssid);
        const routers = await Router.find({ bssid: { $in: macsInReq } });
        const routerBssids = routers.map(router => router.bssid);
        const wifiScanWithKnownRouters = wifiScan.filter(scan => routerBssids.includes(scan.bssid));
        const threeStrongestScans = wifiScanWithKnownRouters.sort((a, b) => (-a.rssi) + b.rssi)
            .slice(0, 3);
        if (threeStrongestScans.length < 3) {
            res.status(400).json({
                message: 'Wifiscan did not contain at least 3 routers that are in the system',
            });
            return;
        }
        const threeRouters = threeStrongestScans
            .map(scan => routers.find(router => router.bssid === scan.bssid));

        const { xScale, yScale } = await Floorplan.findOne({}).select({ xScale: 1, yScale: 1 });

        // TODO: calculate position: x, y
        const [x, y] = triangulation.triangulate(threeStrongestScans, threeRouters, xScale, yScale);
        // const x = Math.random();
        // const y = Math.random();

        // TODO: calculate if worn
        const isWorn = await calculateSafety.isWorn(req.body.weightSensor,
            req.body.temperatureSensor);

        // calculate safe area
        let safetyStatus = 'safe';
        if (!isWorn) {
            const geofence = await Geofence.findOne({});
            if (geofence !== null) {
                safetyStatus = calculateSafety.positionStatus(x, y, geofence.boundaries);
            }
        }

        const updates = {
            isWorn: isWorn,
            safetyStatus: safetyStatus,
            latestX: x,
            latestY: y,
        };

        // get io object that was attached to app in index.js, app is attached to req
        const io = req.app.get('io');

        // update equipment by mac address and push changes to dashboard
        // returns updated equipment if successful, null if equipment not found
        const updatedEquipment = await updateEquipments.updateSingle(req.body.mac, updates, io);

        // check mac/equipId in system
        // get assignedEmployeeId?
        if (updatedEquipment === null) {
            res.status(404).json({
                message: `Could not find equipment with mac = ${req.body.mac}`,
            });
            return;
        }

        const location = new Location({
            mac: req.body.mac,
            wifiScan: req.body.wifiScan,
            weightSensor: req.body.weightSensor,
            equipId: updatedEquipment.equipId, // swagger
            name: updatedEquipment.name, // swagger
            assignedEmployeeId: updatedEquipment.assignedEmployeeId,
            isWorn: isWorn,
            safetyStatus: safetyStatus,
            x: x,
            y: y,
        });
        const newLocation = await location.save();

        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${newLocation.id}`);
        res.status(201).json({
            message: `Added location with id = ${newLocation.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get location document by employeeId
const locationGetByEmployeeId = async (req, res) => {
    try {
        // aggregate?
        const locations = await Location.find({ assignedEmployeeId: req.params.employeeId });
        if (!Array.isArray(locations) || locations.length < 1) {
            res.status(404).json({
                message: `Could not find location with assignedEmployeeId = ${req.params.employeeId}`,
            });
            return;
        }
        res.status(200).json(locations);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get location document by equipId
const locationGetByEquipId = async (req, res) => {
    try {
        // aggregate?
        const locations = await Location.find({ equipId: req.params.equipId });
        if (!Array.isArray(locations) || locations.length < 1) {
            res.status(404).json({
                message: `Could not find location with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json(locations);
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    locationAdd,
    locationGetByEmployeeId,
    locationGetByEquipId,
};
