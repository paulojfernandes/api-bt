var mysql = require('mysql2');


var select = "SELECT",
    from = "FROM",
    where = "WHERE";

var config = {
    host: 'btdatabase.mysql.database.azure.com',
    user: 'paulo@btdatabase',
    password: 'Jorge+1995',
    database: 'bt'
};




console.log("entrei models");

exports.getCarsStock = function (req, res) {
    var query = 'SELECT  id_venda,marca, modelo, categoria,ano, extras,img,venda.vendido,preço,cilindrada, matricula, km,cor FROM venda, marca, modelo, extras, categoria WHERE venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras AND venda.vendido = 0;';
    queryStandard(query, req, res);
};

// Obter carros especificos ( Vendidos Incluidos )
exports.postSpecificCar = function (req, res) {
    var param = {};
    var whereQuery = " ";

    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }


    for (var key in param) {
        if (key == "matricula") {
            whereQuery += "venda.matricula='" + param[key] + "' AND ";
        } else {
            whereQuery += key + '.' + key + "='" + param[key] + "' AND ";
        }
    }

    var query = 'SELECT id_venda,marca, modelo, categoria,ano, extras,img,venda.vendido,preço,cilindrada, matricula, km,cor FROM   venda, vendidos, marca, modelo, extras,categoria WHERE' + whereQuery + ' venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras; ';
    queryStandard(query, req, res);
};



// Obter carros especifico em stock 
exports.postSpecificCarStock = function (req, res) {

    var param = {};
    var whereQuery = " ";
    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }
    for (var key in param) {
        if (key == "matricula") {
            whereQuery += "venda.matricula='" + param[key] + "' AND ";
        } else {
            whereQuery += key + '.' + key + "='" + param[key] + "' AND ";
        }
    }
    var query = 'SELECT id_venda,marca, modelo, categoria,ano, extras,img,venda.vendido,preço,cilindrada, matricula, km,cor FROM venda, marca, modelo, extras, categoria WHERE' + whereQuery + ' venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras  AND venda.vendido = 0; ';

    queryStandard(query, req, res);

};

exports.getCarSales = function (req, res) {


    var query = 'SELECT id_venda, marca, modelo, categoria,img, venda.vendido, cilindrada, matricula, cor, data_venda, nif FROM venda, marca, modelo, extras, categoria, vendidos, cliente WHERE venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras AND venda.vendido = 1 and vendidos.id_cliente= cliente.id_cliente;';
    queryStandard(query, req, res);

};

exports.postTotalSalesDay = function (req, res) {

    var data = req.body.data;
    var query = "SELECT COUNT(id_vendido) as total FROM vendidos WHERE DATE_FORMAT(vendidos.data_venda, '%d/%m/%Y') = '" + data + "';";
    queryStandard(query, req, res);
};

exports.postSales = function (req, res) {

    var param = {};

    var fromQuery = " vendidos, venda";

    var whereQuery = " ";
    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }
    for (var key in param) {
        if (key == "matricula") {
            whereQuery += "venda.matricula='" + param[key] + "' AND ";
        } else {
            fromQuery += "," + key + " ";
            //whereQuery += key + '.' + key + "='" + param[key] + "' AND "
            whereQuery += key + '.' + key + "='" + param[key] + "' AND  venda.id_" + key + '=' + key + '.id_' + key + ' AND';
        }
    }
    var query = 'SELECT COUNT(id_vendido) as total  FROM' + fromQuery + 'WHERE' + whereQuery + ' venda.id_venda = vendidos.id_venda ';
    queryStandard(query, req, res);
};



exports.getClients = function (req, res) {
    var query = 'select * from cliente, morada where cliente.id_morada= morada.id_morada; ';
    queryStandard(query, req, res);
};

exports.postSpecificClient = function (req, res) {

    var param = {};
    var whereQuery = " ";
    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }
    for (var key in param) {
        whereQuery += 'cliente.' + key + "='" + param[key] + "' AND ";
    }

    var query = 'select * from cliente, morada where' + whereQuery + '	 cliente.id_morada= morada.id_morada ';

    queryStandard(query, req, res);
};


exports.getBrands = function (req, res) {
    var query = 'SELECT * FROM marca ';

    queryStandard(query, req, res);

};

exports.getCategories = function (req, res) {
    var query = 'SELECT * FROM categoria ';

    queryStandard(query, req, res);

};


