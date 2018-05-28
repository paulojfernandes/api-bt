var express = require('express'),
    Dados = require('../models/models.js'),
    router = express.Router(),
    bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json())




router.get('/cars', function (req, res) {
    dados = Dados.get(req, res)
});


router.post('/cars', function (req, res) {
    dados = Dados.specificCar(req, res)
});

router.get('/help', function (req, res) {
    //dados = Dados.get(req, res)

    res.status(200).send({'doc':"https://repositorio.ipcb.pt/bitstream/10400.11/408/1/Tese%20Mestrado%20Ant%C3%B3nio%20Gil.pdf"})  
});


module.exports = router