const businessProfileRouter = require('../controllers/businessprofiles.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(businessProfileRouter.list)
  .post(businessProfileRouter.add);

router.route('/:id')
  .get(businessProfileRouter.findOne)
  .put(businessProfileRouter.update);

  router.route('/:id/listings')
  .get(businessProfileRouter.findListingByBusiness);

  router.route('/listing')
    .get(businessProfileRouter.list);

  module.exports = router; 