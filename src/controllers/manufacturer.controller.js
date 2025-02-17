const Manufacturer = require('../models/manufacturer.model');

exports.createManufacturer = async (req, res) => {
    try {
        const manufacturer = new Manufacturer(req.body);
        await manufacturer.save();
        res.status(201).send(manufacturer);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllManufacturers = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.status(200).send(manufacturers);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getManufacturerById = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        if (!manufacturer) {
            return res.status(404).send();
        }
        res.status(200).send(manufacturer);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a manufacturer by ID
exports.updateManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!manufacturer) {
            return res.status(404).send();
        }
        res.status(200).send(manufacturer);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByIdAndDelete(req.params.id);
        if (!manufacturer) {
            return res.status(404).send();
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};