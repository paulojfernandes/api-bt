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
    var query = 'SELECT  venda.id_venda,marca, modelo, categoria,ano, extras,img,venda.vendido,preço as preco,cilindrada, matricula, km,cor FROM venda, marca, modelo, extras, categoria WHERE venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras AND venda.vendido = 0;';
    var error = "Não foi possível obter os carros em stock "
    queryStandard(query, error, req, res);
};

// Obter carros especificos ( Vendidos Incluidos )
exports.postSpecificCar = function (req, res) {
    var param = {};
    var whereQuery = " ";
    var error = "Não foi possível obter o carro pretendido"

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

    var query = 'SELECT venda.id_venda,marca, modelo, categoria,ano, extras,img,venda.vendido,preço,cilindrada, matricula, km,cor FROM   venda, marca, modelo, extras,categoria WHERE' + whereQuery + ' venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras; ';
    console.log(query);

    queryStandard(query, error, req, res);
};



// Obter carros especifico em stock 
exports.postSpecificCarStock = function (req, res) {
    var param = {};
    var whereQuery = " ";
    var error = "Não foi possível obter o carro pretendido"

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
    var query = 'SELECT venda.id_venda,marca, modelo, categoria,ano, extras,img,venda.vendido,preço,cilindrada, matricula, km,cor FROM venda, marca, modelo, extras, categoria WHERE' + whereQuery + ' venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras  AND venda.vendido = 0; ';
    console.log(query);
    queryStandard(query, error, req, res);

};

exports.getCarSales = function (req, res) {

    var error = "Não foi possível obter os carros vendidos"
    var query = 'SELECT venda.*, marca,modelo, preço_final as preco_final ,categoria,cliente.*,vendidos.* FROM venda, marca, modelo, extras, categoria, vendidos, cliente WHERE venda.id_categoria = categoria.id_categoria AND venda.id_marca = marca.id_marca AND venda.id_modelo = modelo.id_modelo AND venda.id_extras = extras.id_extras AND venda.vendido = 1 and vendidos.id_cliente= cliente.id_cliente and venda.id_venda= vendidos.id_venda;';
    queryStandard(query, error, req, res);

};

exports.postTotalSalesDay = function (req, res) {

    var data = req.body.data;
    var error = "Não foi possível obter as vendas do dia:" + data
    var query = "SELECT COUNT(id_vendido) as total FROM vendidos WHERE DATE_FORMAT(vendidos.data_venda, '%d/%m/%Y') = '" + data + "';";
    queryStandard(query, error, req, res);
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
    queryStandard(query, error, req, res);
};



exports.getClients = function (req, res) {
    var error = "Não foi possível obter os clientes"
    var query = 'select * from cliente, morada where cliente.id_morada= morada.id_morada; ';
    queryStandard(query, error, req, res);
};

exports.postSpecificClient = function (req, res) {

    var error = "Não foi possível obter o cliente pretendido"
    var param = {};
    var whereQuery = " ";
    for (var key in req.body) {
        req.body[key] !== "" ? param[key] = req.body[key] : null;
    }
    for (var key in param) {
        whereQuery += 'cliente.' + key + "='" + param[key] + "' AND ";
    }

    var query = 'select * from cliente, morada where' + whereQuery + '	 cliente.id_morada= morada.id_morada ';

    queryStandard(query, error, req, res);
};


exports.getBrands = function (req, res) {
    var query = 'SELECT * FROM marca ';
    var error = "Não foi possível obter as marcas"
    queryStandard(query, error, req, res);

};

exports.getCategories = function (req, res) {
    var query = 'SELECT * FROM categoria ';
    var error = "Não foi possível obter as categorias"
    queryStandard(query, error, req, res);

};


