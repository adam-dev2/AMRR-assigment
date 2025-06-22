const Item = require('../models/Item');
const nodemailer = require('nodemailer');

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.addItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const coverImage = req.files['coverImage'][0].path;
    const additionalImages = req.files['additionalImages'].map(f => f.path);

    const item = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages,
    });

    await item.save();
    res.json({ message: 'Item successfully added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
};

exports.enquireItem = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });   
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'staticemail@example.com',
    subject: 'New Enquiry for Item',
    text: `Enquiry for item: ${req.body.itemName}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Enquiry sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
};