// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Definir la ruta del archivo CSV y unirlo con el directorio actual
const path = require("path");
const csvPath = '../../data/raza_info.csv';
const directoryPath = path.join(__dirname, csvPath);

const csvtojson = require('csvtojson');

const updateArray = [];
// Usamos el método "csvtojson" para leer el archivo CSV y convertirlo en un objeto JSON
csvtojson({
  noheader: false, // Indicamos que el archivo tiene cabecera
})
  .fromFile(directoryPath) // Leemos el archivo CSV desde la ubicación indicada en "directoryPath"
  .then((jsonObject) => { // Ejecutamos una función cuando la conversión a JSON se complete
    for (let item of jsonObject) {
      let colors = item['color_de_pelo'];
      if (colors.includes('Tricolor')) {
        colors = colors.replace(/Tricolor \(.*?\)(;|$)/gi, 'Tricolor (Negro, marrón y blanco)$1');
      }
      item['color_de_pelo'] = colors.split(';').map(color => color.trim());
      updateArray.push(item);
    }
  
  })
  .catch((err) => {
    // Manejamos cualquier error que pueda ocurrir
    console.log(err);
  });
// Creamos la ruta para obtener todos los autores
router.get("/", (req, res) => {
  // Creamos un objeto de respuesta con los datos de los autores
  const response = {
    service: "perros",
    architecture: "microservices",
    length: updateArray.length,
    data: updateArray,
  };
  // Enviamos la respuesta
  return res.send(response);
});

router.get("/RazasID/:id", (req, res) => {
  // Filtramos los perros cuyo id coincide con el que se envía en la petición
  const razasID = updateArray.filter((id) => {
    return req.params.id == id.id;
  });
  // Creamos un objeto de respuesta con los datos del autor
  const response = {
    service: "Razas por id",
    architecture: "microservices",
    length : razasID.length,
    data: razasID,
  };
  return res.send(response);
});


// creamos un router para traer todos los perros dependiendo del pais de origen de la raza
router.get("/Paisorigen/:PaisOrigen", async (req, res) => {
  const PaisOrigen = updateArray.filter((raza) => raza.pais_de_origen === req.params.PaisOrigen);
  if (PaisOrigen.length === 0) {
    return res.status(404).send("Pais de origen no encontrado");
  }

  const ArrayPerro = {};
  for (let raza of PaisOrigen) {
    const perrosRespuesta = await fetch(`http://perros:4000/api/v2/perros/raza/${raza.raza}}`);
    const perrosData = await perrosRespuesta.json();
    if(perrosData.data.length == 0){
      continue
    }
    const nombresPerros = [];
    for(let nombre of perrosData.data){
      nombresPerros.push(nombre.nombre_perro)
    } 
    ArrayPerro[raza.raza] = nombresPerros;
 }

  const response = {
    service: "Razas by Pais Origen",
    architecture: "microservices",
    length: Object.keys(ArrayPerro).length,
    perros: ArrayPerro,
  };

  return res.json(response);
});


// Exportamos el objeto Router
module.exports = router;