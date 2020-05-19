const internshipController = require('../controllers/internships.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(internshipController.list)
  .post(internshipController.add);

router.route('/:id')
  .get(internshipController.findOne);
  
router.route('/:id/delete')
  .delete(internshipController.delete);

router.route("/:id/update")
  .put(internshipController.update);

router.route("/listing")
    .get(internshipController.list);
  
module.exports = router;