const express = require('express');
const contactController = require('../controllers/contactController');
const { protect, restrictTo } = require('../controllers/authContoller');

const router = express.Router();

router.use(protect);
router.use(restrictTo(['user']));

router.route('/').get(contactController.getAllContacts).post(contactController.createContact);
router
	.route('/:id')
	.get(contactController.getContactById)
	.put(contactController.updateContactById)
	.delete(contactController.deleteContactById);

module.exports = router;
