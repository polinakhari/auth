const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
// @route  GET api/auth
// @desc register users
// @access Public
router.post(
  '/',
  [check('email').exists(), check('password').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errorsarray() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.findOne({ phone: email });
      }
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentioals' });
      }
      isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentioals' });
      }
      res.send('User Authorized');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Erorr');
    }
  }
);

module.exports = router;
