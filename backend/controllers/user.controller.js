const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllUsers };