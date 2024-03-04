const router = require('express').Router();
const { getAllUsers } = require('../controllers/user.controller');
const protectRoute = require('../middleware/protectRoute');


router.get('/',protectRoute,getAllUsers);

module.exports = router;