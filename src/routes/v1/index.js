const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middilewares/index');

const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidators.validateUserAuth,
  UserController.create
);

router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
);

//we are bulding microservice so we are not having isAuthenticate in middilewares, wee amke api for that
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

// router.get('/dummy', (req, res)=> {
//     return res.status(200).json({message: 'ok'});
// })

router.get(
    '/isAdmin',
    AuthRequestValidators.validateIsAdminRequest,
    UserController.isAdmin
)

module.exports = router;