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