var mysql = require('mysql');
var data = [];

var select = "SELECT",
    from = "FROM",
    where = "WHERE"

var connection = mysql.createConnection({
    host: 'btdatabase.mysql.database.azure.com',
    user: 'paulo@btdatabase',
    password: 'Jorge+1995',
    database: 'bt'
});
console.log("entrei models")

exports.get = function (req, res) {
    var query = 'SELECT marca, modelo, categoria, extras, preço_final,img FROM   venda, vendidos, marca, modelo, extras,categoria WHERE venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras AND venda.id_categoria = categoria.id_categoria AND venda.id_venda = vendidos.id_venda; '
    queryStandard(query, req, res)
}


exports.postSpecificCar = function (req, res) {
    var param = {};
    var whereQuery = " "

    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }


    for (var key in param) {
        if (key == "matricula") {
            whereQuery += "venda.matricula='" + param[key] + "' AND "
        } else {
            whereQuery += key + '.' + key + "='" + param[key] + "' AND "
        }
    }
    console.log(param[0]);
    var query = 'SELECT marca, modelo, categoria, extras,img FROM   venda, vendidos, marca, modelo, extras,categoria WHERE' + whereQuery + ' venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras; ';
    queryStandard(query, req, res)
}




exports.postSpecificCarStock = function (req, res) {

    var param = {};
    var whereQuery = " "

    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }


    for (var key in param) {
        if (key == "matricula") {
            whereQuery += "venda.matricula='" + param[key] + "' AND "
        } else {
            whereQuery += key + '.' + key + "='" + param[key] + "' AND "
        }
    }
    
    console.log(param[0]);
    var query = 'SELECT marca, modelo, categoria, img FROM venda, marca, modelo, extras, categoria' + whereQuery + ' venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras  AND venda.vendido = 0; ';
       
    
    queryStandard(query, req, res)




}

exports.getCarSales = function (req, res) {



}

exports.getClients = function (req, res) {


}

exports.postSpecificClient = function (req, res) {



}





function queryStandard(query, req, res) {


    connection.query(query, function (err, rows, fields) {
        if (!err) {
            res.status(200).send(rows)
            console.log("entrei");


        } else {
            res.status(500).send("Erro BD");
            console.log('Error while performing Query.', err);
        }

    });
}