const studentProfileController = require('../controllers/studentProfile.server.controller.js'),
    express = require('express'), 
    router = express.Router()
/*
router.route('/')
  .get(studentProfileController.list);
  router.route('/:id')
  .get(studentProfileController.findOne)
  .post(studentProfileController.add);
  
  router.route('/:id/update')
    .put(studentProfileController.update);
*/

    router.route('/')
  .get(studentProfileController.list)
  .post(studentProfileController.add);

  router.route('/:id')
  .get(studentProfileController.findOne)
  .put(studentProfileController.update);

  
  module.exports = router; 