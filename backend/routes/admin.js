const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// @route GET /api/admin/notifications
router.get('/notifications', async (req, res, next) => {
  try {
    const notes = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
