// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
async function pruebaDB() {
const db = new sqlite3.Database('data/database.db', (err) => { // inicio de la conecion
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }); 
  var database = [];

  db.all("SELECT * FROM campeonatos", (err, rows) => { // ejecucion del query
    if (err) {
      console.error(err.message);
    }
    rows.forEach((row, index) => {
      database[index] = row;
    });
  }); // fin del query

  router.get("/", (req, res) => {
    const response = {
      // crea una respuesta con información sobre los libros
      service: "Premios",
      architecture: "microservices",
      length: database.length,
      data: database,
    };
    
    return res.send(response); // devuelve la respuesta al cliente
  });

  
router.get("/PremiosID/:id", (req, res) => {
  // Filtramos los perros cuyo id coincide con el que se envía en la petición
  const premiosID = database.filter((Id) => {
    return req.params.id == Id.id;
  });
  // Creamos un objeto de respuesta con los datos del autor
  const response = {
    service: "premios por id",
    architecture: "microservices",
    data: premiosID,
  };
  return res.send(response);
});


router.get("/campeonatoPaisCategoria/:query", (req, res) => {
  // Verificamos si el parámetro es un número (ID) o una cadena (nombre de perro)
  
  const id = Number(req.params.query);
  const name = req.params.query;
    let idcampeonatos;
  if (!isNaN(id)) {
    // Si el parámetro es un número (ID), filtramos los perros por ID
    perro = database.data.filter((campeonato) => {
      return id == campeonato.id;
    });
  } else {
    // Si el parámetro es una cadena (nombre de perro), filtramos los perros por nombre
    perro = database.filter((data) => {
      return data.categoria_ganada.includes(name);
    });
  }

  // Creamos un objeto de respuesta con los datos de los perros
  const response = {
    service: "Campeonatos",
    architecture: "microservices",
    data: idcampeonatos,
  };

  // Enviamos la respuesta
  return res.send(response);
});

router.get("/raza/:raza", (req,res) => {
  const FiltrarPerros = data.dataLibrary.perros.filter((raza) =>{
    return raza.raza.includes(req.params.raza)
  });
  const response ={
    service: "perros",
    architecture: " microservicios",
    data: FiltrarPerros,
  };

  return res.send(response);
});


}
pruebaDB();

module.exports = router;