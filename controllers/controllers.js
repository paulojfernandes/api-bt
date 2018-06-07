var express = require('express'),
    Dados = require('../models/models.js'),
    router = express.Router(),
    bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json())


/*router.get('/cars', function (req, res) {
    dados = Dados.get(req, res)
});
*/

router.post('/cars', function (req, res) {
    dados = Dados.postSpecificCar(req, res)
});

router.get('/stock', function (req, res) {
    dados = Dados.getCarsStock(req, res)
});

router.post('/stock', function (req, res) {
    dados = Dados.postSpecificCarStock(req, res)
});

router.post('/salesDay', function (req, res) {
    dados = Dados.postTotalSalesDay(req, res)
})

router.get('/sales', function (req, res) {
    dados = Dados.getCarSales(req, res)
})

router.post('/sales', function (req, res) {
    dados = Dados.postSales(req, res)
})

router.get('/clients', function (req, res) {
    dados = Dados.getClients(req, res)
})


router.post('/clients', function (req, res) {
    dados = Dados.postSpecificClient(req, res)
})

router.get('/brands', function (req, res) {
    dados = Dados.getBrands(req, res)
})


router.get('/categories', function (req, res) {
    dados = Dados.getCategories(req, res)
})


router.post('/addCar', function (req, res) {
    dados = Dados.postAddCar(req, res)
})

router.post('/addClient', function (req, res) {
    dados = Dados.addClient(req, res)
})

router.post('sellCar', function (req, res) {
    dados = Dados.sellCar(req, res);
});


router.get('/help', function (req, res) {
    //dados = Dados.get(req, res)

    res.status(200).send({
        'doc': "https://repositorio.ipcb.pt/bitstream/10400.11/408/1/Tese%20Mestrado%20Ant%C3%B3nio%20Gil.pdf"
    })
});


module.exports = router