exports.postAddCar = function (req, res) {
    console.log(req.body);

    var id_marca = req.body.id_marca;
    var id_categoria = req.body.id_categoria;
    var modelo = req.body.modelo;
    var extras = req.body.extras;
    var preço = req.body.preço;
    var km = req.body.km;
    var ano = req.body.ano;
    var img = req.body.img;
    var cilindrada = req.body.cilindrada;
    var matricula = req.body.matricula;
    var cor = req.body.cor;

    //res.send("ola")

    var connection = new mysql.createConnection(config);
    connection.connect(
        function (err) {
            if (err) {
                console.log("!!! Cannot connect !!! Error:");
                throw err;
            } else {
                console.log("Connection established.");

            }
        });


    connection.query('INSERT INTO modelo(modelo) values("' + modelo + '");', function (err, rows, fields) {
        if (!err) {
            //res.status(200).send(rows)
            console.log("Modelo Inserido");
        } else {
            res.status(500).send("Erro  Modelo");
            console.log('Error while performing Query.', err);
        }

    });

    connection.query('INSERT INTO extras(extras) values("' + extras + '");', function (err, rows, fields) {
        if (!err) {
            //res.status(200).send(rows)
            console.log("Extras Inserido");
        } else {
            res.status(500).send("Erro BD Extras");
            console.log('Error while performing Query.', err);
        }

    });

    connection.query('INSERT INTO venda(id_marca, id_modelo,id_categoria,id_extras,preço, km, ano, img, cilindrada, matricula, cor, vendido) values(' + id_marca + ',(select max(id_modelo) from modelo),' + id_categoria + ',(select max(id_extras) from extras),' + preço + ',' + km + ',' + ano + ',"' + img + '", "' + cilindrada + '","' + matricula + '", "' + cor + '", 0);', function (err, rows, fields) {
        if (!err) {
            res.status(200).send(rows);
            console.log("Carro Inserido");
        } else {
            res.status(500).send("Erro BD");
            console.log('Error while performing Query.', err);
        }
        connection.end();
    });

};

exports.sellCar = function (req, res) {


    // var connection = new mysql.createConnection(config);
    // connection.connect(
    //     function (err) {
    //         if (err) {
    //             console.log("!!! Cannot connect !!! Error:");
    //             throw err;
    //         } else {
    //             console.log("Connection established.");

    //         }
    //     });

    /* se o cliente já existe
     ** update aos dados do cliente
     ** id do cliente 
     ** id da venda(CARRO)-- ADICIONAR AO PEDIDO 
     ** preço final 
     */






    /* se o cliente não existe
    ** inserir morada
    ** inserir cliente
    ** inserir nos vendidos          
     
    */



    // connection.query('INSERT INTO morada(morada, cidade,distrito, país) values("' + morada + '", "' + cidade + '", "' + distrito + '", "Portugal");', function (err, rows, fields) {
    //     if (!err) {
    //         //res.status(200).send(rows)
    //         console.log("Morada Inserida");
    //     } else {
    //         res.status(500).send("Erro  Modelo");
    //         console.log('Error while performing Query.', err);
    //     }

    // });

    // connection.query('INSERT INTO cliente(id_morada, nif, telemovel, nome) values((select max(id_morada) from morada),"' + nif + '","' + telemovel + '","' + nome + '");', function (err, rows, fields) {
    //     if (!err) {
    //         res.status(200).send("Cliente Inserido")
    //         console.log("Cliente Inserido");
    //     } else {
    //         res.status(500).send("Erro BD Extras");
    //         console.log('Error while performing Query.', err);
    //     }
    //     connection.end();
    // });






}




exports.addClient = function (req, res) {

    console.log(req.body);

    var morada = req.body.morada;
    var cidade = req.body.cidade;
    var distrito = req.body.distrito;
    var nif = req.body.nif;
    var telemovel = req.body.telemovel;
    var nome = req.body.nome;

    //res.send("ola")

    var connection = new mysql.createConnection(config);
    connection.connect(
        function (err) {
            if (err) {
                console.log("!!! Cannot connect !!! Error:");
                throw err;
            } else {
                console.log("Connection established.");

            }
        });


    connection.query('INSERT INTO morada(morada, cidade,distrito, país) values("' + morada + '", "' + cidade + '", "' + distrito + '", "Portugal");', function (err, rows, fields) {
        if (!err) {
            //res.status(200).send(rows)
            console.log("Morada Inserida");
        } else {
            res.status(500).send("Erro  Modelo");
            console.log('Error while performing Query.', err);
        }

    });

    connection.query('INSERT INTO cliente(id_morada, nif, telemovel, nome) values((select max(id_morada) from morada),"' + nif + '","' + telemovel + '","' + nome + '");', function (err, rows, fields) {
        if (!err) {
            res.status(200).send("Cliente Inserido")
            console.log("Cliente Inserido");
        } else {
            res.status(500).send("Erro BD Extras");
            console.log('Error while performing Query.', err);
        }
        connection.end();
    });



};




function queryStandard(query, req, res) {
    var connection = new mysql.createConnection(config);
    connection.connect(
        function (err) {
            if (err) {
                console.log("!!! Cannot connect !!! Error:");
                throw err;
            } else {
                console.log("Connection established.");

            }
        });
    connection.query(query, function (err, rows, fields) {
        if (!err) {
            res.status(200).send(rows);
            console.log("entrei");
        } else {
            res.status(500).send("Erro BD");
            console.log('Error while performing Query.', err);
        }
        connection.end();
    });
}