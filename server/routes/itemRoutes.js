const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getItems,
  addItem,
  enquireItem,
} = require('../controllers/itemControllers');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', getItems);
router.post(
  '/add',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 },
  ]),
  addItem
);
router.post('/enquire', enquireItem);

module.exports = router;