const Moderator = require('../models/moderator.model');

exports.getAllModerators = async (req, res) => {
    try {
        const moderators = await Moderator.find();
        res.status(200).json(moderators);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving moderators', error });
    }
};

exports.getModeratorById = async (req, res) => {
    try {
        const moderator = await Moderator.findById(req.params.id);
        if (!moderator) {
            return res.status(404).json({ message: 'Moderator not found' });
        }
        res.status(200).json(moderator);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving moderator', error });
    }
};

exports.createModerator = async (req, res) => {
    const newModerator = new Moderator(req.body);
    try {
        const savedModerator = await newModerator.save();
        res.status(201).json(savedModerator);
    } catch (error) {
        res.status(400).json({ message: 'Error creating moderator', error });
    }
};

exports.updateModerator = async (req, res) => {
    try {
        const updatedModerator = await Moderator.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedModerator) {
            return res.status(404).json({ message: 'Moderator not found' });
        }
        res.status(200).json(updatedModerator);
    } catch (error) {
        res.status(400).json({ message: 'Error updating moderator', error });
    }
};

exports.deleteModerator = async (req, res) => {
    try {
        const deletedModerator = await Moderator.findByIdAndDelete(req.params.id);
        if (!deletedModerator) {
            return res.status(404).json({ message: 'Moderator not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting moderator', error });
    }
};