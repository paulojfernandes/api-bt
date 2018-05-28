var express = require('express'),
    Dados = require('../models/models.js'),
    router = express.Router(),
    bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json())




router.get('/get', function (req, res) {
    dados = Dados.get(req, res)
});

module.exports = router