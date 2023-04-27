// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Definir la ruta del archivo CSV y unirlo con el directorio actual
const path = require("path");
const csvPath = '../../data/raza_info.csv';
const directoryPath = path.join(__dirname, csvPath);

const csvtojson = require('csvtojson');

const tempArray = [];
// Usamos el método "csvtojson" para leer el archivo CSV y convertirlo en un objeto JSON
csvtojson({
  noheader: false, // Indicamos que el archivo tiene cabecera
})
  .fromFile(directoryPath) // Leemos el archivo CSV desde la ubicación indicada en "directoryPath"
  .then((jsonObject) => { // Ejecutamos una función cuando la conversión a JSON se complete
    
    // Recorremos el objeto JSON y dividimos la propiedad "color_de_pelo" en un array de colores
    // Recorremos el objeto JSON y dividimos la propiedad "langs" en un array de idiomas
    for (let items in jsonObject) {
        jsonObject[items]['color_de_pelo'] = jsonObject[items]['color_de_pelo'].split(";");
  
        // Añadimos cada elemento del objeto JSON al array temporal
        tempArray.push(jsonObject[items]);
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
      length: tempArray.length,
      data: tempArray,
    };
    // Enviamos la respuesta
    return res.send(response);
  });


// Exportamos el objeto Router
module.exports = router;