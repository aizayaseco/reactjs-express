const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');
const server = require('../server')
const authenticate = require('./../controllers/authenticate')

// Public API endpoints
router.get('/say-something', controllers.saySomething);
router.get('/time/:mode', controllers.getTime);
router.get('/feed/:page', controllers.getFeed);

// Protected API endpoints
router.use('/products', require('./product.routes'))

router.use(authenticate.authenticate);
router.post('/auth/user', async (req, res) => {
    const {
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        photoUrl
      } = req.body;
  
      const user = await server.admin.auth().createUser({
        email,
        phoneNumber,
        password,
        displayName: `${firstName} ${lastName}`,
        photoURL: photoUrl
      })
      .then(user => res.status(201).json({user}))
      .catch(err => res.status(500).json({ message: err.message }));
    
});

module.exports = router;