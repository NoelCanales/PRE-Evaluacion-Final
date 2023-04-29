// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

const data = require("../../data/datos_perro");

// Creamos la ruta para obtener todos los autores
router.get("/", (req, res) => {
  // Creamos un objeto de respuesta con los datos de los autores
  const response = {
    service: "perros",
    architecture: "microservices",
    length: data.dataLibrary.perros.length,
    data: data.dataLibrary.perros,
  };

  // Enviamos la respuesta
  return res.send(response);
});


router.get("/:id", (req, res) => {
  // Filtramos los perros cuyo id coincide con el que se envía en la petición
  const perrosID = data.dataLibrary.perros.filter((raza) => {
    return req.params.id == raza.Id;
  });

  // Creamos un objeto de respuesta con los datos del autor
  const response = {
    service: "Perros por id",
    architecture: "microservices",
    data: perrosID,
  };
  return res.send(response);
});

// Creamos la ruta para obtener perros por su ID o nombre
router.get("/PerroIdNombre/:query", (req, res) => {
  // Verificamos si el parámetro es un número (ID) o una cadena (nombre de perro)
  const id = Number(req.params.query);
  const name = req.params.query;

  let perro;

  if (!isNaN(id)) {
    // Si el parámetro es un número (ID), filtramos los perros por ID
    perro = data.dataLibrary.perros.filter((perro) => {
      return id == perro.Id;
    });
  } else {
    // Si el parámetro es una cadena (nombre de perro), filtramos los perros por nombre
    perro = data.dataLibrary.perros.filter((perro) => {
      return perro.nombre_perro.includes(name);
    });
  }

  // Creamos un objeto de respuesta con los datos de los perros
  const response = {
    service: "Perros",
    architecture: "microservices",
    data: perro,
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

//Creamos la ruta para obtener perros por el dueño
router.get("/Dueno/:dueno", (req,res) =>{
  const dueno = data.dataLibrary.perros.filter((raza) =>{
    return raza.pais_dueño?.includes(req.params.dueno)
  });

  const response ={
    service: "perros",
    architecture: " microservicios",
    data: dueno,
  };

  return res.send(response);
});





// Exportamos el objeto Router
module.exports = router;