exports.postAddCar = function (req, res) {
    var error = "Não foi possível adicionar o carro !"
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
    console.log(req.body)
    var error = "Não foi possível vender o carro"
    // res.send(req.body)

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

    var morada = req.body.morada;
    var cidade = req.body.cidade;
    var distrito = req.body.distrito;
    var nif = req.body.nif;
    var telemovel = req.body.telemovel;
    var nome = req.body.nome;
    var id_morada = req.body.id_morada;
    var id_venda = req.body.id_venda
    var id_cliente = req.body.id_cliente
    var preco_final = req.body.preco_final

    //res.send(req.body);
    if (req.body.exists == true) {
        /* se o cliente já existe
         ** update aos dados do cliente
         ** id do cliente 
         ** id da venda(CARRO)-- ADICIONAR AO PEDIDO 
         ** preço final 
         */

        connection.query('UPDATE morada SET morada = "' + morada + '", cidade = "' + cidade + '", distrito = "' + distrito + '" WHERE id_morada = ' + id_morada + ';', function (err, rows, fields) {
            if (!err) {
                //res.status(200).send(rows)
                console.log("Morada Inserida");

                connection.query(' UPDATE cliente SET nome = "' + nome + '", nif = "' + nif + '", telemovel = "' + telemovel + '" WHERE nif = "' + nif + '";', function (err, rows, fields) {
                    if (!err) {
                        //res.status(200).send(rows)
                        console.log("Cliente Atualizado");

                        connection.query('insert into vendidos(id_venda, id_cliente, preço_final, data_venda) values(' + id_venda + ', ' + id_cliente + ', ' + preco_final + ', now());', function (err, rows, fields) {
                            if (!err) {
                                //res.status(200).send(rows)
                                console.log("Carro Vendido");

                                connection.query('update venda set vendido = 1 where id_venda = ' + id_venda + ';', function (err, rows, fields) {
                                    if (!err) {
                                        res.status(200).send("VENDIDO")
                                        console.log("Stock Atualizado");
                                    } else {
                                        res.status(500).send("Erro  Atualizar");
                                        console.log('Error while performing Query.', err);
                                    }
                                    connection.end();
                                });
                            } else {
                                res.status(500).send("Erro  Vendidos");
                                console.log('Error while performing Query.', err);
                            }
                        });
                    } else {
                        res.status(500).send("Erro  Cliente");
                        console.log('Error while performing Query.', err);
                    }
                });
            } else {
                res.status(500).send("Erro  Morada");
                console.log('Error while performing Query.', err);
            }
        });

    } else if (req.body.exists == false) {
        /* se o cliente não existe
          ** inserir morada
          ** inserir cliente
          ** inserir nos vendidos          
           
          */
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
                // res.status(200).send("Cliente Inserido")
                console.log("Cliente Inserido");

                connection.query('insert into vendidos(id_venda, id_cliente, preço_final, data_venda) values(' + id_venda + ', (select max(id_cliente) from cliente), ' + preco_final + ', now());', function (err, rows, fields) {
                    if (!err) {
                        //res.status(200).send(rows)
                        console.log("Carro Vendido");

                        connection.query('update venda set vendido = 1 where id_venda = ' + id_venda + ';', function (err, rows, fields) {
                            if (!err) {
                                res.status(200).send("VENDIDO")
                                console.log("Stock Atualizado");
                            } else {
                                res.status(500).send("Erro  Atualizar");
                                console.log('Error while performing Query.', err);
                            }
                            connection.end();
                        });
                    } else {
                        res.status(500).send("Erro  Vendidos");
                        console.log('Error while performing Query.', err);
                    }
                });
            } else {
                res.status(500).send("Erro BD Cliente");
                console.log('Error while performing Query.', err);
            }
        });
        // res.send("NOT")

    }
}




exports.addClient = function (req, res) {
    var error = "Não foi possível adicionar o cliente"
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

exports.updateClient = function (req, res) {
    var error = "Não foi possível atualizar os dados do cliente"

    var morada = req.body.morada;
    var distrito = req.body.distrito;
    var cidade = req.body.cidade;
    var id_morada = req.body.id_morada;
    var nome = req.body.nome;
    var nif = req.body.nif;
    var telemovel = req.body.telemovel;
    var id_cliente = req.body.id_cliente;

    var queryMorada = 'update morada set morada= "' + morada + '", distrito="' + distrito + '", cidade="' + cidade + '" where id_morada=' + id_morada + ' ;'
    var queryCliente = 'update cliente set nome= "' + nome + '", nif="' + nif + '", telemovel= "' + telemovel + '" where id_cliente =' + id_cliente + ' ;'

    query2Tables(queryMorada, queryCliente, req, res);

}

exports.deleteClient = function (req, res) {
    var error = "Não foi possível eliminar os clientes"
    var id_morada = req.body.id_morada;
    var id_cliente = req.body.id_cliente;
    //console.log(req.body,id_cliente,id_morada);


    var query1 = 'delete from morada where id_morada=' + id_morada + ';'
    var query2 = 'delete from cliente where id_cliente=' + id_cliente + ';'

    res.send("OLA")
    query2Tables(query1, query2, req, res)

};
exports.updateCar = function (req, res) {


};
exports.deleteCar = function (req, res) {
    var error = "Não foi possível eliminar o carro"
    var id_venda = req.body.id_venda;
    var id_modelo = req.body.id_morada;

    var query1 = 'delete from venda where id_venda=' + id_venda + ';'
    var query2 = 'delete from morada where id_morada=' + id_modelo + ';'

    query2Tables(query1, query2, req, res)




};




function query2Tables(query1, query2, req, res) {

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

    connection.query('SET foreign_key_checks = 0;', function (err, rows, fields) {
        if (!err) {
            console.log("Foreign KEY");
        } else {
            console.log("Error foreign key .");
        }

    });

    connection.query(query1, function (err, rows, fields) {
        if (!err) {
            console.log("Atualizei Morada");
            connection.query(query2, function (err, rows, fields) {
                if (!err) {
                    res.status(200).send("Cliente Atualizado");
                    console.log("entrei");
                } else {
                    res.status(500).send("Erro BD");
                    console.log('Error while performing Query.', err);
                }
                connection.end();
            });

        } else {
            res.status(500).send("Erro BD");
            console.log('Error while performing Query.', err);
        }
    });

}



function queryStandard(query, error, req, res) {
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