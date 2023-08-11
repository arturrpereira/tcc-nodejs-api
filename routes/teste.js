const express = require('express');

const testeController = require('../controllers/teste');

const router = express.Router();

router.get('/teste', testeController.getTeste);

router.post('/teste', testeController.postTeste);

router.put('/teste', testeController.putTeste);

router.delete('/teste', testeController.deleteTeste);

module.exports = router;
