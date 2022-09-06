const path = require('path');
const express = require('express');
const multer = require('multer');
const contactController = require('../controllers/contactController');
const { protect, restrictTo } = require('../controllers/authContoller');

// Uplading files with Multer
const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/photos'));
	},
	filename: (req, file, cb) => {
		const extName = file.mimetype.split('/')[1];
		const filename = `${file.fieldname}-${req.params.id}.${extName}`;

		cb(null, filename);
	},
});
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Only allows image uploads'), false);
	}
};
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});
// const upload = multer({ dest: path.join(__dirname, '../public/photos') });

const router = express.Router();

router.use(protect);
router.use(restrictTo(['user']));

router.route('/:id/thumbnail').post(upload.single('thumbnail'), contactController.handleImageUpload);

router.route('/').get(contactController.getAllContacts).post(contactController.createContact);
router
	.route('/:id')
	.get(contactController.getContactById)
	.put(contactController.updateContactById)
	.delete(contactController.deleteContactById);

module.exports = router;
