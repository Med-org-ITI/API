const express = require('express');

const authService = require('../controller/authController');
const {
  getNewsItem,
  getNewsItems,
  createNewsItem,
} = require('../controller/newsItemController');

const router = express.Router();

router
  .route('/')
  .get(getNewsItems)
  .post(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    createNewsItem
  );

router
  .route('/:id')
  .get(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    getNewsItem
  );

module.exports = router;

// newsModel limit 3
// tittle, descrioption, image doen
// Create, getOne, getAll done
// accisable to admin done
// endpoint to show state from pending to complete
// cateogry to item done
// if(req.params.cateogry) done
